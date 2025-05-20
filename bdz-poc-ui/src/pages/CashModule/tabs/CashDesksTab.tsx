import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert,
  Button,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectLoading,
  selectError,
  selectPointsOfSale,
  selectCashDesks,
  addCashDesks,
} from '../../../store/features/cashModule/cashModuleSlice';
import { PointOfSale, CashDesks }  from '../../../types/cashModule';

const CashDesksTab: React.FC = () => {
  const dispatch = useDispatch();
  const cashDesks = useSelector(selectCashDesks); 
  const pointsOfSale = useSelector(selectPointsOfSale);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCashDeskName, setNewCashDeskName] = useState('');
  const [newLocationId, setNewLocationId] = useState('');
  const [newCashDeskType, setNewCashDeskType] = useState<CashDesks["type"]>('Билетна каса');

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
    setNewCashDeskName('');
    setNewLocationId('');
    setNewCashDeskType('Билетна каса');
  };

  const handleAddCashDesk = () => { 
    if (!newCashDeskName || !newLocationId || !newCashDeskType) {
      alert('Моля, попълнете всички полета: Име на работно място, Локация и Тип.'); 
      return;
    }
    
    const newStation: CashDesks = { 
      id: uuidv4(),
      name: newCashDeskName,
      locationId: newLocationId,
      type: newCashDeskType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addCashDesks(newStation)); 
    handleCloseAddDialog();
  };

  const handleEditCashDesk = (cashDesk: CashDesks) => {
    // TODO: Implement edit functionality
    console.log('Edit cash desk:', cashDesk);
    // Example: set state for an edit dialog
  };

  const handleDeleteCashDesk = (cashDeskId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete cash desk ID:', cashDeskId);
    // Example: dispatch delete action after confirmation
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Грешка при зареждане на работни места: {error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="div">
          Списък на работни места (Каси)
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpenAddDialog} startIcon={<AddIcon />}>
          Добави ново работно място
        </Button>
      </Box>
      {cashDesks.length === 0 ? (
        <Typography sx={{mt: 2, mb: 2, textAlign: 'center'}}>Няма дефинирани работни места.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table sx={{ minWidth: 650 }} aria-label="workstations table">
            <TableHead>
              <TableRow>
                <TableCell>Име на работно място</TableCell>
                <TableCell>Локация</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cashDesks.map((ws: CashDesks) => {
                const locationName = locationMap.get(ws.locationId) || 'Неизвестна локация';
                
                return (
                  <TableRow key={ws.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {ws.name}
                    </TableCell>
                    <TableCell>{locationName}</TableCell>
                    <TableCell>{ws.type}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Редактирай">
                        <IconButton onClick={() => handleEditCashDesk(ws)} size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Изтрий">
                        <IconButton onClick={() => handleDeleteCashDesk(ws.id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Добавяне на ново работно място</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 2}}>
            Моля, въведете информацията за новото работно място, изберете локация и тип.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Име на работното място" 
            type="text"
            fullWidth
            variant="standard"
            value={newCashDeskName}
            onChange={(e) => setNewCashDeskName(e.target.value)}
            sx={{mb:2}}
          />
          <FormControl fullWidth margin="dense" variant="standard" sx={{mb:2}}>
            <InputLabel id="location-select-label">Локация</InputLabel>
            <Select
              labelId="location-select-label"
              id="location"
              value={newLocationId}
              onChange={(e: SelectChangeEvent) => setNewLocationId(e.target.value)}
              label="Локация"
            >
              {pointsOfSale.map((pos: PointOfSale) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="standard" sx={{mb:2}}>
            <InputLabel id="workstation-type-select-label">Тип на работното място</InputLabel>
            <Select
              labelId="workstation-type-select-label"
              id="workstation-type"
              value={newCashDeskType}
              onChange={(e: SelectChangeEvent) => setNewCashDeskType(e.target.value as CashDesks["type"])}
              label="Тип на работното място"
            >
              <MenuItem value="Билетна каса">Билетна каса</MenuItem>
              <MenuItem value="Кондукторна каса">Кондукторна каса</MenuItem>
              <MenuItem value="Мобилно устройство">Мобилно устройство</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Отказ</Button>
          <Button onClick={handleAddCashDesk} color="primary" variant="contained">Добави</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CashDesksTab; 