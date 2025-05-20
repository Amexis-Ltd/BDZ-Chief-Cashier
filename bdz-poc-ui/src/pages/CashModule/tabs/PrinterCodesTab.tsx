import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Paper, 
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { PrinterCode, PointOfSale } from '../../../types/cashModule';
import { 
  selectPrinterCodes, 
  addPrinterCode, 
  selectPointsOfSale, 
  selectLoading, 
  selectError 
} from '../../../store/features/cashModule/cashModuleSlice';

const PrinterCodesTab: React.FC = () => {
  const dispatch = useDispatch();
  const printerCodes = useSelector(selectPrinterCodes);
  const pointsOfSale = useSelector(selectPointsOfSale);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPrinterName, setNewPrinterName] = useState('');
  const [newPrinterNumber, setNewPrinterNumber] = useState('');
  const [newPrinterTypeValue, setNewPrinterTypeValue] = useState('');
  const [newPrinterTaxGroup, setNewPrinterTaxGroup] = useState('');
  const [newPrinterIsRevenue, setNewPrinterIsRevenue] = useState(false);
  const [newPrinterIsActive, setNewPrinterIsActive] = useState(true);
  const [newPrinterLocationId, setNewPrinterLocationId] = useState('');

  const locationMap = useMemo(() => {
    const map = new Map<string, string>();
    pointsOfSale.forEach((pos: PointOfSale) => {
      map.set(pos.id, pos.name);
    });
    return map;
  }, [pointsOfSale]);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewPrinterName('');
    setNewPrinterNumber('');
    setNewPrinterTypeValue('');
    setNewPrinterTaxGroup('');
    setNewPrinterIsRevenue(false);
    setNewPrinterIsActive(true);
    setNewPrinterLocationId('');
  };

  const handleAddPrinterCode = () => {
    if (!newPrinterName || !newPrinterNumber || !newPrinterLocationId || !newPrinterTypeValue || !newPrinterTaxGroup) {
      alert('Моля, попълнете всички полета (Име, Код/Номер, Тип, Данъчна група, Обект).');
      return;
    }
    if (pointsOfSale.length === 0) {
      alert("Моля, първо добавете обект, към който да присвоите принтерния код.");
      return;
    }
    const newCode: PrinterCode = {
      id: uuidv4(),
      name: newPrinterName,
      number: newPrinterNumber,
      typeValue: newPrinterTypeValue,
      taxGroup: newPrinterTaxGroup,
      isRevenue: newPrinterIsRevenue,
      isActive: newPrinterIsActive,
      locationId: newPrinterLocationId,
    };
    dispatch(addPrinterCode(newCode));
    handleCloseAddDialog();
  };

  const handleEditPrinterCode = (code: PrinterCode) => {
    console.log('Edit printer code:', code);
    // TODO: Implement edit functionality (e.g., open dialog with current values)
  };

  const handleDeletePrinterCode = (codeId: string) => {
    console.log('Delete printer code ID:', codeId);
    // TODO: Implement delete functionality (e.g., dispatch delete action)
    // dispatch(deletePrinterCode(codeId)); 
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Грешка при зареждане на кодове на принтер: {error}</Alert>;
  }

  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          Списък с принтер кодове
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenAddDialog}>
          Добави нов принтер код
        </Button>
      </Box>
      
      {printerCodes.length === 0 && !isLoading ? (
        <Typography sx={{mt: 2, mb: 2, textAlign: 'center'}}>Няма дефинирани принтер кодове.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table sx={{ minWidth: 650 }} aria-label="printer codes table">
            <TableHead>
              <TableRow>
                <TableCell>Код</TableCell>
                <TableCell>Име</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Данъчна група</TableCell>
                <TableCell>Приход</TableCell>
                <TableCell>Активен</TableCell>
                <TableCell>Обект</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {printerCodes.map((code) => (
                <TableRow key={code.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {code.number}
                  </TableCell>
                  <TableCell>{code.name}</TableCell>
                  <TableCell>{code.typeValue || 'Н/Д'}</TableCell>
                  <TableCell>{code.taxGroup || 'Н/Д'}</TableCell>
                  <TableCell>{code.isRevenue ? 'Да' : 'Не'}</TableCell>
                  <TableCell>{code.isActive ? 'Да' : 'Не'}</TableCell>
                  <TableCell>{locationMap.get(code.locationId) || 'Не е указан'}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Редактирай">
                      <IconButton onClick={() => handleEditPrinterCode(code)} size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Изтрий">
                      <IconButton onClick={() => handleDeletePrinterCode(code.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Добавяне на нов код на принтер</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 2}}>
            Моля, въведете информацията за новия код на принтер.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="printerName"
            label="Име на принтер"
            type="text"
            fullWidth
            variant="standard"
            value={newPrinterName}
            onChange={(e) => setNewPrinterName(e.target.value)}
            sx={{mb:1}}
          />
          <TextField
            margin="dense"
            id="printerNumber"
            label="Код/Номер на принтер"
            type="text"
            fullWidth
            variant="standard"
            value={newPrinterNumber}
            onChange={(e) => setNewPrinterNumber(e.target.value)}
            sx={{mb:1}}
          />
          <TextField
            margin="dense"
            id="printerTypeValue"
            label="Тип"
            type="text"
            fullWidth
            variant="standard"
            value={newPrinterTypeValue}
            onChange={(e) => setNewPrinterTypeValue(e.target.value)}
            sx={{mb:1}}
          />
          <TextField
            margin="dense"
            id="printerTaxGroup"
            label="Данъчна група"
            type="text"
            fullWidth
            variant="standard"
            value={newPrinterTaxGroup}
            onChange={(e) => setNewPrinterTaxGroup(e.target.value)}
            sx={{mb:1}}
          />
          <FormControl fullWidth margin="dense" variant="standard" sx={{mb:1}}>
            <InputLabel id="printerIsRevenue-label">Приход</InputLabel>
            <Select
              labelId="printerIsRevenue-label"
              id="printerIsRevenue"
              value={newPrinterIsRevenue ? 'true' : 'false'}
              onChange={(e: SelectChangeEvent<string>) => setNewPrinterIsRevenue(e.target.value === 'true')}
              label="Приход"
            >
              <MenuItem value="true">Да</MenuItem>
              <MenuItem value="false">Не</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="standard" sx={{mb:1}}>
            <InputLabel id="printerIsActive-label">Активен</InputLabel>
            <Select
              labelId="printerIsActive-label"
              id="printerIsActive"
              value={newPrinterIsActive ? 'true' : 'false'}
              onChange={(e: SelectChangeEvent<string>) => setNewPrinterIsActive(e.target.value === 'true')}
              label="Активен"
            >
              <MenuItem value="true">Да</MenuItem>
              <MenuItem value="false">Не</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="standard" sx={{mb:2}}>
            <InputLabel id="location-select-label">Обект</InputLabel>
            <Select
              labelId="location-select-label"
              id="location"
              value={newPrinterLocationId}
              onChange={(e: SelectChangeEvent) => setNewPrinterLocationId(e.target.value)}
              label="Обект"
            >
              {pointsOfSale.map((pos: PointOfSale) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Отказ</Button>
          <Button onClick={handleAddPrinterCode}>Добави</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PrinterCodesTab; 