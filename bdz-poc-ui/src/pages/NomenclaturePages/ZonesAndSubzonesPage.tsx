import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { RootState } from '../../store';

const ZonesAndSubzonesPage: React.FC = () => {
  const navigate = useNavigate();
  const zones = useSelector((state: RootState) => state.zones.zones);
  const stations = useSelector((state: RootState) => state.stations.stations);

  const handleEdit = (id: string) => {
    navigate(`/nomenclatures/zones-and-subzones/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete zone:', id);
  };

  const getStationName = (stationId: string) => {
    const station = stations.find(s => s.id === stationId);
    return station?.name || stationId;
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Зони
            </Typography>
            <Divider sx={{ flex: 1 }} />
            <Button
              variant="contained"
              onClick={() => navigate('/nomenclatures/zones-and-subzones/add')}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
                borderRadius: '4px',
                textTransform: 'none',
              }}
            >
              Добави зона
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell>Ценови клас</TableCell>
                  <TableCell>Гари</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell>{zone.name}</TableCell>
                    <TableCell>{zone.description}</TableCell>
                    <TableCell>{zone.priceClass}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {zone.stations.map((stationId) => (
                          <Chip
                            key={stationId}
                            label={getStationName(stationId)}
                            size="small"
                            sx={{
                              backgroundColor: '#e8f5e9',
                              '& .MuiChip-deleteIcon': {
                                color: '#2e7d32',
                                '&:hover': {
                                  color: '#1b5e20',
                                }
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={zone.isActive ? 'Активна' : 'Неактивна'}
                        color={zone.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(zone.id)}
                          sx={{ color: '#2e7d32' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(zone.id)}
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
    </Box>
  );
};

export default ZonesAndSubzonesPage; 