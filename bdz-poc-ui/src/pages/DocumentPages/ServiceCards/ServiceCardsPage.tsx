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
  Dialog,
  Stack,
  Divider,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RootState } from '../../../store';
import { deleteCard } from '../../../store/slices/serviceCardsSlice';
import { ServiceCard } from '../../../store/slices/serviceCardsSlice';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активна' },
  { value: 'inactive', label: 'Неактивна' },
  { value: 'expired', label: 'Изтекла' },
  { value: 'suspended', label: 'Прекратена' },
];

const ServiceCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.serviceCards.cards);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState<string | null>(null);

  // Филтри
  const [filters, setFilters] = React.useState({
    holderName: '',
    cardNumber: '',
    validFrom: '',
    validTo: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredCards = cards.filter(card => {
    const matchesHolder = card.holderName.toLowerCase().includes(filters.holderName.toLowerCase());
    const matchesNumber = card.cardNumber.toLowerCase().includes(filters.cardNumber.toLowerCase());
    const matchesFrom = !filters.validFrom || card.validFrom >= filters.validFrom;
    const matchesTo = !filters.validTo || card.validTo <= filters.validTo;
    return matchesHolder && matchesNumber && matchesFrom && matchesTo;
  });

  const handleOpenForm = (card?: ServiceCard) => {
    if (card) {
      navigate(`/documents/service-cards/edit/${card.id}`);
    } else {
      navigate('/documents/service-cards/add');
    }
  };

  const handleDelete = (id: string) => {
    setCardToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (cardToDelete) {
      dispatch(deleteCard(cardToDelete));
      setDeleteDialogOpen(false);
      setCardToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCardToDelete(null);
  };

  const getCardNumber = (id: string) => {
    const card = cards.find(c => c.id === id);
    return card ? card.cardNumber : '';
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Служебни карти
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenForm()}
                sx={{
                  backgroundColor: '#006837',
                  '&:hover': {
                    backgroundColor: '#004d29',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Добави
              </Button>
            </Stack>

            {/* Филтри */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Притежател"
                    name="holderName"
                    value={filters.holderName}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Номер на карта"
                    name="cardNumber"
                    value={filters.cardNumber}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Валидна от"
                    name="validFrom"
                    value={filters.validFrom}
                    onChange={handleFilterChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Валидна до"
                    name="validTo"
                    value={filters.validTo}
                    onChange={handleFilterChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Stack>
            </Paper>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Номер на карта</TableCell>
                    <TableCell>Име на притежател</TableCell>
                    <TableCell>Служебен номер</TableCell>
                    <TableCell>Валидна от</TableCell>
                    <TableCell>Валидна до</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell>{card.cardNumber}</TableCell>
                      <TableCell>{card.holderName}</TableCell>
                      <TableCell>{card.employeeNumber}</TableCell>
                      <TableCell>{new Date(card.validFrom).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(card.validTo).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {STATUS_OPTIONS.find(status => status.value === card.status)?.label || card.status}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/documents/service-cards/${card.id}/view`)}
                          title="Преглед"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenForm(card)}
                          title="Редактиране"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(card.id)}
                          title="Изтриване"
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
            Сигурни ли сте, че искате да изтриете карта "{getCardNumber(cardToDelete || '')}"?
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

export default ServiceCardsPage; 