import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { addCard, updateCard } from '../../../store/slices/serviceCardsSlice';
import { ServiceCard } from '../../../store/slices/serviceCardsSlice';
import { RootState } from '../../../store';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активна' },
  { value: 'inactive', label: 'Неактивна' },
  { value: 'expired', label: 'Изтекла' },
  { value: 'suspended', label: 'Прекратена' },
];

const ServiceCardForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const card = useSelector((state: RootState) => 
    isEditMode ? state.serviceCards.cards.find(c => c.id === id) : null
  );

  const [formData, setFormData] = React.useState<Partial<ServiceCard>>({
    cardNumber: card?.cardNumber || '',
    holderName: card?.holderName || '',
    type: card?.type || 'Служебна',
    validFrom: card?.validFrom || new Date().toISOString().split('T')[0],
    validTo: card?.validTo || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    status: card?.status || 'active',
    employeeNumber: card?.employeeNumber || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<ServiceCard>) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && id) {
      const updatedCard: ServiceCard = {
        id,
        ...formData as Omit<ServiceCard, 'id'>,
      };
      dispatch(updateCard(updatedCard));
    } else {
      const newCard: ServiceCard = {
        id: Date.now().toString(),
        ...formData as Omit<ServiceCard, 'id'>,
      };
      dispatch(addCard(newCard));
    }
    navigate('/documents/service-cards');
  };

  if (isEditMode && !card) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Картата не е намерена
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {isEditMode ? 'Редактиране на служебна карта' : 'Добавяне на служебна карта'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Номер на карта"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
              />

              <TextField
                required
                fullWidth
                label="Име на притежател"
                name="holderName"
                value={formData.holderName}
                onChange={handleChange}
              />

              <TextField
                required
                fullWidth
                label="Служебен номер"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
              />

              <TextField
                required
                fullWidth
                type="date"
                label="Валидна от"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                required
                fullWidth
                type="date"
                label="Валидна до"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Статус"
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map(status => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/documents/service-cards')}
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#006837',
                    '&:hover': {
                      backgroundColor: '#004d29',
                    },
                  }}
                >
                  Запази
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ServiceCardForm; 