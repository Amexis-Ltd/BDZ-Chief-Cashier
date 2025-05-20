import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteTrain } from '../../store/slices/trainSlice';
import { TRAIN_TYPES, TRAIN_CATEGORIES, MOVEMENT_PERIODS } from '../../store/slices/trainSlice';

const TrainsListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trains = useSelector((state: RootState) => state.trains.trains);

  const handleDelete = (id: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този влак?')) {
      dispatch(deleteTrain(id));
    }
  };

  const getTrainTypeLabel = (value: string) => {
    return TRAIN_TYPES.find(type => type.value === value)?.label || value;
  };

  const getTrainCategoryLabel = (value: string) => {
    return TRAIN_CATEGORIES.find(category => category.value === value)?.label || value;
  };

  const getMovementPeriodLabel = (value: string) => {
    return MOVEMENT_PERIODS.find(period => period.value === value)?.label || value;
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Списък с влакове
            </Typography>
            <Divider sx={{ flex: 1 }} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/nomenclatures/trains/add')}
            >
              Добави влак
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Номер</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Маршрут</TableCell>
                  <TableCell>Разписание</TableCell>
                  <TableCell>Период</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell>{train.number}</TableCell>
                    <TableCell>{getTrainTypeLabel(train.type)}</TableCell>
                    <TableCell>{getTrainCategoryLabel(train.category)}</TableCell>
                    <TableCell>
                      {train.startStation} - {train.endStation}
                      {train.intermediateStations.length > 0 && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          {train.intermediateStations.join(', ')}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {train.departureTime} - {train.arrivalTime}
                    </TableCell>
                    <TableCell>
                      {getMovementPeriodLabel(train.movementPeriod)}
                      {train.movementPeriod === 'custom' && train.customDays.length > 0 && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          {train.customDays.join(', ')}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/nomenclatures/trains/edit/${train.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(train.id!)}
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
      </Container>
    </Box>
  );
};

export default TrainsListPage; 