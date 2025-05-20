import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { RootState } from '../../store';
import { deleteStation } from '../../store/slices/stationsSlice';

const StationsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stations = useSelector((state: RootState) => state.stations.stations);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [stationToDelete, setStationToDelete] = React.useState<string | null>(null);

  const handleAdd = () => {
    navigate('/nomenclatures/stations/add');
  };

  const handleEdit = (id: string) => {
    navigate(`/nomenclatures/stations/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setStationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (stationToDelete) {
      dispatch(deleteStation(stationToDelete));
      setDeleteDialogOpen(false);
      setStationToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setStationToDelete(null);
  };

  const getStationName = (id: string) => {
    const station = stations.find(s => s.id === id);
    return station ? station.name : '';
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Гари
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{
                  backgroundColor: '#006837',
                  '&:hover': {
                    backgroundColor: '#004d29',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Добави гара
              </Button>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Име</TableCell>
                    <TableCell>Код</TableCell>
                    <TableCell>Адрес</TableCell>
                    <TableCell>Категория</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Зона</TableCell>
                    <TableCell>Подзона</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stations.map((station) => (
                    <TableRow key={station.id}>
                      <TableCell>{station.name}</TableCell>
                      <TableCell>{station.code}</TableCell>
                      <TableCell>{station.address}</TableCell>
                      <TableCell>{station.category}</TableCell>
                      <TableCell>{station.type}</TableCell>
                      <TableCell>{station.zone}</TableCell>
                      <TableCell>{station.subzone}</TableCell>
                      <TableCell>{station.isActive ? 'Активна' : 'Неактивна'}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(station.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(station.id)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете гара "{getStationName(stationToDelete || '')}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Отказ
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StationsPage; 