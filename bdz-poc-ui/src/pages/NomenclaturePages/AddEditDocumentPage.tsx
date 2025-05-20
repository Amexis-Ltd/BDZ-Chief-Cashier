import React, { useState, useEffect } from 'react';
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
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  MenuItem
} from '@mui/material';
import { RootState } from '../../store';
import { addDocument, updateDocument } from '../../store/slices/documentsSlice';

interface DocumentForm {
  id: string;
  name: string;
  shortName: string;
  price: number;
  allowDuplicate: boolean;
  duplicatePrice?: number;
  description: string;
  class: string;
  category: string;
  discount: string;
  isActive: boolean;
}

// TODO: Това трябва да дойде от API
const documentClasses = ['Първи', 'Втори', 'Трети'];
const documentCategories = ['Възрастен', 'Детски', 'Пенсионерски', 'Студентски'];
const documentDiscounts = ['Без намаление', '10%', '20%', '30%', '50%'];

const AddEditDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const documents = useSelector((state: RootState) => state.documents.documents);

  const [formData, setFormData] = useState<DocumentForm>({
    id: '',
    name: '',
    shortName: '',
    price: 0,
    allowDuplicate: false,
    duplicatePrice: 0,
    description: '',
    class: '',
    category: '',
    discount: '',
    isActive: true,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const document = documents.find(d => d.id === id);
      if (document) {
        setFormData({
          id: document.id,
          name: document.name,
          shortName: document.shortName,
          price: document.price,
          allowDuplicate: document.allowDuplicate,
          duplicatePrice: document.duplicatePrice,
          description: document.description,
          class: document.class,
          category: document.category,
          discount: document.discount,
          isActive: document.isActive,
        });
      }
    }
  }, [id, documents]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Валидация
    if (!formData.name) {
      setError('Моля, въведете име на документа');
      return;
    }
    if (!formData.shortName) {
      setError('Моля, въведете кратко име на документа');
      return;
    }
    if (!formData.price || formData.price < 0) {
      setError('Моля, въведете валидна цена на документа');
      return;
    }
    if (formData.allowDuplicate && (!formData.duplicatePrice || formData.duplicatePrice < 0)) {
      setError('Моля, въведете валидна цена за дубликат');
      return;
    }
    if (!formData.description) {
      setError('Моля, въведете описание на документа');
      return;
    }
    if (!formData.class) {
      setError('Моля, изберете клас на документа');
      return;
    }
    if (!formData.category) {
      setError('Моля, изберете категория на документа');
      return;
    }
    if (!formData.discount) {
      setError('Моля, изберете намаление на документа');
      return;
    }

    try {
      if (id) {
        dispatch(updateDocument(formData));
      } else {
        dispatch(addDocument({
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        }));
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/nomenclatures/documents');
      }, 1500);
    } catch (err) {
      setError('Възникна грешка при запазване на документа');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              {id ? 'Редакция на документ' : 'Добавяне на документ'}
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success">
                  Документът беше успешно {id ? 'редактиран' : 'добавен'}
                </Alert>
              )}

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <TextField
                  label="Име"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                />

                <TextField
                  label="Кратко име"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <TextField
                  label="Цена"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  size="small"
                  InputProps={{
                    endAdornment: 'лв.',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.allowDuplicate}
                        onChange={handleChange}
                        name="allowDuplicate"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#2e7d32',
                            '& + .MuiSwitch-track': {
                              backgroundColor: '#4caf50',
                            },
                          },
                        }}
                      />
                    }
                    label="Позволява издаване на дубликат"
                  />
                  {formData.allowDuplicate && (
                    <TextField
                      label="Цена за дубликат"
                      name="duplicatePrice"
                      type="number"
                      value={formData.duplicatePrice}
                      onChange={handleChange}
                      required
                      size="small"
                      InputProps={{
                        endAdornment: 'лв.',
                      }}
                      sx={{
                        width: '150px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          backgroundColor: '#fff',
                        }
                      }}
                    />
                  )}
                </Box>
              </Box>

              <TextField
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={2}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                  }
                }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                <TextField
                  select
                  label="Клас"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                >
                  {documentClasses.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Категория"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                >
                  {documentCategories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Намаление"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                    }
                  }}
                >
                  {documentDiscounts.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleChange}
                    name="isActive"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2e7d32',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#4caf50',
                        },
                      },
                    }}
                  />
                }
                label="Активен"
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/nomenclatures/documents')}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'none',
                    borderColor: '#2e7d32',
                    color: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                    }
                  }}
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                    },
                    borderRadius: '4px',
                    textTransform: 'none',
                  }}
                >
                  {id ? 'Запази' : 'Добави'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddEditDocumentPage; 