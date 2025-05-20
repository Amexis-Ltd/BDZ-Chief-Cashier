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
import { addDocument, updateDocument } from '../../../store/slices/travelDocumentsSlice';
import { TravelDocument } from '../../../store/slices/travelDocumentsSlice';
import { RootState } from '../../../store';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активен' },
  { value: 'inactive', label: 'Неактивен' },
  { value: 'expired', label: 'Изтекъл' },
  { value: 'suspended', label: 'Прекратен' },
];

const TYPE_OPTIONS = [
  { value: 'ticket', label: 'Билет' },
  { value: 'reservation', label: 'Резервация' },
  { value: 'pass', label: 'Пропуск' },
];

const TravelDocumentForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const document = useSelector((state: RootState) => 
    isEditMode ? state.travelDocuments.documents.find(d => d.id === id) : null
  );

  const [formData, setFormData] = React.useState<Partial<TravelDocument>>({
    documentNumber: document?.documentNumber || '',
    clientName: document?.clientName || '',
    type: document?.type || 'ticket',
    date: document?.date || new Date().toISOString().split('T')[0],
    status: document?.status || 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<TravelDocument>) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && id) {
      const updatedDocument: TravelDocument = {
        id,
        ...formData as Omit<TravelDocument, 'id'>,
      };
      dispatch(updateDocument(updatedDocument));
    } else {
      const newDocument: TravelDocument = {
        id: Date.now().toString(),
        ...formData as Omit<TravelDocument, 'id'>,
      };
      dispatch(addDocument(newDocument));
    }
    navigate('/documents/travel-documents');
  };

  if (isEditMode && !document) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Документът не е намерен
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
            {isEditMode ? 'Редактиране на превозен документ' : 'Добавяне на превозен документ'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Номер на документ"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
              />

              <TextField
                required
                fullWidth
                label="Име на клиент"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>Тип на документ</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Тип на документ"
                  onChange={handleChange}
                >
                  {TYPE_OPTIONS.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                type="date"
                label="Дата"
                name="date"
                value={formData.date}
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
                  onClick={() => navigate('/documents/travel-documents')}
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

export default TravelDocumentForm; 