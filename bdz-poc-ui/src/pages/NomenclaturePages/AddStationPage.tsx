import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { addStation } from '../../store/slices/stationsSlice';
import { Station } from '../../store/slices/stationsSlice';

interface FormData {
  name: string;
  code: string;
  category: string;
  type: string;
  zone: string;
  subzone: string;
  latitude: string;
  longitude: string;
  altitude: string;
  address: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

const AddStationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [deactivationReason, setDeactivationReason] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    category: '',
    type: '',
    zone: '',
    subzone: '',
    latitude: '',
    longitude: '',
    altitude: '',
    address: '',
    workingHours: {
      monday: '08:00 - 20:00',
      tuesday: '08:00 - 20:00',
      wednesday: '08:00 - 20:00',
      thursday: '08:00 - 20:00',
      friday: '08:00 - 20:00',
      saturday: '08:00 - 20:00',
      sunday: '08:00 - 20:00'
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('workingHours.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Добавяме гарата в store
      const newStation: Station = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        code: formData.code,
        category: formData.category,
        type: formData.type,
        zone: formData.zone,
        subzone: formData.subzone,
        address: formData.address,
        coordinates: {
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
        },
        services: [],
        workingHours: formData.workingHours,
        isActive,
        deactivationReason: isActive ? undefined : deactivationReason
      };
      dispatch(addStation(newStation));
      setSuccess(true);
      
      // Навигираме към страницата с гари след 1 секунда
      setTimeout(() => {
        navigate('/nomenclatures/stations');
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Възникна грешка при създаване на гарата');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Добавяне на гара
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Гарата е създадена успешно!
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Основна информация */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Основна информация
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Име"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Код"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 100%' }}>
                    <TextField
                      fullWidth
                      label="Адрес"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>

              {/* Категоризация */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Категоризация
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <FormControl fullWidth required size="small">
                      <InputLabel>Категория</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleSelectChange}
                        label="Категория"
                      >
                        <MenuItem value="Първа категория">Първа категория</MenuItem>
                        <MenuItem value="Втора категория">Втора категория</MenuItem>
                        <MenuItem value="Трета категория">Трета категория</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <FormControl fullWidth required size="small">
                      <InputLabel>Тип</InputLabel>
                      <Select
                        name="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        label="Тип"
                      >
                        <MenuItem value="Пътнически">Пътнически</MenuItem>
                        <MenuItem value="Товарен">Товарен</MenuItem>
                        <MenuItem value="Смесен">Смесен</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <FormControl fullWidth required size="small">
                      <InputLabel>Зона</InputLabel>
                      <Select
                        name="zone"
                        value={formData.zone}
                        onChange={handleSelectChange}
                        label="Зона"
                      >
                        <MenuItem value="Северна">Северна</MenuItem>
                        <MenuItem value="Южна">Южна</MenuItem>
                        <MenuItem value="Западна">Западна</MenuItem>
                        <MenuItem value="Източна">Източна</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <FormControl fullWidth required size="small">
                      <InputLabel>Подзона</InputLabel>
                      <Select
                        name="subzone"
                        value={formData.subzone}
                        onChange={handleSelectChange}
                        label="Подзона"
                      >
                        <MenuItem value="Подзона 1">Подзона 1</MenuItem>
                        <MenuItem value="Подзона 2">Подзона 2</MenuItem>
                        <MenuItem value="Подзона 3">Подзона 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Paper>

              {/* Координати */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Координати
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 250px' }}>
                    <TextField
                      fullWidth
                      label="Географска ширина"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 250px' }}>
                    <TextField
                      fullWidth
                      label="Географска дължина"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 250px' }}>
                    <TextField
                      fullWidth
                      label="Надморска височина"
                      name="altitude"
                      value={formData.altitude}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>

              {/* Работно време */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Работно време
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Понеделник"
                      name="workingHours.monday"
                      value={formData.workingHours.monday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Вторник"
                      name="workingHours.tuesday"
                      value={formData.workingHours.tuesday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Сряда"
                      name="workingHours.wednesday"
                      value={formData.workingHours.wednesday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Четвъртък"
                      name="workingHours.thursday"
                      value={formData.workingHours.thursday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Петък"
                      name="workingHours.friday"
                      value={formData.workingHours.friday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Събота"
                      name="workingHours.saturday"
                      value={formData.workingHours.saturday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      fullWidth
                      label="Неделя"
                      name="workingHours.sunday"
                      value={formData.workingHours.sunday}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>

              {/* Статус */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Статус
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                      />
                    }
                    label="Активна"
                  />
                  {!isActive && (
                    <TextField
                      fullWidth
                      label="Причина за деактивиране"
                      value={deactivationReason}
                      onChange={(e) => setDeactivationReason(e.target.value)}
                      multiline
                      rows={3}
                      size="small"
                    />
                  )}
                </Box>
              </Paper>

              {/* Бутони за действие */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/nomenclatures/stations')}
                  sx={{ borderRadius: 0, textTransform: 'none' }}
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
                    borderRadius: 0,
                    textTransform: 'none',
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

export default AddStationPage; 