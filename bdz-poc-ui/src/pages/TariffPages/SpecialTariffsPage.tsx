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
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControlLabel,
  Switch
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { bg } from 'date-fns/locale';
import RestoreIcon from '@mui/icons-material/Restore';

// Примерни данни за влакове със специални тарифи
const mockTrains = [
  {
    id: 1,
    trainNumber: "БВ 2601",
    route: "София - Варна",
    tariffType: "Промоционална",
    validFrom: "01.06.2023",
    validTo: "31.08.2023",
    discountPercent: 20,
    status: "активна"
  },
  {
    id: 2,
    trainNumber: "БВ 2602",
    route: "Варна - София",
    tariffType: "Промоционална",
    validFrom: "01.06.2023",
    validTo: "31.08.2023",
    discountPercent: 20,
    status: "активна"
  },
  {
    id: 3,
    trainNumber: "БВ 3621",
    route: "София - Бургас",
    tariffType: "Търговска",
    validFrom: "01.07.2023",
    validTo: "31.07.2023",
    discountPercent: 15,
    status: "активна"
  },
  {
    id: 4,
    trainNumber: "БВ 3622",
    route: "Бургас - София",
    tariffType: "Търговска",
    validFrom: "01.07.2023",
    validTo: "31.07.2023",
    discountPercent: 15,
    status: "активна"
  },
  {
    id: 5,
    trainNumber: "БВ 2649",
    route: "София - Варна (през Горна Оряховица)",
    tariffType: "Фиксирана",
    validFrom: "01.01.2023",
    validTo: "31.12.2023",
    discountPercent: -10, // отрицателни проценти представляват надценка
    status: "активна"
  },
  {
    id: 6,
    trainNumber: "БВ 2650",
    route: "Варна - София (през Горна Оряховица)",
    tariffType: "Фиксирана",
    validFrom: "01.01.2023",
    validTo: "31.12.2023",
    discountPercent: -10,
    status: "активна"
  },
  {
    id: 7,
    trainNumber: "БВ 8601",
    route: "София - Пловдив",
    tariffType: "Събитийна",
    validFrom: "10.05.2023",
    validTo: "20.05.2023",
    discountPercent: 25,
    status: "неактивна"
  },
  {
    id: 8,
    trainNumber: "БВ 8602",
    route: "Пловдив - София",
    tariffType: "Събитийна",
    validFrom: "10.05.2023",
    validTo: "20.05.2023",
    discountPercent: 25,
    status: "неактивна"
  },
  {
    id: 9,
    trainNumber: "КПВ 50115",
    route: "Септември - Добринище",
    tariffType: "Туристическа",
    validFrom: "01.05.2023",
    validTo: "30.09.2023",
    discountPercent: -25,
    status: "активна"
  },
  {
    id: 10,
    trainNumber: "КПВ 50116",
    route: "Добринище - Септември",
    tariffType: "Туристическа",
    validFrom: "01.05.2023",
    validTo: "30.09.2023",
    discountPercent: -25,
    status: "активна"
  },
  // Добавяме нови неактивни тарифи за архива
  {
    id: 11,
    trainNumber: "БВ 3801",
    route: "София - Русе",
    tariffType: "Промоционална",
    validFrom: "01.03.2023",
    validTo: "30.04.2023",
    discountPercent: 30,
    status: "неактивна"
  },
  {
    id: 12,
    trainNumber: "БВ 3802",
    route: "Русе - София",
    tariffType: "Промоционална",
    validFrom: "01.03.2023",
    validTo: "30.04.2023",
    discountPercent: 30,
    status: "неактивна"
  },
  {
    id: 13,
    trainNumber: "БВ 4611",
    route: "София - Благоевград",
    tariffType: "Търговска",
    validFrom: "15.02.2023",
    validTo: "15.03.2023",
    discountPercent: 20,
    status: "неактивна"
  },
  {
    id: 14,
    trainNumber: "БВ 4612",
    route: "Благоевград - София",
    tariffType: "Търговска",
    validFrom: "15.02.2023",
    validTo: "15.03.2023",
    discountPercent: 20,
    status: "неактивна"
  },
  {
    id: 15,
    trainNumber: "БВ 2201",
    route: "София - Плевен",
    tariffType: "Фиксирана",
    validFrom: "01.12.2022",
    validTo: "31.01.2023",
    discountPercent: -5,
    status: "неактивна"
  },
  {
    id: 16,
    trainNumber: "БВ 2202",
    route: "Плевен - София",
    tariffType: "Фиксирана",
    validFrom: "01.12.2022",
    validTo: "31.01.2023",
    discountPercent: -5,
    status: "неактивна"
  },
  {
    id: 17,
    trainNumber: "КПВ 20101",
    route: "София - Банско (през зимния сезон)",
    tariffType: "Туристическа",
    validFrom: "15.12.2022",
    validTo: "15.03.2023",
    discountPercent: -15,
    status: "неактивна"
  },
  {
    id: 18,
    trainNumber: "КПВ 20102",
    route: "Банско - София (през зимния сезон)",
    tariffType: "Туристическа",
    validFrom: "15.12.2022",
    validTo: "15.03.2023",
    discountPercent: -15,
    status: "неактивна"
  }
];

// Типове специални тарифи
const tariffTypes = [
  "Всички",
  "Промоционална",
  "Търговска",
  "Фиксирана",
  "Събитийна",
  "Туристическа"
];

// Компонент за таб панел
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SpecialTariffsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTariffType, setSelectedTariffType] = useState('Всички');
  const [statusFilter, setStatusFilter] = useState('Всички');
  
  // Допълнителни състояния за архивния таб
  const [archiveSearchTerm, setArchiveSearchTerm] = useState('');
  const [archiveSelectedTariffType, setArchiveSelectedTariffType] = useState('Всички');
  
  // Състояния за редактиране на тарифа
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<any>(null);
  const [tariffForm, setTariffForm] = useState({
    trainNumber: '',
    route: '',
    tariffType: '',
    validFrom: '',
    validTo: '',
    discountPercent: 0,
    status: 'активна'
  });
  
  // Добавяме състояние за списъка с тарифи
  const [trains, setTrains] = useState(mockTrains);
  
  // Състояние за добавяне на нова тарифа
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTariffForm, setNewTariffForm] = useState({
    trainNumber: '',
    route: '',
    tariffType: 'Промоционална',
    validFrom: '',
    validTo: '',
    discountPercent: 0,
    status: 'активна'
  });
  
  // Състояние за изтриване на тарифа
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tariffToDelete, setTariffToDelete] = useState<any>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTariffTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffType(event.target.value as string);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
  };

  // Нови обработчици за архивния таб
  const handleArchiveSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArchiveSearchTerm(event.target.value);
  };

  const handleArchiveTariffTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArchiveSelectedTariffType(event.target.value as string);
  };

  // Филтриране на влаковете и сортиране с по-новите най-отгоре
  const filteredTrains = trains.filter(train => {
    // Първо филтрираме само активните тарифи за активния таб
    if (train.status !== 'активна') return false;
    
    // Филтър по търсене
    const searchMatch = 
      train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Филтър по тип тарифа
    const tariffMatch = selectedTariffType === 'Всички' || train.tariffType === selectedTariffType;
    
    return searchMatch && tariffMatch;
  })
  // Сортиране по ID в низходящ ред (по-големите ID, които са по-нови, ще са най-отгоре)
  .sort((a, b) => b.id - a.id);

  // Функция за възстановяване на архивирана тарифа
  const handleRestoreTariff = (tariffId: number) => {
    // Намираме тарифата в списъка
    const updatedTrains = [...trains];
    const tariffIndex = updatedTrains.findIndex(t => t.id === tariffId);
    
    if (tariffIndex !== -1) {
      // Променяме статуса на активна
      updatedTrains[tariffIndex] = {
        ...updatedTrains[tariffIndex],
        status: 'активна'
      };
      
      // Обновяваме списъка
      setTrains(updatedTrains);
      
      // В реален случай тук би се направил API заявка
      
      // Съобщение за успешно възстановяване
      alert('Тарифата е успешно възстановена и е активна!');
    }
  };

  // Филтриране на архивираните влакове
  const archivedTrains = trains.filter(train => {
    // Първо филтрираме само неактивните тарифи
    if (train.status !== 'неактивна') return false;
    
    // Филтър по търсене
    const searchMatch = 
      train.trainNumber.toLowerCase().includes(archiveSearchTerm.toLowerCase()) ||
      train.route.toLowerCase().includes(archiveSearchTerm.toLowerCase());
    
    // Филтър по тип тарифа
    const tariffMatch = archiveSelectedTariffType === 'Всички' || train.tariffType === archiveSelectedTariffType;
    
    return searchMatch && tariffMatch;
  })
  // Сортиране по ID в низходящ ред
  .sort((a, b) => b.id - a.id);

  // Помощна функция за показване на отстъпката/надценката
  const renderDiscountPercent = (percent: number) => {
    if (percent > 0) {
      return <Chip label={`${percent}% отстъпка`} color="success" size="small" />;
    } else if (percent < 0) {
      return <Chip label={`${Math.abs(percent)}% надценка`} color="error" size="small" />;
    } else {
      return <Chip label="Без промяна" color="default" size="small" />;
    }
  };

  // Помощна функция за показване на статуса
  const renderStatus = (status: string) => {
    if (status === 'активна') {
      return <Chip label="Активна" color="success" size="small" />;
    } else {
      return <Chip label="Неактивна" color="default" size="small" />;
    }
  };

  // Обработчик за отваряне на диалога за редакция
  const handleOpenEditDialog = (train: any) => {
    setCurrentTariff(train);
    setTariffForm({
      trainNumber: train.trainNumber,
      route: train.route,
      tariffType: train.tariffType,
      validFrom: train.validFrom,
      validTo: train.validTo,
      discountPercent: train.discountPercent,
      status: train.status
    });
    setEditDialogOpen(true);
  };
  
  // Обработчик за затваряне на диалога за редакция
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  
  // Обработчик за промяна на формата
  const handleTariffFormChange = (field: string, value: any) => {
    setTariffForm({
      ...tariffForm,
      [field]: value
    });
  };
  
  // Обработчик за запазване на редактираната тарифа
  const handleSaveTariff = () => {
    // Тук би се имплементирала логика за запазване на промените в API
    // За целите на демонстрацията ще обновим списъка с тарифи
    
    // Намираме индекса на текущата тарифа
    const trainIndex = trains.findIndex(t => t.id === currentTariff.id);
    
    if (trainIndex !== -1) {
      // Създаваме нов масив с обновена тарифа
      const updatedTrains = [...trains];
      updatedTrains[trainIndex] = {
        ...updatedTrains[trainIndex],
        trainNumber: tariffForm.trainNumber,
        route: tariffForm.route,
        tariffType: tariffForm.tariffType,
        validFrom: tariffForm.validFrom,
        validTo: tariffForm.validTo,
        discountPercent: Number(tariffForm.discountPercent),
        status: tariffForm.status
      };
      
      // Обновяваме състоянието на компонента с новите данни
      setTrains(updatedTrains);
      
      // В реален случай тук би се направил API заявка
      
      // Съобщение за успешно обновяване
      alert('Тарифата е успешно обновена!');
    }
    
    setEditDialogOpen(false);
  };

  // Обработчик за отваряне на диалога за добавяне
  const handleOpenAddDialog = () => {
    // Ресетваме формата за нова тарифа
    setNewTariffForm({
      trainNumber: '',
      route: '',
      tariffType: 'Промоционална',
      validFrom: '',
      validTo: '',
      discountPercent: 0,
      status: 'активна'
    });
    setAddDialogOpen(true);
  };
  
  // Обработчик за затваряне на диалога за добавяне
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };
  
  // Обработчик за промяна на формата за нова тарифа
  const handleNewTariffFormChange = (field: string, value: any) => {
    setNewTariffForm({
      ...newTariffForm,
      [field]: value
    });
  };
  
  // Обработчик за запазване на новата тарифа
  const handleSaveNewTariff = () => {
    // Валидация на формата
    if (!newTariffForm.trainNumber || !newTariffForm.route || !newTariffForm.tariffType || 
        !newTariffForm.validFrom || !newTariffForm.validTo) {
      alert('Моля, попълнете всички задължителни полета!');
      return;
    }
    
    // Създаваме нова тарифа със следващо ID
    const maxId = Math.max(...trains.map(t => t.id));
    const newTariff = {
      id: maxId + 1,
      trainNumber: newTariffForm.trainNumber,
      route: newTariffForm.route,
      tariffType: newTariffForm.tariffType,
      validFrom: newTariffForm.validFrom,
      validTo: newTariffForm.validTo,
      discountPercent: Number(newTariffForm.discountPercent),
      status: newTariffForm.status
    };
    
    // Добавяме новата тарифа в началото на списъка
    setTrains([newTariff, ...trains]);
    
    // В реален случай тук би се направил API заявка
    
    // Съобщение за успешно добавяне
    alert('Тарифата е успешно добавена!');
    
    // Затваряме диалога
    setAddDialogOpen(false);
  };

  // Обработчик за отваряне на диалога за изтриване
  const handleOpenDeleteDialog = (train: any) => {
    setTariffToDelete(train);
    setDeleteDialogOpen(true);
  };
  
  // Обработчик за затваряне на диалога за изтриване
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTariffToDelete(null);
  };
  
  // Обработчик за потвърждаване на изтриването
  const handleDeleteTariff = () => {
    if (tariffToDelete) {
      // Филтрираме масива, за да премахнем избраната тарифа
      const updatedTrains = trains.filter(train => train.id !== tariffToDelete.id);
      
      // Обновяваме списъка с тарифи
      setTrains(updatedTrains);
      
      // В реален случай тук би се направил API заявка
      
      // Съобщение за успешно изтриване
      alert('Тарифата е успешно изтрита!');
      
      // Затваряме диалога
      handleCloseDeleteDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Специални Тарифи и Изключения
      </Typography>
      
      <Typography variant="body1" paragraph>
        Управление на специални тарифи и изключения за определени влакове и релации. Тук са включени тарифи извън обхвата на договора с държавата.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="special tariffs tabs">
          <Tab label="Активни тарифи" id="tab-0" />
          <Tab label="Архив" id="tab-1" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <TextField
              placeholder="Търсене по номер на влак или маршрут"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: '50%' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Тип тарифа</InputLabel>
                <Select
                  value={selectedTariffType}
                  onChange={handleTariffTypeChange as any}
                  label="Тип тарифа"
                >
                  {tariffTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange as any}
                  label="Статус"
                >
                  <MenuItem value="Всички">Всички</MenuItem>
                  <MenuItem value="активна">Активни</MenuItem>
                  <MenuItem value="неактивна">Неактивни</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
              >
                Добави тарифа
              </Button>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Номер на влака</TableCell>
                  <TableCell>Маршрут (от-до)</TableCell>
                  <TableCell>Вид тарифа</TableCell>
                  <TableCell>Валидност</TableCell>
                  <TableCell>Отстъпка/Надценка</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right" width="120px">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTrains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell>{train.trainNumber}</TableCell>
                    <TableCell>{train.route}</TableCell>
                    <TableCell>
                      <Chip 
                        label={train.tariffType} 
                        size="small" 
                        color={
                          train.tariffType === 'Промоционална' ? 'primary' :
                          train.tariffType === 'Търговска' ? 'secondary' :
                          train.tariffType === 'Туристическа' ? 'info' :
                          'default'
                        } 
                      />
                    </TableCell>
                    <TableCell>{train.validFrom} - {train.validTo}</TableCell>
                    <TableCell>{renderDiscountPercent(train.discountPercent)}</TableCell>
                    <TableCell>{renderStatus(train.status)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenEditDialog(train)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleOpenDeleteDialog(train)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTrains.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        Не са намерени влакове със специални тарифи, отговарящи на критериите за търсене.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <TextField
              placeholder="Търсене по номер на влак или маршрут"
              variant="outlined"
              size="small"
              value={archiveSearchTerm}
              onChange={handleArchiveSearchChange}
              sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: '50%' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Тип тарифа</InputLabel>
                <Select
                  value={archiveSelectedTariffType}
                  onChange={handleArchiveTariffTypeChange as any}
                  label="Тип тарифа"
                >
                  {tariffTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Архив на специални тарифи
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Тук се съхраняват изтеклите и неактивни специални тарифи, които могат да бъдат възстановени при необходимост.
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Номер на влака</TableCell>
                  <TableCell>Маршрут (от-до)</TableCell>
                  <TableCell>Вид тарифа</TableCell>
                  <TableCell>Валидност</TableCell>
                  <TableCell>Отстъпка/Надценка</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {archivedTrains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell>{train.trainNumber}</TableCell>
                    <TableCell>{train.route}</TableCell>
                    <TableCell>
                      <Chip 
                        label={train.tariffType} 
                        size="small" 
                        color={
                          train.tariffType === 'Промоционална' ? 'primary' :
                          train.tariffType === 'Търговска' ? 'secondary' :
                          train.tariffType === 'Туристическа' ? 'info' :
                          'default'
                        } 
                      />
                    </TableCell>
                    <TableCell>{train.validFrom} - {train.validTo}</TableCell>
                    <TableCell>{renderDiscountPercent(train.discountPercent)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => handleRestoreTariff(train.id)}
                          startIcon={<RestoreIcon />}
                        >
                          Възстанови
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {archivedTrains.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        Не са намерени архивирани тарифи, отговарящи на критериите за търсене.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      {/* Диалог за редактиране на тарифа */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Редактиране на специална тарифа
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Номер на влака"
                value={tariffForm.trainNumber}
                onChange={(e) => handleTariffFormChange('trainNumber', e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Тип тарифа</InputLabel>
                <Select
                  value={tariffForm.tariffType}
                  label="Тип тарифа"
                  onChange={(e) => handleTariffFormChange('tariffType', e.target.value)}
                >
                  {tariffTypes.filter(t => t !== 'Всички').map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Маршрут"
                value={tariffForm.route}
                onChange={(e) => handleTariffFormChange('route', e.target.value)}
                placeholder="Пример: София - Варна"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Валидна от"
                  value={tariffForm.validFrom ? new Date(tariffForm.validFrom.split('.').reverse().join('-')) : null}
                  onChange={(date) => {
                    // Форматираме датата в "DD.MM.YYYY" формат
                    const formattedDate = date ? 
                      `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}` : 
                      '';
                    handleTariffFormChange('validFrom', formattedDate);
                  }}
                  slotProps={{
                    textField: { fullWidth: true, required: true }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Валидна до"
                  value={tariffForm.validTo ? new Date(tariffForm.validTo.split('.').reverse().join('-')) : null}
                  onChange={(date) => {
                    // Форматираме датата в "DD.MM.YYYY" формат
                    const formattedDate = date ? 
                      `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}` : 
                      '';
                    handleTariffFormChange('validTo', formattedDate);
                  }}
                  slotProps={{
                    textField: { fullWidth: true, required: true }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Процент отстъпка/надценка"
                type="number"
                value={tariffForm.discountPercent}
                onChange={(e) => handleTariffFormChange('discountPercent', e.target.value)}
                helperText="Положителни стойности за отстъпка, отрицателни за надценка"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={tariffForm.status === 'активна'}
                    onChange={(e) => handleTariffFormChange('status', e.target.checked ? 'активна' : 'неактивна')}
                  />
                }
                label="Активна тарифа"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Отказ</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveTariff}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за добавяне на нова тарифа */}
      <Dialog 
        open={addDialogOpen} 
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Добавяне на нова специална тарифа
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Номер на влака"
                value={newTariffForm.trainNumber}
                onChange={(e) => handleNewTariffFormChange('trainNumber', e.target.value)}
                placeholder="Пример: БВ 3621"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Тип тарифа</InputLabel>
                <Select
                  value={newTariffForm.tariffType}
                  label="Тип тарифа"
                  onChange={(e) => handleNewTariffFormChange('tariffType', e.target.value)}
                >
                  {tariffTypes.filter(t => t !== 'Всички').map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Маршрут"
                value={newTariffForm.route}
                onChange={(e) => handleNewTariffFormChange('route', e.target.value)}
                placeholder="Пример: София - Варна"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Валидна от"
                  value={newTariffForm.validFrom ? new Date(newTariffForm.validFrom.split('.').reverse().join('-')) : null}
                  onChange={(date) => {
                    // Форматираме датата в "DD.MM.YYYY" формат
                    const formattedDate = date ? 
                      `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}` : 
                      '';
                    handleNewTariffFormChange('validFrom', formattedDate);
                  }}
                  slotProps={{
                    textField: { fullWidth: true, required: true }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Валидна до"
                  value={newTariffForm.validTo ? new Date(newTariffForm.validTo.split('.').reverse().join('-')) : null}
                  onChange={(date) => {
                    // Форматираме датата в "DD.MM.YYYY" формат
                    const formattedDate = date ? 
                      `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}` : 
                      '';
                    handleNewTariffFormChange('validTo', formattedDate);
                  }}
                  slotProps={{
                    textField: { fullWidth: true, required: true }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Процент отстъпка/надценка"
                type="number"
                value={newTariffForm.discountPercent}
                onChange={(e) => handleNewTariffFormChange('discountPercent', e.target.value)}
                helperText="Положителни стойности за отстъпка, отрицателни за надценка"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newTariffForm.status === 'активна'}
                    onChange={(e) => handleNewTariffFormChange('status', e.target.checked ? 'активна' : 'неактивна')}
                  />
                }
                label="Активна тарифа"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                * Задължителни полета трябва да бъдат попълнени
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Отказ</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveNewTariff}
          >
            Добави
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за потвърждение на изтриване */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Потвърждение за изтриване
        </DialogTitle>
        <DialogContent>
          {tariffToDelete && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Сигурни ли сте, че искате да изтриете следната специална тарифа?
              </Typography>
              <Box sx={{ mt: 2, mb: 2, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)', borderRadius: 1 }}>
                <Typography variant="subtitle1">
                  <strong>Номер на влака:</strong> {tariffToDelete.trainNumber}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Маршрут:</strong> {tariffToDelete.route}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Вид тарифа:</strong> {tariffToDelete.tariffType}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Валидност:</strong> {tariffToDelete.validFrom} - {tariffToDelete.validTo}
                </Typography>
              </Box>
              <Typography variant="body2" color="error">
                Внимание: Това действие не може да бъде отменено!
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Откажи</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTariff}
          >
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SpecialTariffsPage; 