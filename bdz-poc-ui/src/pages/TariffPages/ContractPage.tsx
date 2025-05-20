import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// Примерни данни за базови тарифи по договора
const baseTariffs = [
  {
    id: 1,
    category: 'Пътнически влак (ПВ)',
    baseRate: 0.085,
    discountCategories: [
      { name: 'Деца до 7 години', rate: 0.000, discount: '100%' },
      { name: 'Деца от 7 до 10 години', rate: 0.043, discount: '50%' },
      { name: 'Учащи се (до 26 години)', rate: 0.043, discount: '50%' },
      { name: 'Пенсионери', rate: 0.060, discount: '30%' },
      { name: 'Многодетни майки', rate: 0.043, discount: '50%' }
    ],
    description: 'Тарифа за превоз на пътници и ръчен багаж в пътнически влакове',
    effectiveFrom: '01.01.2022'
  },
  {
    id: 2,
    category: 'Бърз влак (БВ)',
    baseRate: 0.096,
    discountCategories: [
      { name: 'Деца до 7 години', rate: 0.000, discount: '100%' },
      { name: 'Деца от 7 до 10 години', rate: 0.048, discount: '50%' },
      { name: 'Учащи се (до 26 години)', rate: 0.048, discount: '50%' },
      { name: 'Пенсионери', rate: 0.067, discount: '30%' },
      { name: 'Многодетни майки', rate: 0.048, discount: '50%' }
    ],
    description: 'Тарифа за превоз на пътници и ръчен багаж в бързи влакове',
    effectiveFrom: '01.01.2022'
  },
  {
    id: 3,
    category: 'Бърз влак със задължителна резервация (БВ-Р)',
    baseRate: 0.108,
    discountCategories: [
      { name: 'Деца до 7 години', rate: 0.000, discount: '100%' },
      { name: 'Деца от 7 до 10 години', rate: 0.054, discount: '50%' },
      { name: 'Учащи се (до 26 години)', rate: 0.054, discount: '50%' },
      { name: 'Пенсионери', rate: 0.076, discount: '30%' },
      { name: 'Многодетни майки', rate: 0.054, discount: '50%' }
    ],
    description: 'Тарифа за превоз на пътници и ръчен багаж в бързи влакове със задължителна резервация',
    effectiveFrom: '01.01.2022'
  },
  {
    id: 4,
    category: 'Международен влак (МВ)',
    baseRate: 0.119,
    discountCategories: [
      { name: 'Деца до 7 години', rate: 0.000, discount: '100%' },
      { name: 'Деца от 7 до 10 години', rate: 0.060, discount: '50%' },
      { name: 'Учащи се (до 26 години)', rate: 0.060, discount: '50%' },
      { name: 'Пенсионери', rate: 0.083, discount: '30%' },
      { name: 'Многодетни майки', rate: 0.060, discount: '50%' }
    ],
    description: 'Тарифа за превоз на пътници и ръчен багаж в международни влакове',
    effectiveFrom: '01.01.2022'
  }
];

// Структура за нова тарифа
interface DiscountCategory {
  name: string;
  rate: number;
  discount: string;
}

interface Tariff {
  id: number;
  category: string;
  baseRate: number;
  discountCategories: DiscountCategory[];
  description: string;
  effectiveFrom: string;
}

const ContractPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Състояния за модални прозорци
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<Tariff | null>(null);
  
  // Състояния за формата
  const [formValues, setFormValues] = useState<{
    category: string;
    baseRate: string;
    description: string;
    effectiveFrom: string;
    discountCategories: DiscountCategory[];
  }>({
    category: '',
    baseRate: '',
    description: '',
    effectiveFrom: '',
    discountCategories: []
  });
  
  // Състояние за грешки във формата
  const [formErrors, setFormErrors] = useState<{
    category?: string;
    baseRate?: string;
    description?: string;
    effectiveFrom?: string;
  }>({});

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Логика за модалните прозорци
  const handleOpenAddDialog = () => {
    setFormValues({
      category: '',
      baseRate: '',
      description: '',
      effectiveFrom: new Date().toISOString().split('T')[0],
      discountCategories: [
        { name: 'Деца до 7 години', rate: 0, discount: '100%' },
        { name: 'Деца от 7 до 10 години', rate: 0, discount: '50%' },
        { name: 'Учащи се (до 26 години)', rate: 0, discount: '50%' },
        { name: 'Пенсионери', rate: 0, discount: '30%' },
        { name: 'Многодетни майки', rate: 0, discount: '50%' }
      ]
    });
    setFormErrors({});
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (tariff: Tariff) => {
    setCurrentTariff(tariff);
    setFormValues({
      category: tariff.category,
      baseRate: tariff.baseRate.toString(),
      description: tariff.description,
      effectiveFrom: tariff.effectiveFrom,
      discountCategories: [...tariff.discountCategories]
    });
    setFormErrors({});
    setOpenEditDialog(true);
  };

  const handleOpenDetailsDialog = (tariff: Tariff) => {
    setCurrentTariff(tariff);
    setOpenDetailsDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDetailsDialog(false);
    setCurrentTariff(null);
  };

  // Обработка на промените във формата
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Премахване на грешката при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      category: event.target.value
    });
    
    if (formErrors.category) {
      setFormErrors({
        ...formErrors,
        category: undefined
      });
    }
  };

  const handleDiscountRateChange = (index: number, value: string) => {
    const newDiscountCategories = [...formValues.discountCategories];
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      newDiscountCategories[index].rate = numValue;
      setFormValues({
        ...formValues,
        discountCategories: newDiscountCategories
      });
    }
  };

  // Валидация на формата
  const validateForm = (): boolean => {
    const errors: {
      category?: string;
      baseRate?: string;
      description?: string;
      effectiveFrom?: string;
    } = {};
    
    if (!formValues.category) {
      errors.category = 'Моля, въведете категория';
    }
    
    if (!formValues.baseRate) {
      errors.baseRate = 'Моля, въведете базова тарифа';
    } else if (isNaN(parseFloat(formValues.baseRate)) || parseFloat(formValues.baseRate) <= 0) {
      errors.baseRate = 'Моля, въведете валидна положителна стойност';
    }
    
    if (!formValues.description) {
      errors.description = 'Моля, въведете описание';
    }
    
    if (!formValues.effectiveFrom) {
      errors.effectiveFrom = 'Моля, въведете дата';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Запазване на новата тарифа
  const handleSaveTariff = () => {
    if (validateForm()) {
      if (openAddDialog) {
        // Логика за добавяне на нова тарифа
        const newTariff: Tariff = {
          id: Math.max(0, ...baseTariffs.map(t => t.id)) + 1,
          category: formValues.category,
          baseRate: parseFloat(formValues.baseRate),
          description: formValues.description,
          effectiveFrom: formValues.effectiveFrom,
          discountCategories: formValues.discountCategories
        };
        
        // Тук бихте направили API заявка за записване на данните
        // За демонстрация просто актуализираме локалните данни
        baseTariffs.push(newTariff);
        alert('Успешно добавихте нова тарифа!');
      } else if (openEditDialog && currentTariff) {
        // Логика за редактиране на съществуваща тарифа
        const updatedTariff: Tariff = {
          ...currentTariff,
          category: formValues.category,
          baseRate: parseFloat(formValues.baseRate),
          description: formValues.description,
          effectiveFrom: formValues.effectiveFrom,
          discountCategories: formValues.discountCategories
        };
        
        // Тук бихте направили API заявка за обновяване на данните
        // За демонстрация просто актуализираме локалните данни
        const tariffIndex = baseTariffs.findIndex(t => t.id === currentTariff.id);
        if (tariffIndex !== -1) {
          baseTariffs[tariffIndex] = updatedTariff;
        }
        alert('Успешно редактирахте тарифата!');
      }
      
      handleCloseDialogs();
    }
  };

  // Филтриране на данните според търсенето
  const filteredBaseTariffs = baseTariffs.filter(tariff => 
    tariff.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tariff.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    // Сортиране по дата в низходящ ред (най-новите първи)
    const dateA = new Date(a.effectiveFrom);
    const dateB = new Date(b.effectiveFrom);
    return dateB.getTime() - dateA.getTime();
  });

  // Изчисляване на тарифите с отстъпки въз основа на базовата тарифа
  const calculateDiscountRates = (baseRate: string): DiscountCategory[] => {
    const base = parseFloat(baseRate);
    if (isNaN(base)) return formValues.discountCategories;

    return formValues.discountCategories.map(category => {
      let rate = 0;
      
      if (category.discount === '100%') {
        rate = 0;
      } else if (category.discount === '50%') {
        rate = base * 0.5;
      } else if (category.discount === '30%') {
        rate = base * 0.7;
      } else {
        rate = base;
      }
      
      return {
        ...category,
        rate
      };
    });
  };

  // Обработка на промяната в базовата тарифа
  const handleBaseRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const baseRate = event.target.value;
    
    setFormValues({
      ...formValues,
      baseRate,
      discountCategories: calculateDiscountRates(baseRate)
    });
    
    if (formErrors.baseRate) {
      setFormErrors({
        ...formErrors,
        baseRate: undefined
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Тарифи по Договор с държавата
      </Typography>
      
      <Typography variant="body1" paragraph>
        Тарифи, разработени въз основа на изискванията по Договора с държавата за осъществяване на обществената услуга – превоз на пътници с железопътен транспорт на територията на Република България.
      </Typography>
      
      {searchQuery && (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Търсене..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
        </Box>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Базови тарифи
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Добави нова тарифа
            </Button>
            
            {!searchQuery && (
              <TextField
                variant="outlined"
                placeholder="Търсене по категория или описание"
                value={searchQuery}
                onChange={handleSearchChange}
                size="small"
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
              />
            )}
          </Box>
        </Box>
        
        {filteredBaseTariffs.map((tariff) => (
          <Paper key={tariff.id} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {tariff.category}
              </Typography>
              <Box>
                <Chip 
                  label={`Базова тарифа: ${tariff.baseRate.toFixed(3)} лв./км`} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mr: 2 }}
                />
                <IconButton 
                  color="primary" 
                  onClick={() => handleOpenEditDialog(tariff)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {tariff.description}
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Категории пътници и отстъпки:
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Категория пътници</TableCell>
                    <TableCell align="right">Тарифа (лв./км)</TableCell>
                    <TableCell align="right">Отстъпка</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Редовна тарифа</strong></TableCell>
                    <TableCell align="right">{tariff.baseRate.toFixed(3)}</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  {tariff.discountCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell align="right">{category.rate.toFixed(3)}</TableCell>
                      <TableCell align="right">{category.discount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                В сила от: {tariff.effectiveFrom}
              </Typography>
              
              <Button 
                variant="text" 
                color="primary"
                startIcon={<VisibilityIcon />}
                size="small"
                onClick={() => handleOpenDetailsDialog(tariff)}
              >
                Пълна информация
              </Button>
            </Box>
          </Paper>
        ))}
        
        {filteredBaseTariffs.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Няма намерени тарифи, отговарящи на критериите за търсене.
            </Typography>
          </Paper>
        )}
      </Box>
      
      {/* Модален прозорец за добавяне на нова тарифа */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Добавяне на нова тарифа</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialogs} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formErrors.category} sx={{ mb: 3 }}>
                <InputLabel id="category-label">Категория</InputLabel>
                <Select
                  labelId="category-label"
                  value={formValues.category}
                  onChange={handleCategoryChange}
                  label="Категория"
                  name="category"
                >
                  <MenuItem value="Пътнически влак (ПВ)">Пътнически влак (ПВ)</MenuItem>
                  <MenuItem value="Бърз влак (БВ)">Бърз влак (БВ)</MenuItem>
                  <MenuItem value="Бърз влак със задължителна резервация (БВ-Р)">Бърз влак със задължителна резервация (БВ-Р)</MenuItem>
                  <MenuItem value="Международен влак (МВ)">Международен влак (МВ)</MenuItem>
                </Select>
                {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
              </FormControl>
              
              <TextField
                label="Базова тарифа (лв./км)"
                fullWidth
                name="baseRate"
                value={formValues.baseRate}
                onChange={handleBaseRateChange}
                type="number"
                inputProps={{ step: "0.001", min: "0" }}
                error={!!formErrors.baseRate}
                helperText={formErrors.baseRate}
                sx={{ mb: 3 }}
              />
              
              <TextField
                label="Дата на влизане в сила"
                fullWidth
                name="effectiveFrom"
                value={formValues.effectiveFrom}
                onChange={handleFormChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!formErrors.effectiveFrom}
                helperText={formErrors.effectiveFrom}
                sx={{ mb: 3 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Описание"
                fullWidth
                name="description"
                value={formValues.description}
                onChange={handleFormChange}
                multiline
                rows={4}
                error={!!formErrors.description}
                helperText={formErrors.description}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle1" gutterBottom>
                Категории пътници и отстъпки:
              </Typography>
              
              <List>
                {formValues.discountCategories.map((category, index) => (
                  <ListItem key={index} divider={index < formValues.discountCategories.length - 1}>
                    <ListItemText 
                      primary={category.name} 
                      secondary={`Отстъпка: ${category.discount}`} 
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        label="Тарифа"
                        value={category.rate.toFixed(3)}
                        onChange={(e) => handleDiscountRateChange(index, e.target.value)}
                        type="number"
                        inputProps={{ step: "0.001", min: "0" }}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<CloseIcon />} 
            onClick={handleCloseDialogs}
          >
            Отказ
          </Button>
          <Button 
            startIcon={<SaveIcon />} 
            onClick={handleSaveTariff} 
            variant="contained" 
            color="primary"
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Модален прозорец за редакция на съществуваща тарифа */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Редактиране на тарифа</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialogs} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formErrors.category} sx={{ mb: 3 }}>
                <InputLabel id="edit-category-label">Категория</InputLabel>
                <Select
                  labelId="edit-category-label"
                  value={formValues.category}
                  onChange={handleCategoryChange}
                  label="Категория"
                  name="category"
                >
                  <MenuItem value="Пътнически влак (ПВ)">Пътнически влак (ПВ)</MenuItem>
                  <MenuItem value="Бърз влак (БВ)">Бърз влак (БВ)</MenuItem>
                  <MenuItem value="Бърз влак със задължителна резервация (БВ-Р)">Бърз влак със задължителна резервация (БВ-Р)</MenuItem>
                  <MenuItem value="Международен влак (МВ)">Международен влак (МВ)</MenuItem>
                </Select>
                {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
              </FormControl>
              
              <TextField
                label="Базова тарифа (лв./км)"
                fullWidth
                name="baseRate"
                value={formValues.baseRate}
                onChange={handleBaseRateChange}
                type="number"
                inputProps={{ step: "0.001", min: "0" }}
                error={!!formErrors.baseRate}
                helperText={formErrors.baseRate}
                sx={{ mb: 3 }}
              />
              
              <TextField
                label="Дата на влизане в сила"
                fullWidth
                name="effectiveFrom"
                value={formValues.effectiveFrom}
                onChange={handleFormChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!formErrors.effectiveFrom}
                helperText={formErrors.effectiveFrom}
                sx={{ mb: 3 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Описание"
                fullWidth
                name="description"
                value={formValues.description}
                onChange={handleFormChange}
                multiline
                rows={4}
                error={!!formErrors.description}
                helperText={formErrors.description}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle1" gutterBottom>
                Категории пътници и отстъпки:
              </Typography>
              
              <List>
                {formValues.discountCategories.map((category, index) => (
                  <ListItem key={index} divider={index < formValues.discountCategories.length - 1}>
                    <ListItemText 
                      primary={category.name} 
                      secondary={`Отстъпка: ${category.discount}`} 
                    />
                    <ListItemSecondaryAction>
                      <TextField
                        label="Тарифа"
                        value={category.rate.toFixed(3)}
                        onChange={(e) => handleDiscountRateChange(index, e.target.value)}
                        type="number"
                        inputProps={{ step: "0.001", min: "0" }}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<CloseIcon />} 
            onClick={handleCloseDialogs}
          >
            Отказ
          </Button>
          <Button 
            startIcon={<SaveIcon />} 
            onClick={handleSaveTariff} 
            variant="contained" 
            color="primary"
          >
            Запази промените
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Модален прозорец за пълна информация за тарифа */}
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="md"
      >
        {currentTariff && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Пълна информация: {currentTariff.category}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleCloseDialogs} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AttachMoneyIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Основна информация
                          </Typography>
                          <Typography variant="body2">
                            <strong>Базова тарифа:</strong> {currentTariff.baseRate.toFixed(3)} лв./км
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" paragraph>
                        {currentTariff.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Пълна таблица с тарифи по категории пътници
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Категория пътници</TableCell>
                          <TableCell align="right">Тарифа (лв./км)</TableCell>
                          <TableCell align="right">Отстъпка</TableCell>
                          <TableCell align="right">Цена за 100 км</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography fontWeight="bold">Редовна тарифа</Typography>
                          </TableCell>
                          <TableCell align="right">{currentTariff.baseRate.toFixed(3)}</TableCell>
                          <TableCell align="right">-</TableCell>
                          <TableCell align="right">{(currentTariff.baseRate * 100).toFixed(2)} лв.</TableCell>
                        </TableRow>
                        {currentTariff.discountCategories.map((category, index) => (
                          <TableRow key={index}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell align="right">{category.rate.toFixed(3)}</TableCell>
                            <TableCell align="right">{category.discount}</TableCell>
                            <TableCell align="right">{(category.rate * 100).toFixed(2)} лв.</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <InfoIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                        <Typography variant="h6">Допълнителна информация</Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        Тази тарифа е част от Договора за обществена услуга с държавата и подлежи на компенсиране по реда, предвиден в договора.
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Тарифата се прилага за всички превози, извършвани с влакове от категория {currentTariff.category.split('(')[0].trim()}.
                      </Typography>
                      <Typography variant="body2">
                        За отстъпките се изисква представяне на съответните документи, удостоверяващи правото на ползване.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogs}>
                Затвори
              </Button>
              <Button 
                startIcon={<EditIcon />} 
                onClick={() => {
                  handleCloseDialogs();
                  handleOpenEditDialog(currentTariff);
                }}
                color="primary"
              >
                Редактирай
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ContractPage; 