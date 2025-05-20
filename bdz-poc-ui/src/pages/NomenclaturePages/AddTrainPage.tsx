import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addTrain, updateTrain, Train } from '../../store/slices/trainSlice';
import { RootState } from '../../store';

// Mock data for dropdowns
const trainTypes = [
  { value: 'БВ', label: 'Бърз влак' },
  { value: 'ПВ', label: 'Пътнически влак' },
  { value: 'ЕВ', label: 'Експресен влак' },
];

const trainCategories = [
  { value: '1', label: 'Категория 1' },
  { value: '2', label: 'Категория 2' },
  { value: '3', label: 'Категория 3' },
];

const stations = [
  'София',
  'Пловдив',
  'Варна',
  'Бургас',
  'Русе',
  'Стара Загора',
  'Плевен',
  'Велико Търново',
  'Благоевград',
  'Добрич',
];

const wagonTypes = [
  { value: '1', label: 'Пътнически вагон' },
  { value: '2', label: 'Спален вагон' },
  { value: '3', label: 'Ресторант' },
  { value: '4', label: 'Багажен вагон' },
];

const movementPeriods = [
  { value: 'daily', label: 'Ежедневно' },
  { value: 'workdays', label: 'Работни дни' },
  { value: 'weekends', label: 'Събота и неделя' },
  { value: 'custom', label: 'По избор' },
];

interface TrainFormData {
  number: string;
  type: string;
  category: string;
  startStation: string;
  endStation: string;
  intermediateStations: string[];
  departureTime: string;
  arrivalTime: string;
  composition: { type: string; count: number }[];
  movementPeriod: string;
  customDays: string[];
}

const RouteVisualization = ({ 
  stations,
  departureTime,
  arrivalTime 
}: { 
  stations: string[];
  departureTime: string;
  arrivalTime: string;
}) => {
  if (!stations.length) return null;

  const startStation = stations[0];
  const endStation = stations[stations.length - 1];
  const intermediateStations = stations.slice(1, -1);

  // Calculate positions percentage-wise
  const getStationPosition = (index: number, total: number) => {
    // Start at 20% and end at 80% of the width
    const startPercent = 20;
    const endPercent = 80;
    const step = (endPercent - startPercent) / (total + 1);
    return startPercent + (step * (index + 1));
  };

  // Format time to 24-hour format
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    // Ensure hours are in 24-hour format
    const hour = parseInt(hours);
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  return (
    <Box sx={{ 
      mt: 4,
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      position: 'relative',
      height: 160,
      display: 'flex',
      alignItems: 'center',
      px: 4,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 160"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Main track */}
        <path
          d={`M 50,80 L 950,80`}
          stroke="#e0e0e0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Start Station */}
        <g transform="translate(50,80)">
          <circle
            r="8"
            fill="#1976d2"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="0"
            y="-25"
            textAnchor="middle"
            fill="#1976d2"
            fontSize="13"
            fontWeight="600"
          >
            {startStation}
          </text>
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#757575"
            fontSize="11"
          >
            {formatTime(departureTime)}
          </text>
          {/* Station icon - building design */}
          <g transform="translate(0,-8)">
            {/* Building base */}
            <path
              d="M-4,2 L4,2 L4,4 L-4,4 Z"
              fill="#1976d2"
              stroke="#fff"
              strokeWidth="0.5"
            />
            {/* Building body */}
            <path
              d="M-3,-2 L3,-2 L3,2 L-3,2 Z"
              fill="#fff"
              stroke="#1976d2"
              strokeWidth="0.5"
            />
            {/* Roof */}
            <path
              d="M-4,-2 L4,-2 L0,-4 Z"
              fill="#1976d2"
              stroke="#fff"
              strokeWidth="0.5"
            />
            {/* Door */}
            <path
              d="M-1,0 L1,0 L1,2 L-1,2 Z"
              fill="#1976d2"
            />
            {/* Windows */}
            <rect x="-2" y="-1" width="1" height="1" fill="#1976d2" />
            <rect x="1" y="-1" width="1" height="1" fill="#1976d2" />
          </g>
        </g>

        {/* Intermediate Stations */}
        {intermediateStations.map((station, index) => {
          const x = getStationPosition(index, intermediateStations.length) * 10; // Convert percentage to pixels
          return (
            <g key={`intermediate-${index}`} transform={`translate(${x},80)`}>
              <circle
                r="6"
                fill="#757575"
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x="0"
                y="-25"
                textAnchor="middle"
                fill="#424242"
                fontSize="13"
                fontWeight="600"
              >
                {station}
              </text>
              <text
                x="0"
                y="25"
                textAnchor="middle"
                fill="#757575"
                fontSize="11"
              >
                Междинна
              </text>
            </g>
          );
        })}

        {/* End Station */}
        <g transform="translate(950,80)">
          <circle
            r="8"
            fill="#2e7d32"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="0"
            y="-25"
            textAnchor="middle"
            fill="#2e7d32"
            fontSize="13"
            fontWeight="600"
          >
            {endStation}
          </text>
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#757575"
            fontSize="11"
          >
            {formatTime(arrivalTime)}
          </text>
          {/* Station icon - building design */}
          <g transform="translate(0,-8)">
            {/* Building base */}
            <path
              d="M-4,2 L4,2 L4,4 L-4,4 Z"
              fill="#2e7d32"
              stroke="#fff"
              strokeWidth="0.5"
            />
            {/* Building body */}
            <path
              d="M-3,-2 L3,-2 L3,2 L-3,2 Z"
              fill="#fff"
              stroke="#2e7d32"
              strokeWidth="0.5"
            />
            {/* Roof */}
            <path
              d="M-4,-2 L4,-2 L0,-4 Z"
              fill="#2e7d32"
              stroke="#fff"
              strokeWidth="0.5"
            />
            {/* Door */}
            <path
              d="M-1,0 L1,0 L1,2 L-1,2 Z"
              fill="#2e7d32"
            />
            {/* Windows */}
            <rect x="-2" y="-1" width="1" height="1" fill="#2e7d32" />
            <rect x="1" y="-1" width="1" height="1" fill="#2e7d32" />
          </g>
        </g>

        {/* Train Icon */}
        <g transform="translate(100,80)">
          {/* Main body */}
          <path
            d="M-30,-4 L30,-4 L30,4 L-30,4 Z"
            fill="#2e7d32"
            stroke="#fff"
            strokeWidth="1"
          />
          {/* Front cabin */}
          <path
            d="M30,-4 L38,-4 L38,4 L30,4 Z"
            fill="#1b5e20"
            stroke="#fff"
            strokeWidth="1"
          />
          {/* Front detail */}
          <path
            d="M38,-4 L42,-4 L42,4 L38,4 Z"
            fill="#1b5e20"
            stroke="#fff"
            strokeWidth="1"
          />
          {/* Chimney */}
          <path
            d="M-25,-4 L-21,-4 L-21,-1 L-25,-1 Z"
            fill="#424242"
            stroke="#fff"
            strokeWidth="1"
          />
          {/* Windows */}
          <rect x="-26" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="-20" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="-14" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="-8" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="-2" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="4" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="10" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="16" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="22" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="28" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          <rect x="34" y="-2" width="4" height="3" fill="#fff" rx="0.5" />
          {/* Headlight */}
          <circle cx="42" cy="0" r="1.5" fill="#ffd700" />
          {/* Side detail */}
          <path
            d="M-30,4 L30,4 L30,5 L-30,5 Z"
            fill="#1b5e20"
            stroke="#fff"
            strokeWidth="1"
          />
          {/* Wheels */}
          <circle cx="-24" cy="5" r="2" fill="#424242" />
          <circle cx="-16" cy="5" r="2" fill="#424242" />
          <circle cx="-8" cy="5" r="2" fill="#424242" />
          <circle cx="0" cy="5" r="2" fill="#424242" />
          <circle cx="8" cy="5" r="2" fill="#424242" />
          <circle cx="16" cy="5" r="2" fill="#424242" />
          <circle cx="24" cy="5" r="2" fill="#424242" />
          <circle cx="32" cy="5" r="2" fill="#424242" />
          {/* Wheel details */}
          <circle cx="-24" cy="5" r="1" fill="#757575" />
          <circle cx="-16" cy="5" r="1" fill="#757575" />
          <circle cx="-8" cy="5" r="1" fill="#757575" />
          <circle cx="0" cy="5" r="1" fill="#757575" />
          <circle cx="8" cy="5" r="1" fill="#757575" />
          <circle cx="16" cy="5" r="1" fill="#757575" />
          <circle cx="24" cy="5" r="1" fill="#757575" />
          <circle cx="32" cy="5" r="1" fill="#757575" />
          {/* Smoke effect */}
          <path
            d="M-25,-1 Q-28,-3 -30,-4 Q-32,-5 -35,-6"
            stroke="#757575"
            strokeWidth="0.5"
            fill="none"
          />
        </g>
      </svg>
    </Box>
  );
};

const AddTrainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  const trains = useSelector((state: RootState) => state.trains.trains);
  const trainToEdit = isEditMode ? trains.find((train: Train) => train.id === id) : null;

  const [formData, setFormData] = useState<TrainFormData>(() => {
    if (isEditMode && trainToEdit) {
      return {
        number: trainToEdit.number,
        type: trainToEdit.type,
        category: trainToEdit.category,
        startStation: trainToEdit.startStation,
        endStation: trainToEdit.endStation,
        intermediateStations: trainToEdit.intermediateStations,
        departureTime: trainToEdit.departureTime,
        arrivalTime: trainToEdit.arrivalTime,
        composition: trainToEdit.composition,
        movementPeriod: trainToEdit.movementPeriod,
        customDays: trainToEdit.customDays,
      };
    }
    return {
      number: '',
      type: '',
      category: '',
      startStation: '',
      endStation: '',
      intermediateStations: [],
      departureTime: '',
      arrivalTime: '',
      composition: [],
      movementPeriod: '',
      customDays: [],
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && trainToEdit) {
      dispatch(updateTrain({ ...formData, id: trainToEdit.id }));
    } else {
      dispatch(addTrain(formData));
    }
    navigate('/nomenclatures/trains');
  };

  const handleAddWagon = () => {
    setFormData({
      ...formData,
      composition: [...formData.composition, { type: '', count: 1 }],
    });
  };

  const handleRemoveWagon = (index: number) => {
    const newComposition = [...formData.composition];
    newComposition.splice(index, 1);
    setFormData({
      ...formData,
      composition: newComposition,
    });
  };

  const handleWagonChange = (index: number, field: 'type' | 'count', value: string | number) => {
    const newComposition = [...formData.composition];
    newComposition[index] = {
      ...newComposition[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      composition: newComposition,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {isEditMode ? 'Редактиране на влак' : 'Добавяне на влак'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Основна информация */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Основна информация
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    required
                    label="Номер на влака"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    size="small"
                  />
                  <FormControl fullWidth required size="small">
                    <InputLabel>Тип на влака</InputLabel>
                    <Select
                      value={formData.type}
                      label="Тип на влака"
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      {trainTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth required size="small">
                    <InputLabel>Категория</InputLabel>
                    <Select
                      value={formData.category}
                      label="Категория"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {trainCategories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Paper>

              {/* Маршрут и разписание */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Маршрут и разписание
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Autocomplete
                      fullWidth
                      options={stations}
                      value={formData.startStation}
                      onChange={(_, newValue) => setFormData({ ...formData, startStation: newValue || '' })}
                      renderInput={(params) => (
                        <TextField {...params} required label="Начална гара" size="small" />
                      )}
                    />
                    <Autocomplete
                      fullWidth
                      options={stations}
                      value={formData.endStation}
                      onChange={(_, newValue) => setFormData({ ...formData, endStation: newValue || '' })}
                      renderInput={(params) => (
                        <TextField {...params} required label="Крайна гара" size="small" />
                      )}
                    />
                    <TextField
                      fullWidth
                      required
                      type="time"
                      label="Час на тръгване"
                      value={formData.departureTime}
                      onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      inputProps={{
                        step: 300, // 5 min intervals
                        format: "24h"
                      }}
                      sx={{
                        '& input[type="time"]::-webkit-calendar-picker-indicator': {
                          filter: 'invert(0.5)',
                        },
                        '& input[type="time"]::-webkit-datetime-edit-ampm-field': {
                          display: 'none',
                        },
                        '& input[type="time"]::-moz-datetime-edit-ampm-field': {
                          display: 'none',
                        },
                        '& input[type="time"]::-webkit-inner-spin-button': {
                          display: 'none',
                        },
                        '& input[type="time"]::-webkit-clear-button': {
                          display: 'none',
                        },
                        '& input[type="time"]': {
                          '&::-webkit-datetime-edit': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-hour-field': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-minute-field': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-text': {
                            padding: '0',
                          },
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      required
                      type="time"
                      label="Час на пристигане"
                      value={formData.arrivalTime}
                      onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      inputProps={{
                        step: 300, // 5 min intervals
                        format: "24h"
                      }}
                      sx={{
                        '& input[type="time"]::-webkit-calendar-picker-indicator': {
                          filter: 'invert(0.5)',
                        },
                        '& input[type="time"]::-webkit-datetime-edit-ampm-field': {
                          display: 'none',
                        },
                        '& input[type="time"]::-moz-datetime-edit-ampm-field': {
                          display: 'none',
                        },
                        '& input[type="time"]::-webkit-inner-spin-button': {
                          display: 'none',
                        },
                        '& input[type="time"]::-webkit-clear-button': {
                          display: 'none',
                        },
                        '& input[type="time"]': {
                          '&::-webkit-datetime-edit': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-hour-field': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-minute-field': {
                            padding: '0',
                          },
                          '&::-webkit-datetime-edit-text': {
                            padding: '0',
                          },
                        }
                      }}
                    />
                  </Stack>
                  <Autocomplete
                    multiple
                    options={stations}
                    value={formData.intermediateStations}
                    onChange={(_, newValue) => setFormData({ ...formData, intermediateStations: newValue })}
                    renderInput={(params) => (
                      <TextField {...params} label="Междинни гари" size="small" />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                        />
                      ))
                    }
                  />
                </Stack>
              </Paper>

              {/* Период и композиция */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Период на движение */}
                <Paper sx={{ p: 2, flex: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                      Период на движение
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Stack>
                  <Stack spacing={2}>
                    <FormControl fullWidth required size="small">
                      <InputLabel>Период</InputLabel>
                      <Select
                        value={formData.movementPeriod}
                        label="Период"
                        onChange={(e) => setFormData({ ...formData, movementPeriod: e.target.value })}
                      >
                        {movementPeriods.map((period) => (
                          <MenuItem key={period.value} value={period.value}>
                            {period.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formData.movementPeriod === 'custom' && (
                      <Autocomplete
                        multiple
                        options={['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя']}
                        value={formData.customDays}
                        onChange={(_, newValue) => setFormData({ ...formData, customDays: newValue })}
                        renderInput={(params) => (
                          <TextField {...params} label="Дни на движение" size="small" />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              label={option}
                              {...getTagProps({ index })}
                              key={option}
                              size="small"
                            />
                          ))
                        }
                      />
                    )}
                  </Stack>
                </Paper>

                {/* Композиция */}
                <Paper sx={{ p: 2, flex: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                      Композиция на влака
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Stack>
                  <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 2 }}>
                    <Stack spacing={1}>
                      {formData.composition.map((wagon, index) => (
                        <Stack key={index} direction="row" spacing={1} alignItems="center">
                          <FormControl sx={{ flex: 1 }} size="small">
                            <InputLabel>Тип вагон</InputLabel>
                            <Select
                              value={wagon.type}
                              label="Тип вагон"
                              onChange={(e) => handleWagonChange(index, 'type', e.target.value)}
                            >
                              {wagonTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                  {type.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            type="number"
                            label="Брой"
                            value={wagon.count}
                            onChange={(e) => handleWagonChange(index, 'count', parseInt(e.target.value))}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ width: '80px' }}
                            size="small"
                          />
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveWagon(index)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddWagon}
                    size="small"
                    variant="outlined"
                  >
                    Добави вагон
                  </Button>
                </Paper>
              </Stack>

              {/* Визуализация на маршрута */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Визуализация на маршрута
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Stack>
                <RouteVisualization 
                  stations={[
                    formData.startStation,
                    ...formData.intermediateStations,
                    formData.endStation
                  ].filter(Boolean)}
                  departureTime={formData.departureTime}
                  arrivalTime={formData.arrivalTime}
                />
              </Paper>

              {/* Бутони за действие */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/nomenclatures/trains')}
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  variant="contained"
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

export default AddTrainPage; 