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
import { addCard, updateCard } from '../../../store/slices/subscriptionCardsSlice';
import { SubscriptionCard } from '../../../store/slices/subscriptionCardsSlice';
import { RootState } from '../../../store';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активна' },
  { value: 'inactive', label: 'Неактивна' },
  { value: 'expired', label: 'Изтекла' },
  { value: 'suspended', label: 'Прекратена' },
];

const SubscriptionCardForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const card = useSelector((state: RootState) => 
    isEditMode ? state.subscriptionCards.cards.find(c => c.id === id) : null
  );
  const documents = useSelector((state: RootState) => state.documents.documents);

  const [formData, setFormData] = React.useState<Partial<SubscriptionCard>>({
    cardNumber: card?.cardNumber || '',
    holderName: card?.holderName || '',
    type: card?.type || 'Месечен',
    validFrom: card?.validFrom || new Date().toISOString().split('T')[0],
    validTo: card?.validTo || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    status: card?.status || 'active',
    documentType: card?.documentType || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<SubscriptionCard>) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && id) {
      const updatedCard: SubscriptionCard = {
        id,
        ...formData as Omit<SubscriptionCard, 'id'>,
      };
      dispatch(updateCard(updatedCard));
    } else {
      const newCard: SubscriptionCard = {
        id: Date.now().toString(),
        ...formData as Omit<SubscriptionCard, 'id'>,
      };
      dispatch(addCard(newCard));
    }
    navigate('/documents/discount-cards');
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
            {isEditMode ? 'Редактиране на абонаментна карта' : 'Добавяне на абонаментна карта'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Тип документ</InputLabel>
                <Select
                  name="documentType"
                  value={formData.documentType}
                  label="Тип документ"
                  onChange={handleChange}
                >
                  {documents.map(doc => (
                    <MenuItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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

              <FormControl fullWidth>
                <InputLabel>Тип</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Тип"
                  onChange={handleChange}
                >
                  <MenuItem value="Месечен">Месечен</MenuItem>
                  <MenuItem value="Годишен">Годишен</MenuItem>
                  <MenuItem value="Студентски">Студентски</MenuItem>
                  <MenuItem value="Пенсионерски">Пенсионерски</MenuItem>
                </Select>
              </FormControl>

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
                  onClick={() => navigate('/documents/discount-cards')}
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

export default SubscriptionCardForm; 