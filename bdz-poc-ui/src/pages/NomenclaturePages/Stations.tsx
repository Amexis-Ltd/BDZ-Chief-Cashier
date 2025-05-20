import { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Station {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

const Stations = () => {
  const [stations, setStations] = useState<Station[]>([
    { id: 1, name: 'София', code: 'SF', isActive: true },
    { id: 2, name: 'Пловдив', code: 'PD', isActive: true },
    { id: 3, name: 'Варна', code: 'VN', isActive: true },
    { id: 4, name: 'Бургас', code: 'BG', isActive: true },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationName, setStationName] = useState('');
  const [stationCode, setStationCode] = useState('');

  const handleAddClick = () => {
    setSelectedStation(null);
    setStationName('');
    setStationCode('');
    setDialogOpen(true);
  };

  const handleEditClick = (station: Station) => {
    setSelectedStation(station);
    setStationName(station.name);
    setStationCode(station.code);
    setDialogOpen(true);
  };

  const handleDeleteClick = (stationId: number) => {
    setStations(stations.filter(station => station.id !== stationId));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedStation(null);
    setStationName('');
    setStationCode('');
  };

  const handleDialogSubmit = () => {
    if (selectedStation) {
      // Edit existing station
      setStations(stations.map(station =>
        station.id === selectedStation.id
          ? { ...station, name: stationName, code: stationCode }
          : station
      ));
    } else {
      // Add new station
      const newStation: Station = {
        id: Math.max(0, ...stations.map(s => s.id)) + 1,
        name: stationName,
        code: stationCode,
        isActive: true,
      };
      setStations([...stations, newStation]);
    }
    handleDialogClose();
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Номенклатура гари</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
                sx={{
                  backgroundColor: '#006837',
                  '&:hover': {
                    backgroundColor: '#004d29',
                  },
                  borderRadius: 0,
                  textTransform: 'none',
                }}
              >
                Добави гара
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Код</TableCell>
                    <TableCell>Име</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stations.map((station) => (
                    <TableRow key={station.id}>
                      <TableCell>{station.code}</TableCell>
                      <TableCell>{station.name}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: station.isActive ? '#2e7d32' : '#d32f2f',
                            fontWeight: 'medium',
                          }}
                        >
                          {station.isActive ? 'Активна' : 'Неактивна'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEditClick(station)}
                          color="primary"
                          sx={{
                            mr: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(station.id)}
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            },
                          }}
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {selectedStation ? 'Редактирай гара' : 'Добави гара'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Код"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Име"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отказ</Button>
          <Button
            onClick={handleDialogSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#006837',
              '&:hover': {
                backgroundColor: '#004d29',
              },
              borderRadius: 0,
              textTransform: 'none',
            }}
          >
            {selectedStation ? 'Запази' : 'Добави'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stations; 