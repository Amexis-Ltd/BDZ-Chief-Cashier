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

interface Wagon {
  id: number;
  number: string;
  type: string;
  capacity: number;
  isActive: boolean;
}

const Wagons = () => {
  const [wagons, setWagons] = useState<Wagon[]>([
    { id: 1, number: '12345', type: 'Товарен', capacity: 60, isActive: true },
    { id: 2, number: '23456', type: 'Пътнически', capacity: 80, isActive: true },
    { id: 3, number: '34567', type: 'Товарен', capacity: 70, isActive: true },
    { id: 4, number: '45678', type: 'Пътнически', capacity: 90, isActive: true },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWagon, setSelectedWagon] = useState<Wagon | null>(null);
  const [wagonNumber, setWagonNumber] = useState('');
  const [wagonType, setWagonType] = useState('');
  const [wagonCapacity, setWagonCapacity] = useState('');

  const handleAddClick = () => {
    setSelectedWagon(null);
    setWagonNumber('');
    setWagonType('');
    setWagonCapacity('');
    setDialogOpen(true);
  };

  const handleEditClick = (wagon: Wagon) => {
    setSelectedWagon(wagon);
    setWagonNumber(wagon.number);
    setWagonType(wagon.type);
    setWagonCapacity(wagon.capacity.toString());
    setDialogOpen(true);
  };

  const handleDeleteClick = (wagonId: number) => {
    setWagons(wagons.filter(wagon => wagon.id !== wagonId));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedWagon(null);
    setWagonNumber('');
    setWagonType('');
    setWagonCapacity('');
  };

  const handleDialogSubmit = () => {
    if (selectedWagon) {
      // Edit existing wagon
      setWagons(wagons.map(wagon =>
        wagon.id === selectedWagon.id
          ? { ...wagon, number: wagonNumber, type: wagonType, capacity: parseInt(wagonCapacity) }
          : wagon
      ));
    } else {
      // Add new wagon
      const newWagon: Wagon = {
        id: Math.max(0, ...wagons.map(w => w.id)) + 1,
        number: wagonNumber,
        type: wagonType,
        capacity: parseInt(wagonCapacity),
        isActive: true,
      };
      setWagons([...wagons, newWagon]);
    }
    handleDialogClose();
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Номенклатура вагони</Typography>
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
                Добави вагон
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Номер</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Капацитет</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wagons.map((wagon) => (
                    <TableRow key={wagon.id}>
                      <TableCell>{wagon.number}</TableCell>
                      <TableCell>{wagon.type}</TableCell>
                      <TableCell>{wagon.capacity}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: wagon.isActive ? '#2e7d32' : '#d32f2f',
                            fontWeight: 'medium',
                          }}
                        >
                          {wagon.isActive ? 'Активен' : 'Неактивен'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEditClick(wagon)}
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
                          onClick={() => handleDeleteClick(wagon.id)}
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
          {selectedWagon ? 'Редактирай вагон' : 'Добави вагон'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Номер"
              value={wagonNumber}
              onChange={(e) => setWagonNumber(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Тип"
              value={wagonType}
              onChange={(e) => setWagonType(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Капацитет"
              type="number"
              value={wagonCapacity}
              onChange={(e) => setWagonCapacity(e.target.value)}
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
            {selectedWagon ? 'Запази' : 'Добави'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Wagons; 