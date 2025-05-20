import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { RootState } from '../../store';
import { WagonType } from '../../store/slices/wagonsSlice';
import { deleteWagonType } from '../../store/slices/wagonsSlice';

const WagonTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wagonTypes = useSelector((state: RootState) => state.wagons.wagonTypes);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wagonTypeToDelete, setWagonTypeToDelete] = useState<WagonType | null>(null);

  const handleAdd = () => {
    navigate('/nomenclatures/wagon-types/add');
  };

  const handleEdit = (id: string) => {
    navigate(`/nomenclatures/wagon-types/edit/${id}`);
  };

  const handleDeleteClick = (wagonType: WagonType) => {
    setWagonTypeToDelete(wagonType);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (wagonTypeToDelete) {
      dispatch(deleteWagonType(wagonTypeToDelete.id));
      setDeleteDialogOpen(false);
      setWagonTypeToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setWagonTypeToDelete(null);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Типове вагони</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleAdd()}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              Добави
            </Button>
          </Box>

          <Divider sx={{ my: 3, mx: 2 }} />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Код</TableCell>
                  <TableCell>Клас</TableCell>
                  <TableCell>Капацитет</TableCell>
                  <TableCell>Удобства</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wagonTypes.map((wagonType) => (
                  <TableRow key={wagonType.id}>
                    <TableCell>{wagonType.name}</TableCell>
                    <TableCell>{wagonType.code}</TableCell>
                    <TableCell>
                      {wagonType.class === 'First' && 'Първи'}
                      {wagonType.class === 'Second' && 'Втори'}
                      {wagonType.class === 'Third' && 'Трети'}
                    </TableCell>
                    <TableCell>{wagonType.capacity}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {wagonType.amenities.map((amenity) => (
                          <Chip
                            key={amenity}
                            label={amenity}
                            size="small"
                            sx={{ backgroundColor: '#e8f5e9' }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={wagonType.isActive ? 'Активен' : 'Неактивен'}
                        color={wagonType.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(wagonType.id)}
                          sx={{ color: '#2e7d32' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(wagonType)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете типа вагон "{wagonTypeToDelete?.name}"?
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

export default WagonTypesPage; 