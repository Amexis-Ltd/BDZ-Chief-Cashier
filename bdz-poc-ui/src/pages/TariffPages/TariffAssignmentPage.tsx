import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

// Примерни данни за маршрути
const routes = [
  { id: 1, name: 'София - Варна', distance: 450, type: 'междуградски' },
  { id: 2, name: 'София - Бургас', distance: 390, type: 'междуградски' },
  { id: 3, name: 'София - Пловдив', distance: 150, type: 'междуградски' },
  { id: 4, name: 'Пловдив - Варна', distance: 340, type: 'междуградски' },
  { id: 5, name: 'Пловдив - Бургас', distance: 270, type: 'междуградски' },
  { id: 6, name: 'София - Благоевград', distance: 100, type: 'регионален' },
  { id: 7, name: 'София - Кюстендил', distance: 85, type: 'регионален' },
  { id: 8, name: 'Пловдив - Асеновград', distance: 20, type: 'крайградски' },
  { id: 9, name: 'Варна - Добрич', distance: 45, type: 'регионален' },
  { id: 10, name: 'Бургас - Созопол', distance: 35, type: 'крайградски' },
];

// Примерни данни за тарифи
const tariffs = [
  { id: 1, name: 'Стандартна тарифа', type: 'fixed', basePrice: 0.10, description: 'Стандартна фиксирана тарифа - 0.10 лв. на километър' },
  { id: 2, name: 'Динамична тарифа #1', type: 'dynamic', basePrice: 0.09, description: 'Гъвкава тарифа с базова цена 0.09 лв. и множител в зависимост от търсенето' },
  { id: 3, name: 'Лятна промоция', type: 'fixed', basePrice: 0.08, description: 'Промоционална лятна тарифа с отстъпка - 0.08 лв. на километър' },
  { id: 4, name: 'Коледна промоция', type: 'dynamic', basePrice: 0.085, description: 'Коледна тарифа с базова цена 0.085 лв. и множител спрямо търсенето' },
  { id: 5, name: 'Експресна тарифа', type: 'fixed', basePrice: 0.12, description: 'Премиум тарифа за бързи влакове - 0.12 лв. на километър' },
  { id: 6, name: 'Уикенд тарифа', type: 'dynamic', basePrice: 0.095, description: 'Специална тарифа за уикенди с базова цена 0.095 лв. и множител спрямо натовареността' },
];

// Примерни данни за класове
const travelClasses = [
  { id: 1, name: 'Първа класа', multiplier: 1.5, description: 'По-комфортни места с повече пространство' },
  { id: 2, name: 'Втора класа', multiplier: 1.0, description: 'Стандартни места' },
];

// Примерни данни за текущи тарифни назначения
const currentAssignments = [
  { id: 1, routeId: 1, className: 'Първа класа', tariffId: 1, validFrom: '2023-06-01', validTo: '2023-12-31', status: 'active' },
  { id: 2, routeId: 1, className: 'Втора класа', tariffId: 2, validFrom: '2023-06-01', validTo: '2023-12-31', status: 'active' },
  { id: 3, routeId: 2, className: 'Първа класа', tariffId: 1, validFrom: '2023-06-01', validTo: '2023-12-31', status: 'active' },
  { id: 4, routeId: 2, className: 'Втора класа', tariffId: 3, validFrom: '2023-06-01', validTo: '2023-09-30', status: 'active' },
  { id: 5, routeId: 3, className: 'Първа класа', tariffId: 5, validFrom: '2023-01-01', validTo: '2023-12-31', status: 'active' },
  { id: 6, routeId: 3, className: 'Втора класа', tariffId: 6, validFrom: '2023-01-01', validTo: '2023-12-31', status: 'active' },
  { id: 7, routeId: 5, className: 'Първа класа', tariffId: 4, validFrom: '2023-12-01', validTo: '2024-01-15', status: 'upcoming' },
  { id: 8, routeId: 5, className: 'Втора класа', tariffId: 4, validFrom: '2023-12-01', validTo: '2024-01-15', status: 'upcoming' },
  { id: 9, routeId: 7, className: 'Първа класа', tariffId: 1, validFrom: '2023-01-01', validTo: '2023-05-31', status: 'expired' },
  { id: 10, routeId: 7, className: 'Втора класа', tariffId: 1, validFrom: '2023-01-01', validTo: '2023-05-31', status: 'expired' },
];

const TariffAssignmentPage: React.FC = () => {
  const [selectedRouteIds, setSelectedRouteIds] = useState<number[]>([]);
  const [selectedTariffId, setSelectedTariffId] = useState<number | ''>('');
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [validFrom, setValidFrom] = useState<string>(new Date().toISOString().split('T')[0]);
  const [validTo, setValidTo] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterTariffType, setFilterTariffType] = useState('all');
  const [filterAssignmentStatus, setFilterAssignmentStatus] = useState('active');

  const handleRouteSelect = (routeId: number) => {
    setSelectedRouteIds(prev => {
      if (prev.includes(routeId)) {
        return prev.filter(id => id !== routeId);
      } else {
        return [...prev, routeId];
      }
    });
  };

  const handleClassSelect = (classId: number) => {
    setSelectedClassIds(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  const handleTariffSelect = (tariffId: number | '') => {
    setSelectedTariffId(tariffId);
  };

  const handleAssignTariff = () => {
    // Валидация
    if (selectedRouteIds.length === 0) {
      alert('Моля, изберете поне един маршрут');
      return;
    }
    if (selectedClassIds.length === 0) {
      alert('Моля, изберете поне един клас');
      return;
    }
    if (selectedTariffId === '') {
      alert('Моля, изберете тарифа');
      return;
    }
    if (!validFrom) {
      alert('Моля, въведете начална дата на валидност');
      return;
    }
    if (!validTo) {
      alert('Моля, въведете крайна дата на валидност');
      return;
    }

    // Тук бихме имали логика за запазване на назначението
    setIsSubmitting(true);
    
    // Симулираме API заявка
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);
      
      // Изчистваме формата
      setSelectedRouteIds([]);
      setSelectedClassIds([]);
      setSelectedTariffId('');
      setValidFrom(new Date().toISOString().split('T')[0]);
      setValidTo('');
    }, 1500);
  };

  // Филтриране на маршрути по търсене
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Филтриране на тарифи по тип
  const filteredTariffs = tariffs.filter(tariff => 
    filterTariffType === 'all' || tariff.type === filterTariffType
  );

  // Филтриране на назначения по статус
  const filteredAssignments = currentAssignments.filter(assignment => 
    filterAssignmentStatus === 'all' || assignment.status === filterAssignmentStatus
  );

  const getRouteName = (routeId: number) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.name : 'Непознат маршрут';
  };

  const getTariffName = (tariffId: number) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    return tariff ? tariff.name : 'Непозната тарифа';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Определяне на тарифи за превоз
      </Typography>
      
      <Typography variant="body1" paragraph>
        Назначаване на динамични и фиксирани тарифи към определени маршрути и класове. Задаване на период на валидност за назначените тарифи.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Нова тарифа за превоз
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                1. Изберете маршрут(и)
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Търсене по име на маршрут"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
              
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox" width={50} />
                      <TableCell>Маршрут</TableCell>
                      <TableCell>Разстояние</TableCell>
                      <TableCell>Тип</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRoutes.map((route) => (
                      <TableRow 
                        key={route.id}
                        selected={selectedRouteIds.includes(route.id)}
                        onClick={() => handleRouteSelect(route.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          {selectedRouteIds.includes(route.id) ? 
                            <CheckCircleIcon color="primary" fontSize="small" /> : 
                            null
                          }
                        </TableCell>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.distance} км</TableCell>
                        <TableCell>{route.type}</TableCell>
                      </TableRow>
                    ))}
                    {filteredRoutes.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Няма намерени маршрути
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Избрани маршрути: {selectedRouteIds.length}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                2. Изберете класове
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox" width={50} />
                      <TableCell>Клас</TableCell>
                      <TableCell>Множител</TableCell>
                      <TableCell>Описание</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {travelClasses.map((tClass) => (
                      <TableRow 
                        key={tClass.id}
                        selected={selectedClassIds.includes(tClass.id)}
                        onClick={() => handleClassSelect(tClass.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          {selectedClassIds.includes(tClass.id) ? 
                            <CheckCircleIcon color="primary" fontSize="small" /> : 
                            null
                          }
                        </TableCell>
                        <TableCell>{tClass.name}</TableCell>
                        <TableCell>x{tClass.multiplier}</TableCell>
                        <TableCell>{tClass.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                3. Изберете тарифа
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <RadioGroup 
                  row 
                  value={filterTariffType} 
                  onChange={(e) => setFilterTariffType(e.target.value)}
                >
                  <FormControlLabel value="all" control={<Radio />} label="Всички" />
                  <FormControlLabel value="fixed" control={<Radio />} label="Фиксирани" />
                  <FormControlLabel value="dynamic" control={<Radio />} label="Динамични" />
                </RadioGroup>
              </Box>
              
              <FormControl fullWidth>
                <InputLabel>Тарифа</InputLabel>
                <Select
                  value={selectedTariffId}
                  onChange={(e) => handleTariffSelect(e.target.value as number)}
                  label="Тарифа"
                >
                  <MenuItem value="">-- Изберете тарифа --</MenuItem>
                  {filteredTariffs.map((tariff) => (
                    <MenuItem key={tariff.id} value={tariff.id}>
                      {tariff.name} - {tariff.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                4. Период на валидност
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Валидна от"
                    type="date"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Валидна до"
                    type="date"
                    value={validTo}
                    onChange={(e) => setValidTo(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                onClick={handleAssignTariff}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Запазване...' : 'Назначи тарифа'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Текущи тарифни назначения
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={filterAssignmentStatus}
              onChange={(e) => setFilterAssignmentStatus(e.target.value)}
              label="Статус"
            >
              <MenuItem value="all">Всички</MenuItem>
              <MenuItem value="active">Активни</MenuItem>
              <MenuItem value="upcoming">Предстоящи</MenuItem>
              <MenuItem value="expired">Изтекли</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Маршрут</TableCell>
                <TableCell>Клас</TableCell>
                <TableCell>Тарифа</TableCell>
                <TableCell>Валидност</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{getRouteName(assignment.routeId)}</TableCell>
                  <TableCell>{assignment.className}</TableCell>
                  <TableCell>{getTariffName(assignment.tariffId)}</TableCell>
                  <TableCell>
                    {new Date(assignment.validFrom).toLocaleDateString()} - {new Date(assignment.validTo).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {assignment.status === 'active' && (
                      <Chip label="Активна" color="success" size="small" />
                    )}
                    {assignment.status === 'upcoming' && (
                      <Chip label="Предстояща" color="info" size="small" />
                    )}
                    {assignment.status === 'expired' && (
                      <Chip label="Изтекла" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      Няма намерени тарифни назначения
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={5000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessMessage(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Тарифата е успешно назначена към избраните маршрути и класове!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TariffAssignmentPage; 