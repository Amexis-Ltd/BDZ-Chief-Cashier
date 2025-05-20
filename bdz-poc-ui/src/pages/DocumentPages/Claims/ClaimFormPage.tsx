import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Stack,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../../store';
import { addClaim, updateClaim } from '../../../store/slices/claimsSlice';
import { Claim } from '../../../store/slices/claimsSlice';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Чакаща' },
  { value: 'in_progress', label: 'В процес' },
  { value: 'resolved', label: 'Разрешена' },
  { value: 'rejected', label: 'Отхвърлена' },
];

const TYPE_OPTIONS = [
  { value: 'Забавяне', label: 'Забавяне' },
  { value: 'Отказ', label: 'Отказ' },
  { value: 'Друго', label: 'Друго' },
];

const ClaimFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const claims = useSelector((state: RootState) => state.claims.claims);
  const isEditMode = Boolean(id);

  const [formData, setFormData] = React.useState<Claim>({
    id: '',
    claimNumber: '',
    clientName: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    description: '',
  });

  React.useEffect(() => {
    if (isEditMode && id) {
      const claim = claims.find((c: Claim) => c.id === id);
      if (claim) {
        setFormData(claim);
      }
    }
  }, [isEditMode, id, claims]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateClaim(formData));
    } else {
      dispatch(addClaim({ ...formData, id: Date.now().toString() }));
    }
    navigate('/documents/claims');
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                {isEditMode ? 'Редактиране на рекламация' : 'Нова рекламация'}
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/documents/claims')}
                sx={{
                  borderColor: '#006837',
                  color: '#006837',
                  '&:hover': {
                    borderColor: '#004d29',
                    backgroundColor: 'rgba(0, 104, 55, 0.04)',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Назад
              </Button>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Номер на рекламация"
                    name="claimNumber"
                    value={formData.claimNumber}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Клиент"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    select
                    label="Тип"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    {TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    type="date"
                    label="Дата"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    select
                    label="Статус"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Описание"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/documents/claims')}
                    sx={{
                      borderColor: '#006837',
                      color: '#006837',
                      '&:hover': {
                        borderColor: '#004d29',
                        backgroundColor: 'rgba(0, 104, 55, 0.04)',
                      },
                      borderRadius: '4px',
                      textTransform: 'none',
                    }}
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
                      borderRadius: '4px',
                      textTransform: 'none',
                    }}
                  >
                    {isEditMode ? 'Запази' : 'Добави'}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ClaimFormPage; 