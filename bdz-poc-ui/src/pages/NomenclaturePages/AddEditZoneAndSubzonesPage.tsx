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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  OutlinedInput,
  Chip,
} from '@mui/material';
import { RootState } from '../../store';
import { addZone, updateZone } from '../../store/slices/zonesSlice';

interface ZoneForm {
  id: string;
  name: string;
  description: string;
  stations: string[];
  priceClass: string;
  isActive: boolean;
}

const PRICE_CLASSES = [
  { value: 'A', label: 'Клас A' },
  { value: 'B', label: 'Клас B' },
  { value: 'C', label: 'Клас C' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddEditZoneAndSubzonesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const zones = useSelector((state: RootState) => state.zones.zones);
  const stations = useSelector((state: RootState) => state.stations.stations);

  const [formData, setFormData] = useState<ZoneForm>({
    id: '',
    name: '',
    description: '',
    stations: [],
    priceClass: '',
    isActive: true,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const zone = zones.find(z => z.id === id);
      if (zone) {
        setFormData({
          id: zone.id,
          name: zone.name,
          description: zone.description || '',
          stations: zone.stations || [],
          priceClass: zone.priceClass || '',
          isActive: zone.isActive,
        });
      }
    }
  }, [id, zones]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isActive' ? checked : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStationChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      stations: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Валидация
    if (!formData.name) {
      setError('Моля, въведете име на зоната');
      return;
    }
    if (!formData.description) {
      setError('Моля, въведете описание на зоната');
      return;
    }
    if (!formData.priceClass) {
      setError('Моля, изберете ценови клас');
      return;
    }
    if (formData.stations.length === 0) {
      setError('Моля, изберете поне една гара');
      return;
    }

    try {
      if (id) {
        dispatch(updateZone(formData));
      } else {
        dispatch(addZone({
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        }));
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/nomenclatures/zones-and-subzones');
      }, 1500);
    } catch (err) {
      setError('Възникна грешка при запазване на зоната');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              {id ? 'Редакция на зона' : 'Добавяне на зона'}
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
                  Зоната беше успешно {id ? 'редактирана' : 'добавена'}
                </Alert>
              )}

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <TextField
                  label="Име на зоната"
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

                <FormControl size="small" sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                  }
                }}>
                  <InputLabel>Ценови клас</InputLabel>
                  <Select
                    name="priceClass"
                    value={formData.priceClass}
                    onChange={handleSelectChange}
                    label="Ценови клас"
                    required
                  >
                    {PRICE_CLASSES.map((priceClass) => (
                      <MenuItem key={priceClass.value} value={priceClass.value}>
                        {priceClass.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

              <FormControl size="small" sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                }
              }}>
                <InputLabel>Гари в зоната</InputLabel>
                <Select
                  multiple
                  value={formData.stations}
                  onChange={handleStationChange}
                  input={<OutlinedInput label="Гари в зоната" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const station = stations.find(s => s.id === value);
                        return (
                          <Chip
                            key={value}
                            label={station?.name || value}
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
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  required
                >
                  {stations.map((station) => (
                    <MenuItem key={station.id} value={station.id}>
                      {station.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                label="Активна"
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/nomenclatures/zones-and-subzones')}
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

export default AddEditZoneAndSubzonesPage; 