import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { 
  selectPointsOfSale, 
  addPointOfSale, 
  deletePointOfSale,
  updatePointOfSale,
} from '../../../store/features/cashModule/cashModuleSlice';
import { PointOfSale } from '../../../types/cashModule';
import { v4 as uuidv4 } from 'uuid';

// Helper to format date for display if needed, or ensure it's a string
const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  // Assuming dateString is already in 'YYYY-MM-DD' or compatible format for date input
  // If it's a full ISO string, you might want to slice it: dateString.slice(0, 10)
  return dateString; 
};

const PointsOfSaleTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const pointsOfSale = useAppSelector(selectPointsOfSale);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPointOfSale, setCurrentPointOfSale] = useState<PointOfSale | null>(null);

  const [formData, setFormData] = useState<Omit<PointOfSale, 'id' | 'fdrid'>>({
    name: '',
    eik: '',
    type: 'station',
    status: 'active',
    city: '',
    street: '',
    number: '',
    postalCode: '',
    region: '',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: '',
    serviceCompanyEIK: '',
    serviceContractStartDate: null,
    serviceContractEndDate: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [confirmDeregisterOpen, setConfirmDeregisterOpen] = useState(false);
  const [pointOfSaleToDeregister, setPointOfSaleToDeregister] = useState<PointOfSale | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setFormData({
      name: '',
      eik: '',
      type: 'station',
      status: 'active',
      city: '',
      street: '',
      number: '',
      postalCode: '',
      region: '',
      company: 'БДЖ - ПП ЕООД',
      serviceCompanyName: '',
      serviceCompanyEIK: '',
      serviceContractStartDate: null,
      serviceContractEndDate: null,
    });
    setIsEditing(false);
    setCurrentPointOfSale(null);
    setOpen(true);
  };
  
  const handleEdit = (point: PointOfSale) => {
    setFormData({
      name: point.name,
      eik: point.eik || '',
      type: point.type,
      status: point.status,
      city: point.city,
      street: point.street,
      number: point.number,
      postalCode: point.postalCode,
      region: point.region,
      company: point.company,
      serviceCompanyName: point.serviceCompanyName,
      serviceCompanyEIK: point.serviceCompanyEIK || '',
      serviceContractStartDate: point.serviceContractStartDate,
      serviceContractEndDate: point.serviceContractEndDate,
    });
    setIsEditing(true);
    setCurrentPointOfSale(point);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setCurrentPointOfSale(null);
  };

  const handleSubmit = () => {
    if (isEditing && currentPointOfSale) {
      dispatch(updatePointOfSale({ ...currentPointOfSale, ...formData }));
      setSnackbarMessage('Обектът е успешно редактиран!');
    } else {
      const newPointOfSale: PointOfSale = {
        id: '',
        ...formData,
        company: formData.company,
        fdrid: null, 
      };
      dispatch(addPointOfSale(newPointOfSale));
      setSnackbarMessage('Обектът е успешно добавен!');
    }
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    handleClose();
  };

  const handleDeletePointOfSale = (id: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този обект?')) {
      dispatch(deletePointOfSale(id));
      setSnackbarMessage('Обектът е успешно изтрит!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRegisterNRA = (point: PointOfSale) => {
    const newFdrid = `FDR-${uuidv4().slice(0, 8).toUpperCase()}`;
    const updatedPointOfSale = { ...point, fdrid: newFdrid };
    dispatch(updatePointOfSale(updatedPointOfSale));

    setSnackbarMessage('Обектът е успешно регистриран в НАП!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleOpenConfirmDeregister = (point: PointOfSale) => {
    setPointOfSaleToDeregister(point);
    setConfirmDeregisterOpen(true);
  };

  const handleCloseConfirmDeregister = () => {
    setPointOfSaleToDeregister(null);
    setConfirmDeregisterOpen(false);
  };

  const handleConfirmDeregisterNRA = () => {
    if (pointOfSaleToDeregister) {
      const updatedPointOfSale = { ...pointOfSaleToDeregister, fdrid: null };
      dispatch(updatePointOfSale(updatedPointOfSale));

      setSnackbarMessage('Обектът е успешно дерегистриран от НАП!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
    handleCloseConfirmDeregister();
  };


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Списък на обекти</Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Добави нов обект
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Име</TableCell>
              <TableCell>ЕИК</TableCell>
              <TableCell>Компания</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>FDRID</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pointsOfSale.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Няма налични обекти
                </TableCell>
              </TableRow>
            ) : (
              pointsOfSale.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.name}</TableCell>
                  <TableCell>{point.eik}</TableCell>
                  <TableCell>{point.company}</TableCell>
                  <TableCell>
                    {point.type === 'station' ? 'Гара' : 
                     point.type === 'ticket_office' ? 'Билетна каса' : 
                     point.type === 'pda_device' ? 'PDA устройство' : 
                     point.type === 'vending_machine' ? 'Vending автомат' : 
                     point.type}
                  </TableCell>
                  <TableCell>{point.status === 'active' ? 'Активен' : point.status === 'inactive' ? 'Неактивен' : point.status === 'maintenance' ? 'В поддръжка' : point.status}</TableCell>
                  <TableCell>
                    {point.fdrid ? (
                      <Chip label={point.fdrid} color="success" size="small" />
                    ) : (
                      <Chip label="Нерегистриран" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Редактирай">
                      <IconButton onClick={() => handleEdit(point)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Изтрий">
                      <IconButton onClick={() => handleDeletePointOfSale(point.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {point.fdrid ? (
                      <Tooltip title="Дерегистрирай от НАП">
                        <IconButton onClick={() => handleOpenConfirmDeregister(point)} size="small" color="warning">
                          <HighlightOffIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Регистрирай в НАП">
                        <IconButton onClick={() => handleRegisterNRA(point)} size="small" color="primary">
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Редактиране на обект' : 'Добавяне на нов обект'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Детайли за обект
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Име на обекта"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="ЕИК номер"
                    name="eik"
                    value={formData.eik || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Компания"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Тип на обекта</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      label="Тип на обекта"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="station">Гара</MenuItem>
                      <MenuItem value="ticket_office">Билетна каса</MenuItem>
                      <MenuItem value="pda_device">PDA устройство</MenuItem>
                      <MenuItem value="vending_machine">Vending автомат</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      label="Статус"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="active">Активен</MenuItem>
                      <MenuItem value="inactive">Неактивен</MenuItem>
                      <MenuItem value="maintenance">В поддръжка</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Адрес
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Град"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Улица"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Номер"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Пощенски код"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Област"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Информация за сервизна фирма
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Име на сервизна фирма"
                    name="serviceCompanyName"
                    value={formData.serviceCompanyName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ЕИК на сервизна фирма"
                    name="serviceCompanyEIK"
                    value={formData.serviceCompanyEIK || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Старт на експлоатация"
                    name="serviceContractStartDate"
                    type="date"
                    value={formatDateForInput(formData.serviceContractStartDate)}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Край на експлоатация"
                    name="serviceContractEndDate"
                    type="date"
                    value={formatDateForInput(formData.serviceContractEndDate)}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отказ</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!formData.name || !formData.eik || !formData.type}
          >
            {isEditing ? 'Запази промените' : 'Запази'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeregisterOpen}
        onClose={handleCloseConfirmDeregister}
        aria-labelledby="confirm-deregister-dialog-title"
        aria-describedby="confirm-deregister-dialog-description"
      >
        <DialogTitle id="confirm-deregister-dialog-title">
          Потвърждение за дерегистрация
        </DialogTitle>
        <DialogContent>
          <Typography id="confirm-deregister-dialog-description">
            Сигурни ли сте, че искате да дерегистрирате този обект от НАП? 
            Всички касови апарати, свързани с този обект, също ще бъдат дерегистрирани.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDeregister}>Отказ</Button>
          <Button onClick={handleConfirmDeregisterNRA} color="error" autoFocus>
            Дерегистрирай
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PointsOfSaleTab;
