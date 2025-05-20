import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { WagonType } from '../../store/slices/wagonsSlice';
import SeatLayoutPreview from './SeatLayoutPreview';

// Списък с възможни удобства
const AMENITIES = [
  'Климатик',
  'Отопление',
  'Електрически контакти',
  'Wi-Fi',
  'Тоалетна',
  'Багажно отделение',
  'Купе',
  'Ресторант',
  'Бар',
  'Достъп за инвалидни колички',
  'Детска стая',
  'Куриерска служба',
];

// Списък с технически характеристики
const TECHNICAL_SPECS = [
  'Максимална скорост',
  'Тегло',
  'Дължина',
  'Ширина',
  'Височина',
];

interface WagonTypeFormProps {
  initialData?: WagonType;
  onSubmit: (data: WagonType) => void;
  onCancel: () => void;
}

const WagonTypeForm: React.FC<WagonTypeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<WagonType>(
    initialData || {
      id: '',
      name: '',
      code: '',
      capacity: 0,
      seatLayout: {
        rows: 0,
        seatsPerRow: 0,
        layout: '',
        seatOptions: {},
        compartments: 0
      },
      class: 'Second',
      isActive: true,
      amenities: [],
      technicalSpecs: {}
    }
  );

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('seatLayout.')) {
      const subField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seatLayout: {
          ...prev.seatLayout,
          [subField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSeatOptionsChange = (seatOptions: { [key: number]: string[] }) => {
    setFormData(prev => ({
      ...prev,
      seatLayout: {
        ...prev.seatLayout,
        seatOptions
      }
    }));
  };

  const handleTechnicalSpecChange = (spec: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      technicalSpecs: {
        ...prev.technicalSpecs,
        [spec]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Основна информация
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Наименование"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Код"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth required>
                <InputLabel>Клас</InputLabel>
                <Select
                  value={formData.class}
                  label="Клас"
                  onChange={(e) => handleChange('class', e.target.value)}
                >
                  <MenuItem value="First">Първи</MenuItem>
                  <MenuItem value="Second">Втори</MenuItem>
                  <MenuItem value="Third">Трети</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Капацитет и схема на местата
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                type="number"
                label="Общ капацитет"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', Number(e.target.value))}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                label="Брой редове"
                type="number"
                value={formData.seatLayout.rows}
                onChange={(e) => handleChange('seatLayout.rows', parseInt(e.target.value) || 0)}
                fullWidth
                required
              />
              <TextField
                label="Места на ред"
                type="number"
                value={formData.seatLayout.seatsPerRow}
                onChange={(e) => handleChange('seatLayout.seatsPerRow', parseInt(e.target.value) || 0)}
                fullWidth
                required
              />
              <TextField
                label="Брой купета"
                type="number"
                value={formData.seatLayout.compartments}
                onChange={(e) => handleChange('seatLayout.compartments', parseInt(e.target.value) || 0)}
                fullWidth
                required
              />
            </Box>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Удобства
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Изберете удобства</InputLabel>
            <Select
              multiple
              value={formData.amenities}
              onChange={(e) => handleChange('amenities', e.target.value)}
              input={<OutlinedInput label="Изберете удобства" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {AMENITIES.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Технически характеристики
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {TECHNICAL_SPECS.map((spec) => (
              <Box key={spec} sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label={spec}
                  value={formData.technicalSpecs[spec] || ''}
                  onChange={(e) => handleTechnicalSpecChange(spec, e.target.value)}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        {formData.seatLayout.rows > 0 && formData.seatLayout.seatsPerRow > 0 && (
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Схема на местата
            </Typography>
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}>
              <SeatLayoutPreview
                rows={formData.seatLayout.rows}
                seatsPerRow={formData.seatLayout.seatsPerRow}
                class={formData.class}
                onSeatOptionsChange={handleSeatOptionsChange}
                compartments={formData.seatLayout.compartments}
              />
            </Box>
          </Paper>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" onClick={onCancel}>
          Отказ
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? 'Запази' : 'Създай'}
        </Button>
      </Box>
    </Box>
  );
};

export default WagonTypeForm; 