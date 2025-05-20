import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectCashiers, addCashier, updateCashier, deleteCashier, selectPointsOfSale } from '../../../store/features/cashModule/cashModuleSlice';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cashier } from '../../../types/cashModule';
import { v4 as uuidv4 } from 'uuid';

const CashiersTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const cashiers = useAppSelector(selectCashiers);
  const pointsOfSale = useAppSelector(selectPointsOfSale);
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCashier, setCurrentCashier] = useState<Cashier | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    locationId: '',
    isActive: true,
    permissions: [] as string[]
  });
  
  const handleOpen = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      employeeId: Math.floor(100000 + Math.random() * 900000).toString(),
      locationId: '',
      isActive: true,
      permissions: []
    });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setCurrentCashier(null);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      employeeId: '',
      locationId: '',
      isActive: true,
      permissions: []
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleEditCashier = (cashier: Cashier) => {
    setIsEditing(true);
    setCurrentCashier(cashier);
    setFormData({
      name: cashier.name,
      employeeId: cashier.employeeId,
      locationId: cashier.locationId,
      isActive: cashier.isActive,
      permissions: cashier.permissions
    });
    setOpen(true);
  };
  
  const handleDeleteCashier = (id: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този касиер?')) {
      dispatch(deleteCashier(id));
    }
  };
  
  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    
    if (isEditing && currentCashier) {
      const updatedCashier: Cashier = {
        ...currentCashier,
        name: formData.name,
        employeeId: formData.employeeId,
        locationId: formData.locationId,
        isActive: formData.isActive,
        permissions: formData.permissions,
        updatedAt: timestamp
      };
      dispatch(updateCashier(updatedCashier));
    } else {
      const newCashier: Cashier = {
        id: uuidv4(),
        name: formData.name,
        employeeId: formData.employeeId,
        locationId: formData.locationId,
        isActive: formData.isActive,
        permissions: formData.permissions,
        assignedRegisters: [],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      dispatch(addCashier(newCashier));
    }
    
    handleClose();
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Списък на касиерите</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Добави касиер
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Номер</TableCell>
              <TableCell>Име</TableCell>
              <TableCell>Локация</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashiers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Няма налични касиери
                </TableCell>
              </TableRow>
            ) : (
              cashiers.map((cashier) => {
                const pointOfSale = pointsOfSale.find(pos => pos.id === cashier.locationId);
                return (
                  <TableRow key={cashier.id}>
                    <TableCell>{cashier.employeeId}</TableCell>
                    <TableCell>{cashier.name}</TableCell>
                    <TableCell>{pointOfSale ? pointOfSale.name : cashier.locationId}</TableCell>
                    <TableCell>
                      <Chip
                        label={cashier.isActive ? 'Активен' : 'Неактивен'}
                        color={cashier.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Редактирай">
                        <IconButton onClick={() => handleEditCashier(cashier)} size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Изтрий">
                        <IconButton onClick={() => handleDeleteCashier(cashier.id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Редактиране на касиер' : 'Добавяне на нов касиер'}</DialogTitle>
        <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Номер"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              required
              disabled={!isEditing}
            />
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Име"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>ID на локация</InputLabel>
              <Select
                name="locationId"
                value={formData.locationId}
                label="ID на локация"
                onChange={handleSelectChange}
              >
                {pointsOfSale.map((pos) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
              }
              label="Активен"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отказ</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!formData.name || !formData.employeeId || !formData.locationId}
          >
            {isEditing ? 'Запази' : 'Добави'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CashiersTab; 