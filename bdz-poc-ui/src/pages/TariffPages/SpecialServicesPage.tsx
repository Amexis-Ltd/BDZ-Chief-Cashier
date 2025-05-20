import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Slide,
  SlideProps
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoneyIcon from '@mui/icons-material/Money';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LuggageIcon from '@mui/icons-material/Luggage';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoIcon from '@mui/icons-material/Info';

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
      id={`special-services-tabpanel-${index}`}
      aria-labelledby={`special-services-tab-${index}`}
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

// Примерни данни за специални превози
const specialTransports = [
  {
    id: 1,
    name: 'Корпоративен превоз "София - Пловдив"',
    client: 'ТехноКорп ООД',
    route: 'София - Пловдив',
    startDate: '2023-11-15',
    endDate: '2023-12-15',
    price: 15000,
    wagons: 3,
    status: 'active'
  },
  {
    id: 2,
    name: 'Юбилейно пътуване "50 години IT България"',
    client: 'ИТ Асоциация България',
    route: 'София - Варна',
    startDate: '2023-12-10',
    endDate: '2023-12-12',
    price: 25000,
    wagons: 5,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Специализиран превоз лекарства',
    client: 'МедикаФарм АД',
    route: 'София - Бургас',
    startDate: '2023-10-05',
    endDate: '2023-10-05',
    price: 8000,
    wagons: 1,
    status: 'completed'
  },
  {
    id: 4,
    name: 'Превоз на корпоративни гости',
    client: 'Евро Финанс ЕАД',
    route: 'София - Пловдив - Бургас',
    startDate: '2023-09-20',
    endDate: '2023-09-22',
    price: 22000,
    wagons: 2,
    status: 'completed'
  }
];

// Примерни данни за атракционни пътувания
const attractionTrips = [
  {
    id: 1,
    name: 'Пътуване с парен локомотив "Носталгия"',
    description: 'Пътуване с възстановен парен локомотив от 1931 г. по живописното трасе София - Банкя.',
    route: 'София - Банкя - София',
    duration: '4 часа',
    pricePerPerson: 65,
    capacity: 120,
    nextDates: ['2023-12-03', '2023-12-17', '2024-01-07'],
    image: 'steam_train.jpg',
    status: 'active'
  },
  {
    id: 2,
    name: 'По теснолинейката до Родопите',
    description: 'Атракционно пътуване по най-живописната теснолинейка в България с посещение на местни забележителности.',
    route: 'Септември - Велинград - Добринище',
    duration: '8 часа',
    pricePerPerson: 85,
    capacity: 140,
    nextDates: ['2023-12-09', '2023-12-23', '2024-01-13'],
    image: 'narrow_gauge.jpg',
    status: 'active'
  },
  {
    id: 3,
    name: 'Дунавски експрес',
    description: 'Специално пътуване по поречието на река Дунав с разглеждане на крайречни забележителности.',
    route: 'Видин - Русе',
    duration: '10 часа',
    pricePerPerson: 95,
    capacity: 180,
    nextDates: ['2024-03-15', '2024-04-12', '2024-05-17'],
    image: 'danube_express.jpg',
    status: 'upcoming'
  }
];

// Примерни данни за отдаване под наем
const rentals = [
  {
    id: 1,
    type: 'Спален вагон',
    model: 'WLABmz',
    capacity: '34 легла',
    pricePerDay: 2500,
    minPeriod: '3 дни',
    availability: 'available',
    features: ['Климатизация', 'Душ кабини', 'Електрически контакти'],
    image: 'wlabmz.jpg'
  },
  {
    id: 2,
    type: 'Вагон-ресторант',
    model: 'WRmz',
    capacity: '52 места',
    pricePerDay: 2800,
    minPeriod: '2 дни',
    availability: 'available',
    features: ['Пълно кухненско оборудване', 'Климатизация', 'Озвучителна система'],
    image: 'wrmz.jpg'
  },
  {
    id: 3,
    type: 'Пътнически вагон',
    model: 'Bmz',
    capacity: '80 места',
    pricePerDay: 1800,
    minPeriod: '1 ден',
    availability: 'available',
    features: ['Климатизация', 'Удобни седалки', 'Тоалетни'],
    image: 'bmz.jpg'
  },
  {
    id: 4,
    type: 'Локомотив',
    model: 'Siemens Smartron',
    power: '5600 kW',
    pricePerDay: 6500,
    minPeriod: '1 ден',
    availability: 'rented',
    features: ['Съвременно оборудване', 'Висока мощност', 'Икономичен разход'],
    image: 'smartron.jpg'
  }
];

// Примерни данни за снимачна дейност
const filmingProjects = [
  {
    id: 1,
    name: 'Исторически филм "Пътешествие през времето"',
    client: 'Българска Национална Филмова Компания',
    location: 'Централна гара София, отсечка София-Перник',
    startDate: '2024-02-10',
    endDate: '2024-02-20',
    price: 35000,
    usedEquipment: ['Парен локомотив от 1935 г.', '3 винтидж пътнически вагона'],
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'Музикален видеоклип "По релсите на спомена"',
    client: 'Музикална Продукция "Ритъм"',
    location: 'Гара Подуяне, отсечка София-Банкя',
    startDate: '2023-11-05',
    endDate: '2023-11-06',
    price: 8500,
    usedEquipment: ['Дизелов локомотив', '1 пътнически вагон'],
    status: 'completed'
  },
  {
    id: 3,
    name: 'Реклама на туристическа агенция',
    client: 'Травел Плюс ООД',
    location: 'Вагон-ресторант, маршрут София-Варна',
    startDate: '2023-12-12',
    endDate: '2023-12-13',
    price: 12000,
    usedEquipment: ['Вагон-ресторант', 'Спален вагон'],
    status: 'active'
  },
  {
    id: 4,
    name: 'Документален филм "Железният път"',
    client: 'Българска Национална Телевизия',
    location: 'Множество локации по цялата ЖП мрежа',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    price: 85000,
    usedEquipment: ['Различни типове локомотиви и вагони', 'Гари и ЖП съоръжения'],
    status: 'upcoming'
  }
];

// Компонент за анимация при появяване от дясно
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

// Типове нотификации
type NotificationType = 'success' | 'error' | 'info' | 'warning';

const SpecialServicesPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Състояния за модалните прозорци
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  // Състояние за съобщения
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [notificationType, setNotificationType] = useState<NotificationType>('success');
  
  // Състояние за текущия избран запис
  const [currentTransport, setCurrentTransport] = useState<any>(null);
  const [currentFilmingProject, setCurrentFilmingProject] = useState<any>(null);
  const [currentAttraction, setCurrentAttraction] = useState<any>(null);
  const [currentRental, setCurrentRental] = useState<any>(null);
  
  // Състояние за формата за редактиране на специализиран превоз
  const [editTransportForm, setEditTransportForm] = useState({
    name: '',
    client: '',
    route: '',
    startDate: '',
    endDate: '',
    price: '',
    wagons: '',
    status: ''
  });
  
  // Състояние за формата за редактиране на атракционно пътуване
  const [editAttractionForm, setEditAttractionForm] = useState({
    name: '',
    description: '',
    route: '',
    duration: '',
    pricePerPerson: '',
    capacity: '',
    nextDates: [] as string[],
    status: '',
    image: ''
  });
  
  // Състояние за формата за редактиране на отдаване под наем
  const [editRentalForm, setEditRentalForm] = useState({
    type: '',
    model: '',
    capacity: '',
    pricePerDay: '',
    minPeriod: '',
    availability: '',
    features: [] as string[],
    image: ''
  });
  
  // Състояние за формата за редактиране на снимачна дейност
  const [editFilmingForm, setEditFilmingForm] = useState({
    name: '',
    client: '',
    location: '',
    startDate: '',
    endDate: '',
    price: '',
    usedEquipment: [] as string[],
    status: ''
  });
  
  // Състояние за добавяне на ново оборудване към снимачна дейност
  const [newFilmingEquipment, setNewFilmingEquipment] = useState('');
  
  // Състояние за добавяне на нова характеристика към наем
  const [newRentalFeature, setNewRentalFeature] = useState('');
  
  // Състояние за добавяне на нова дата към атракционно пътуване
  const [newAttractionDate, setNewAttractionDate] = useState('');
  
  // Състояние за формата за добавяне на нов специализиран превоз
  const [newTransportForm, setNewTransportForm] = useState({
    name: '',
    client: '',
    route: '',
    startDate: '',
    endDate: '',
    price: '',
    wagons: '',
    status: 'upcoming'
  });
  
  // Състояние за формата за добавяне на ново атракционно пътуване
  const [newAttractionForm, setNewAttractionForm] = useState({
    name: '',
    description: '',
    route: '',
    duration: '',
    pricePerPerson: '',
    capacity: '',
    nextDates: [] as string[],
    status: 'upcoming',
    image: 'attraction.jpg'
  });
  
  // Състояние за добавяне на дата към ново атракционно пътуване
  const [newAttractionDateForAdd, setNewAttractionDateForAdd] = useState('');
  
  // Състояние за формата за добавяне на нова единица за отдаване под наем
  const [newRentalForm, setNewRentalForm] = useState({
    type: '',
    model: '',
    capacity: '',
    pricePerDay: '',
    minPeriod: '',
    availability: 'available',
    features: [] as string[],
    image: 'rental.jpg'
  });
  
  // Състояние за добавяне на нова характеристика към нова единица за отдаване под наем
  const [newRentalFeatureForAdd, setNewRentalFeatureForAdd] = useState('');
  
  // Състояние за грешки във формата
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    client?: string;
    route?: string;
    startDate?: string;
    endDate?: string;
    price?: string;
    wagons?: string;
    description?: string;
    duration?: string;
    pricePerPerson?: string;
    capacity?: string;
    type?: string;
    model?: string;
    pricePerDay?: string;
    minPeriod?: string;
    location?: string;
  }>({});
  
  // Състояние за формата за добавяне на нов проект за снимачна дейност
  const [newFilmingForm, setNewFilmingForm] = useState({
    name: '',
    client: '',
    location: '',
    startDate: '',
    endDate: '',
    price: '',
    usedEquipment: [] as string[],
    status: 'upcoming'
  });
  
  // Състояние за добавяне на ново оборудване към нов проект
  const [newFilmingEquipmentForAdd, setNewFilmingEquipmentForAdd] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Функция за затваряне на съобщение
  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  // Функция за показване на съобщение
  const showMessage = (message: string, type: NotificationType = 'success') => {
    setSnackbarMessage(message);
    setNotificationType(type);
    setSnackbarOpen(true);
  };

  // Функции за управление на специални превози
  const handleTransportDetails = (transport: any) => {
    setCurrentTransport(transport);
    setOpenDetailsDialog(true);
  };
  
  const handleTransportEdit = (transport: any) => {
    setCurrentTransport(transport);
    // Инициализиране на формата с текущите данни
    setEditTransportForm({
      name: transport.name,
      client: transport.client,
      route: transport.route,
      startDate: transport.startDate,
      endDate: transport.endDate,
      price: transport.price.toString(),
      wagons: transport.wagons.toString(),
      status: transport.status
    });
    setFormErrors({});
    setOpenEditDialog(true);
  };
  
  const handleTransportDelete = (transport: any) => {
    setCurrentTransport(transport);
    setOpenDeleteDialog(true);
  };
  
  // Функция за отваряне на диалог за добавяне на нов специализиран превоз
  const handleOpenAddTransportDialog = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Инициализиране на формата с празни стойности
    setNewTransportForm({
      name: '',
      client: '',
      route: '',
      startDate: today,
      endDate: tomorrow.toISOString().split('T')[0],
      price: '',
      wagons: '1',
      status: 'upcoming'
    });
    setFormErrors({});
    setOpenAddDialog(true);
  };
  
  const handleConfirmDelete = () => {
    // В реално приложение, тук ще бъде API заявка за изтриване на запис
    
    // Логика за изтриване според активния таб
    if (tabValue === 0 && currentTransport) {
      // Изтриване на специален превоз
      const index = specialTransports.findIndex(t => t.id === currentTransport.id);
      if (index !== -1) {
        specialTransports.splice(index, 1);
        showMessage(`Специалният превоз "${currentTransport.name}" беше успешно изтрит`, 'success');
      }
    } else if (tabValue === 1 && currentAttraction) {
      // Изтриване на атракционно пътуване
      const index = attractionTrips.findIndex(t => t.id === currentAttraction.id);
      if (index !== -1) {
        attractionTrips.splice(index, 1);
        showMessage(`Атракционното пътуване "${currentAttraction.name}" беше успешно изтрито`, 'success');
      }
    } else if (tabValue === 2 && currentRental) {
      // Изтриване на наем
      const index = rentals.findIndex(r => r.id === currentRental.id);
      if (index !== -1) {
        rentals.splice(index, 1);
        showMessage(`${currentRental.type} ${currentRental.model} беше успешно премахнат от списъка за отдаване под наем`, 'success');
      }
    } else if (tabValue === 3 && currentFilmingProject) {
      // Изтриване на снимачен проект
      const index = filmingProjects.findIndex(p => p.id === currentFilmingProject.id);
      if (index !== -1) {
        filmingProjects.splice(index, 1);
        showMessage(`Проектът за снимачна дейност "${currentFilmingProject.name}" беше успешно изтрит`, 'success');
      }
    }
    
    // Затваряне на диалога
    closeAllDialogs();
  };
  
  // Функции за управление на снимачна дейност
  const handleFilmingDetails = (project: any) => {
    setCurrentFilmingProject(project);
    setOpenDetailsDialog(true);
  };
  
  const handleFilmingEdit = (project: any) => {
    setCurrentFilmingProject(project);
    // Инициализиране на формата с текущите данни
    setEditFilmingForm({
      name: project.name,
      client: project.client,
      location: project.location,
      startDate: project.startDate,
      endDate: project.endDate,
      price: project.price.toString(),
      usedEquipment: [...project.usedEquipment],
      status: project.status
    });
    setNewFilmingEquipment('');
    setFormErrors({});
    setOpenEditDialog(true);
  };
  
  const handleFilmingDelete = (project: any) => {
    setCurrentFilmingProject(project);
    setOpenDeleteDialog(true);
  };
  
  // Функции за управление на атракционни пътувания
  const handleAttractionDetails = (attraction: any) => {
    setCurrentAttraction(attraction);
    setOpenDetailsDialog(true);
  };
  
  const handleAttractionEdit = (attraction: any) => {
    setCurrentAttraction(attraction);
    // Инициализиране на формата с текущите данни
    setEditAttractionForm({
      name: attraction.name,
      description: attraction.description,
      route: attraction.route,
      duration: attraction.duration,
      pricePerPerson: attraction.pricePerPerson.toString(),
      capacity: attraction.capacity.toString(),
      nextDates: [...attraction.nextDates],
      status: attraction.status,
      image: attraction.image
    });
    setNewAttractionDate('');
    setFormErrors({});
    setOpenEditDialog(true);
  };
  
  const handleAttractionDelete = (attraction: any) => {
    setCurrentAttraction(attraction);
    setOpenDeleteDialog(true);
  };
  
  // Функции за управление на отдаване под наем
  const handleRentalDetails = (rental: any) => {
    setCurrentRental(rental);
    setOpenDetailsDialog(true);
  };
  
  const handleRentalEdit = (rental: any) => {
    setCurrentRental(rental);
    // Инициализиране на формата с текущите данни
    setEditRentalForm({
      type: rental.type,
      model: rental.model,
      capacity: rental.capacity,
      pricePerDay: rental.pricePerDay.toString(),
      minPeriod: rental.minPeriod,
      availability: rental.availability,
      features: [...rental.features],
      image: rental.image
    });
    setNewRentalFeature('');
    setFormErrors({});
    setOpenEditDialog(true);
  };
  
  const handleRentalDelete = (rental: any) => {
    setCurrentRental(rental);
    setOpenDeleteDialog(true);
  };
  
  // Функция за затваряне на всички диалози
  const closeAllDialogs = () => {
    setOpenDetailsDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenAddDialog(false);
    setCurrentTransport(null);
    setCurrentFilmingProject(null);
    setCurrentAttraction(null);
    setCurrentRental(null);
  };
  
  // Функция за обработка на промени във формата за редактиране
  const handleEditTransportFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditTransportForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промени във формата за редактиране на атракционно пътуване
  const handleEditAttractionFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditAttractionForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в статуса при редактиране
  const handleEditTransportStatusChange = (event: SelectChangeEvent<string>) => {
    setEditTransportForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за обработка на промяна в статуса на атракционно пътуване
  const handleEditAttractionStatusChange = (event: SelectChangeEvent<string>) => {
    setEditAttractionForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за добавяне на дата към атракционно пътуване
  const handleAddDateToAttraction = () => {
    if (newAttractionDate) {
      // Проверка дали датата вече съществува
      if (!editAttractionForm.nextDates.includes(newAttractionDate)) {
        // Добавяне на нова дата и сортиране на датите
        const updatedDates = [...editAttractionForm.nextDates, newAttractionDate]
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        
        setEditAttractionForm(prev => ({
          ...prev,
          nextDates: updatedDates
        }));
        setNewAttractionDate('');
      } else {
        showMessage('Тази дата вече е добавена към пътуването', 'warning');
      }
    }
  };
  
  // Функция за премахване на дата от атракционно пътуване
  const handleRemoveDateFromAttraction = (dateToRemove: string) => {
    setEditAttractionForm(prev => ({
      ...prev,
      nextDates: prev.nextDates.filter(date => date !== dateToRemove)
    }));
  };
  
  // Валидация на формата за превоз
  const validateTransportForm = (formData: typeof editTransportForm): boolean => {
    const errors: {
      name?: string;
      client?: string;
      route?: string;
      startDate?: string;
      endDate?: string;
      price?: string;
      wagons?: string;
    } = {};
    
    if (!formData.name) {
      errors.name = 'Моля, въведете име на превоза';
    }
    
    if (!formData.client) {
      errors.client = 'Моля, въведете име на клиента';
    }
    
    if (!formData.route) {
      errors.route = 'Моля, въведете маршрут';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Моля, въведете начална дата';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'Моля, въведете крайна дата';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      errors.endDate = 'Крайната дата трябва да е след началната дата';
    }
    
    if (!formData.price) {
      errors.price = 'Моля, въведете цена';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = 'Моля, въведете валидна положителна цена';
    }
    
    if (!formData.wagons) {
      errors.wagons = 'Моля, въведете брой вагони';
    } else if (isNaN(Number(formData.wagons)) || Number(formData.wagons) <= 0 || !Number.isInteger(Number(formData.wagons))) {
      errors.wagons = 'Моля, въведете валиден брой вагони';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Валидация на формата за атракционно пътуване
  const validateAttractionForm = (formData: typeof editAttractionForm): boolean => {
    const errors: {
      name?: string;
      description?: string;
      route?: string;
      duration?: string;
      pricePerPerson?: string;
      capacity?: string;
    } = {};
    
    if (!formData.name) {
      errors.name = 'Моля, въведете име на пътуването';
    }
    
    if (!formData.description) {
      errors.description = 'Моля, въведете описание';
    }
    
    if (!formData.route) {
      errors.route = 'Моля, въведете маршрут';
    }
    
    if (!formData.duration) {
      errors.duration = 'Моля, въведете продължителност';
    }
    
    if (!formData.pricePerPerson) {
      errors.pricePerPerson = 'Моля, въведете цена на човек';
    } else if (isNaN(Number(formData.pricePerPerson)) || Number(formData.pricePerPerson) <= 0) {
      errors.pricePerPerson = 'Моля, въведете валидна положителна цена';
    }
    
    if (!formData.capacity) {
      errors.capacity = 'Моля, въведете капацитет';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0 || !Number.isInteger(Number(formData.capacity))) {
      errors.capacity = 'Моля, въведете валиден капацитет (цяло положително число)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Функция за добавяне на нов специализиран превоз
  const handleAddNewTransport = () => {
    if (validateTransportForm(newTransportForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за добавяне на данните
        
        // Добавяне към локалните данни
        const newId = Math.max(0, ...specialTransports.map(t => t.id)) + 1;
        const newTransport = {
          id: newId,
          name: newTransportForm.name,
          client: newTransportForm.client,
          route: newTransportForm.route,
          startDate: newTransportForm.startDate,
          endDate: newTransportForm.endDate,
          price: Number(newTransportForm.price),
          wagons: Number(newTransportForm.wagons),
          status: newTransportForm.status
        };
        
        specialTransports.unshift(newTransport); // Добавяне в началото на масива, за да се покаже най-отгоре
        
        // Показване на съобщение за успех
        showMessage(`Специалният превоз "${newTransportForm.name}" беше успешно добавен`, 'success');
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при добавяне на специализирания превоз. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за запазване на редактирания специализиран превоз
  const handleSaveTransportEdit = () => {
    if (validateTransportForm(editTransportForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за актуализиране на данните
        
        // Актуализиране на локалните данни
        if (currentTransport) {
          const index = specialTransports.findIndex(t => t.id === currentTransport.id);
          if (index !== -1) {
            specialTransports[index] = {
              ...specialTransports[index],
              name: editTransportForm.name,
              client: editTransportForm.client,
              route: editTransportForm.route,
              startDate: editTransportForm.startDate,
              endDate: editTransportForm.endDate,
              price: Number(editTransportForm.price),
              wagons: Number(editTransportForm.wagons),
              status: editTransportForm.status
            };
            
            // Показване на съобщение за успех
            showMessage(`Специалният превоз "${editTransportForm.name}" беше успешно актуализиран`, 'success');
          }
        }
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при актуализиране на специализирания превоз. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за запазване на редактираното атракционно пътуване
  const handleSaveAttractionEdit = () => {
    if (validateAttractionForm(editAttractionForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за актуализиране на данните
        
        // Актуализиране на локалните данни
        if (currentAttraction) {
          const index = attractionTrips.findIndex(t => t.id === currentAttraction.id);
          if (index !== -1) {
            attractionTrips[index] = {
              ...attractionTrips[index],
              name: editAttractionForm.name,
              description: editAttractionForm.description,
              route: editAttractionForm.route,
              duration: editAttractionForm.duration,
              pricePerPerson: Number(editAttractionForm.pricePerPerson),
              capacity: Number(editAttractionForm.capacity),
              nextDates: [...editAttractionForm.nextDates],
              status: editAttractionForm.status,
              image: editAttractionForm.image
            };
            
            // Показване на съобщение за успех
            showMessage(`Атракционното пътуване "${editAttractionForm.name}" беше успешно актуализирано`, 'success');
          }
        }
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при актуализиране на атракционното пътуване. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за обработка на промени във формата за редактиране на отдаване под наем
  const handleEditRentalFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditRentalForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в наличността при редактиране
  const handleEditRentalAvailabilityChange = (event: SelectChangeEvent<string>) => {
    setEditRentalForm(prev => ({
      ...prev,
      availability: event.target.value
    }));
  };
  
  // Функция за добавяне на характеристика към наем
  const handleAddFeatureToRental = () => {
    if (newRentalFeature.trim()) {
      // Проверка дали характеристиката вече съществува
      if (!editRentalForm.features.includes(newRentalFeature.trim())) {
        setEditRentalForm(prev => ({
          ...prev,
          features: [...prev.features, newRentalFeature.trim()]
        }));
        setNewRentalFeature('');
      } else {
        showMessage('Тази характеристика вече е добавена', 'warning');
      }
    }
  };
  
  // Функция за премахване на характеристика от наем
  const handleRemoveFeatureFromRental = (featureToRemove: string) => {
    setEditRentalForm(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };
  
  // Валидация на формата за наем
  const validateRentalForm = (formData: typeof editRentalForm): boolean => {
    const errors: {
      type?: string;
      model?: string;
      capacity?: string;
      pricePerDay?: string;
      minPeriod?: string;
    } = {};
    
    if (!formData.type) {
      errors.type = 'Моля, въведете тип';
    }
    
    if (!formData.model) {
      errors.model = 'Моля, въведете модел';
    }
    
    if (!formData.capacity) {
      errors.capacity = 'Моля, въведете капацитет';
    }
    
    if (!formData.pricePerDay) {
      errors.pricePerDay = 'Моля, въведете цена на ден';
    } else if (isNaN(Number(formData.pricePerDay)) || Number(formData.pricePerDay) <= 0) {
      errors.pricePerDay = 'Моля, въведете валидна положителна цена';
    }
    
    if (!formData.minPeriod) {
      errors.minPeriod = 'Моля, въведете минимален период';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Функция за запазване на редактирания наем
  const handleSaveRentalEdit = () => {
    if (validateRentalForm(editRentalForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за актуализиране на данните
        
        // Актуализиране на локалните данни
        if (currentRental) {
          const index = rentals.findIndex(r => r.id === currentRental.id);
          if (index !== -1) {
            // Запазваме id и проверяваме за специфични полета
            const updatedRental = {
              id: rentals[index].id,
              type: editRentalForm.type,
              model: editRentalForm.model,
              pricePerDay: Number(editRentalForm.pricePerDay),
              minPeriod: editRentalForm.minPeriod,
              availability: editRentalForm.availability,
              features: [...editRentalForm.features],
              image: editRentalForm.image
            };
            
            // Добавяме capacity само ако го има в оригиналния обект
            if ('capacity' in rentals[index]) {
              (updatedRental as any).capacity = editRentalForm.capacity;
            }
            
            // Добавяме power само ако го има в оригиналния обект
            if ('power' in rentals[index]) {
              (updatedRental as any).power = (rentals[index] as any).power;
            }
            
            // Обновяваме обекта
            rentals[index] = updatedRental as typeof rentals[0];
            
            // Показване на съобщение за успех
            showMessage(`${editRentalForm.type} ${editRentalForm.model} беше успешно актуализиран`, 'success');
          }
        }
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при актуализиране на наема. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за обработка на промени във формата за редактиране на снимачна дейност
  const handleEditFilmingFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditFilmingForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в статуса при редактиране на снимачна дейност
  const handleEditFilmingStatusChange = (event: SelectChangeEvent<string>) => {
    setEditFilmingForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за добавяне на оборудване към снимачна дейност
  const handleAddEquipmentToFilming = () => {
    if (newFilmingEquipment.trim()) {
      // Проверка дали оборудването вече съществува
      if (!editFilmingForm.usedEquipment.includes(newFilmingEquipment.trim())) {
        setEditFilmingForm(prev => ({
          ...prev,
          usedEquipment: [...prev.usedEquipment, newFilmingEquipment.trim()]
        }));
        setNewFilmingEquipment('');
      } else {
        showMessage('Това оборудване вече е добавено', 'warning');
      }
    }
  };
  
  // Функция за премахване на оборудване от снимачна дейност
  const handleRemoveEquipmentFromFilming = (equipmentToRemove: string) => {
    setEditFilmingForm(prev => ({
      ...prev,
      usedEquipment: prev.usedEquipment.filter(equipment => equipment !== equipmentToRemove)
    }));
  };
  
  // Валидация на формата за снимачна дейност
  const validateFilmingForm = (formData: typeof editFilmingForm): boolean => {
    const errors: {
      name?: string;
      client?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      price?: string;
    } = {};
    
    if (!formData.name) {
      errors.name = 'Моля, въведете име на проекта';
    }
    
    if (!formData.client) {
      errors.client = 'Моля, въведете име на клиента';
    }
    
    if (!formData.location) {
      errors.location = 'Моля, въведете локация';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Моля, въведете начална дата';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'Моля, въведете крайна дата';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      errors.endDate = 'Крайната дата трябва да е след началната дата';
    }
    
    if (!formData.price) {
      errors.price = 'Моля, въведете цена';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = 'Моля, въведете валидна положителна цена';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Функция за запазване на редактираната снимачна дейност
  const handleSaveFilmingEdit = () => {
    if (validateFilmingForm(editFilmingForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за актуализиране на данните
        
        // Актуализиране на локалните данни
        if (currentFilmingProject) {
          const index = filmingProjects.findIndex(p => p.id === currentFilmingProject.id);
          if (index !== -1) {
            filmingProjects[index] = {
              ...filmingProjects[index],
              name: editFilmingForm.name,
              client: editFilmingForm.client,
              location: editFilmingForm.location,
              startDate: editFilmingForm.startDate,
              endDate: editFilmingForm.endDate,
              price: Number(editFilmingForm.price),
              usedEquipment: [...editFilmingForm.usedEquipment],
              status: editFilmingForm.status
            };
            
            // Показване на съобщение за успех
            showMessage(`Проектът за снимачна дейност "${editFilmingForm.name}" беше успешно актуализиран`, 'success');
          }
        }
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при актуализиране на проекта за снимачна дейност. Моля, опитайте отново.', 'error');
      }
    }
  };

  // Филтриране на данните според търсенето
  const filteredSpecialTransports = specialTransports.filter(transport => 
    transport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transport.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transport.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAttractionTrips = attractionTrips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRentals = rentals.filter(rental => 
    rental.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rental.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFilmingProjects = filmingProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция за обработка на промени във формата за добавяне на нов превоз
  const handleNewTransportFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewTransportForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в статуса при добавяне на нов превоз
  const handleNewTransportStatusChange = (event: SelectChangeEvent<string>) => {
    setNewTransportForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за отваряне на диалог за добавяне на ново атракционно пътуване
  const handleOpenAddAttractionDialog = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Инициализиране на формата с празни стойности
    setNewAttractionForm({
      name: '',
      description: '',
      route: '',
      duration: '',
      pricePerPerson: '',
      capacity: '',
      nextDates: [today],
      status: 'upcoming',
      image: 'attraction.jpg'
    });
    setNewAttractionDateForAdd('');
    setFormErrors({});
    setOpenAddDialog(true);
  };
  
  // Функция за добавяне на дата към ново атракционно пътуване
  const handleAddDateToNewAttraction = () => {
    if (newAttractionDateForAdd) {
      // Проверка дали датата вече съществува
      if (!newAttractionForm.nextDates.includes(newAttractionDateForAdd)) {
        // Добавяне на нова дата и сортиране на датите
        const updatedDates = [...newAttractionForm.nextDates, newAttractionDateForAdd]
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        
        setNewAttractionForm(prev => ({
          ...prev,
          nextDates: updatedDates
        }));
        setNewAttractionDateForAdd('');
      } else {
        showMessage('Тази дата вече е добавена към пътуването', 'warning');
      }
    }
  };
  
  // Функция за премахване на дата от ново атракционно пътуване
  const handleRemoveDateFromNewAttraction = (dateToRemove: string) => {
    setNewAttractionForm(prev => ({
      ...prev,
      nextDates: prev.nextDates.filter(date => date !== dateToRemove)
    }));
  };
  
  // Функция за обработка на промени във формата за добавяне на ново атракционно пътуване
  const handleNewAttractionFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewAttractionForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в статуса при добавяне на ново атракционно пътуване
  const handleNewAttractionStatusChange = (event: SelectChangeEvent<string>) => {
    setNewAttractionForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за добавяне на ново атракционно пътуване
  const handleAddNewAttraction = () => {
    if (validateAttractionForm(newAttractionForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за добавяне на данните
        
        // Добавяне към локалните данни
        const newId = Math.max(0, ...attractionTrips.map(t => t.id)) + 1;
        const newAttraction = {
          id: newId,
          name: newAttractionForm.name,
          description: newAttractionForm.description,
          route: newAttractionForm.route,
          duration: newAttractionForm.duration,
          pricePerPerson: Number(newAttractionForm.pricePerPerson),
          capacity: Number(newAttractionForm.capacity),
          nextDates: [...newAttractionForm.nextDates],
          status: newAttractionForm.status,
          image: newAttractionForm.image
        };
        
        attractionTrips.unshift(newAttraction); // Добавяне в началото на масива, за да се покаже най-отгоре
        
        // Показване на съобщение за успех
        showMessage(`Атракционното пътуване "${newAttractionForm.name}" беше успешно добавено`, 'success');
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при добавяне на атракционното пътуване. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за отваряне на диалог за добавяне на нова единица за отдаване под наем
  const handleOpenAddRentalDialog = () => {
    // Инициализиране на формата с празни стойности
    setNewRentalForm({
      type: '',
      model: '',
      capacity: '',
      pricePerDay: '',
      minPeriod: '1 ден',
      availability: 'available',
      features: [],
      image: 'rental.jpg'
    });
    setNewRentalFeatureForAdd('');
    setFormErrors({});
    setOpenAddDialog(true);
  };
  
  // Функция за обработка на промени във формата за добавяне на нова единица за отдаване под наем
  const handleNewRentalFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewRentalForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в наличността при добавяне на нова единица
  const handleNewRentalAvailabilityChange = (event: SelectChangeEvent<string>) => {
    setNewRentalForm(prev => ({
      ...prev,
      availability: event.target.value
    }));
  };
  
  // Функция за добавяне на характеристика към нова единица за отдаване под наем
  const handleAddFeatureToNewRental = () => {
    if (newRentalFeatureForAdd.trim()) {
      // Проверка дали характеристиката вече съществува
      if (!newRentalForm.features.includes(newRentalFeatureForAdd.trim())) {
        setNewRentalForm(prev => ({
          ...prev,
          features: [...prev.features, newRentalFeatureForAdd.trim()]
        }));
        setNewRentalFeatureForAdd('');
      } else {
        showMessage('Тази характеристика вече е добавена', 'warning');
      }
    }
  };
  
  // Функция за премахване на характеристика от нова единица за отдаване под наем
  const handleRemoveFeatureFromNewRental = (featureToRemove: string) => {
    setNewRentalForm(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };
  
  // Функция за добавяне на нова единица за отдаване под наем
  const handleAddNewRental = () => {
    if (validateRentalForm(newRentalForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за добавяне на данните
        
        // Добавяне към локалните данни
        const newId = Math.max(0, ...rentals.map(r => r.id)) + 1;
        const newRental = {
          id: newId,
          type: newRentalForm.type,
          model: newRentalForm.model,
          capacity: newRentalForm.capacity,
          pricePerDay: Number(newRentalForm.pricePerDay),
          minPeriod: newRentalForm.minPeriod,
          availability: newRentalForm.availability,
          features: [...newRentalForm.features],
          image: newRentalForm.image
        };
        
        rentals.unshift(newRental); // Добавяне в началото на масива, за да се покаже най-отгоре
        
        // Показване на съобщение за успех
        showMessage(`${newRentalForm.type} ${newRentalForm.model} беше успешно добавен`, 'success');
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при добавяне на единицата за отдаване под наем. Моля, опитайте отново.', 'error');
      }
    }
  };
  
  // Функция за отваряне на диалог за добавяне на нов проект за снимачна дейност
  const handleOpenAddFilmingDialog = () => {
    const today = new Date().toISOString().split('T')[0];
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    
    // Инициализиране на формата с начални стойности
    setNewFilmingForm({
      name: '',
      client: '',
      location: '',
      startDate: today,
      endDate: threeMonthsLater.toISOString().split('T')[0],
      price: '',
      usedEquipment: [],
      status: 'upcoming'
    });
    setNewFilmingEquipmentForAdd('');
    setFormErrors({});
    setOpenAddDialog(true);
  };
  
  // Функция за обработка на промени във формата за добавяне на нов проект
  const handleNewFilmingFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewFilmingForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Премахване на грешка при промяна
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Функция за обработка на промяна в статуса при добавяне на нов проект
  const handleNewFilmingStatusChange = (event: SelectChangeEvent<string>) => {
    setNewFilmingForm(prev => ({
      ...prev,
      status: event.target.value
    }));
  };
  
  // Функция за добавяне на оборудване към нов проект
  const handleAddEquipmentToNewFilming = () => {
    if (newFilmingEquipmentForAdd.trim()) {
      // Проверка дали оборудването вече съществува
      if (!newFilmingForm.usedEquipment.includes(newFilmingEquipmentForAdd.trim())) {
        setNewFilmingForm(prev => ({
          ...prev,
          usedEquipment: [...prev.usedEquipment, newFilmingEquipmentForAdd.trim()]
        }));
        setNewFilmingEquipmentForAdd('');
      } else {
        showMessage('Това оборудване вече е добавено', 'warning');
      }
    }
  };
  
  // Функция за премахване на оборудване от нов проект
  const handleRemoveEquipmentFromNewFilming = (equipmentToRemove: string) => {
    setNewFilmingForm(prev => ({
      ...prev,
      usedEquipment: prev.usedEquipment.filter(equipment => equipment !== equipmentToRemove)
    }));
  };
  
  // Функция за добавяне на нов проект за снимачна дейност
  const handleAddNewFilming = () => {
    if (validateFilmingForm(newFilmingForm)) {
      try {
        // В реално приложение, тук ще бъде API заявка за добавяне на данните
        
        // Добавяне към локалните данни
        const newId = Math.max(0, ...filmingProjects.map(p => p.id)) + 1;
        const newFilmingProject = {
          id: newId,
          name: newFilmingForm.name,
          client: newFilmingForm.client,
          location: newFilmingForm.location,
          startDate: newFilmingForm.startDate,
          endDate: newFilmingForm.endDate,
          price: Number(newFilmingForm.price),
          usedEquipment: [...newFilmingForm.usedEquipment],
          status: newFilmingForm.status
        };
        
        filmingProjects.unshift(newFilmingProject); // Добавяне в началото на масива
        
        // Показване на съобщение за успех
        showMessage(`Проектът за снимачна дейност "${newFilmingForm.name}" беше успешно добавен`, 'success');
        
        // Затваряне на диалога
        closeAllDialogs();
      } catch (error) {
        // В случай на грешка при запис показваме съобщение за грешка
        showMessage('Възникна грешка при добавяне на проекта за снимачна дейност. Моля, опитайте отново.', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Търговски тарифи
      </Typography>
      <Typography variant="body1" paragraph>
        Управление на специални превози, атракционни пътувания, отдаване на подвижния състав под наем и снимачна дейност. Тарифите се определят чрез договаряне и пътуванията се организират със сключен договор.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="special services tabs">
          <Tab label="Специални превози" icon={<DirectionsRailwayIcon />} iconPosition="start" />
          <Tab label="Атракционни пътувания" icon={<AutoAwesomeIcon />} iconPosition="start" />
          <Tab label="Отдаване под наем" icon={<LuggageIcon />} iconPosition="start" />
          <Tab label="Снимачна дейност" icon={<MovieCreationIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
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
      
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Специални превози
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddTransportDialog}
          >
            Добави нов превоз
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Име на превоза</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Маршрут</TableCell>
                <TableCell>Период</TableCell>
                <TableCell width="150px">Цена</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell width="160px" align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSpecialTransports.map((transport) => (
                <TableRow key={transport.id}>
                  <TableCell>{transport.name}</TableCell>
                  <TableCell>{transport.client}</TableCell>
                  <TableCell>{transport.route}</TableCell>
                  <TableCell>
                    {new Date(transport.startDate).toLocaleDateString()} - {new Date(transport.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell width="150px">{transport.price.toLocaleString()} лв.</TableCell>
                  <TableCell>
                    {transport.status === 'active' && (
                      <Chip label="Активен" color="success" size="small" />
                    )}
                    {transport.status === 'upcoming' && (
                      <Chip label="Предстоящ" color="info" size="small" />
                    )}
                    {transport.status === 'completed' && (
                      <Chip label="Приключил" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell width="160px" align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton size="small" onClick={() => handleTransportDetails(transport)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleTransportEdit(transport)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleTransportDelete(transport)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSpecialTransports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      Няма намерени специални превози, отговарящи на критериите за търсене.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Атракционни пътувания
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddAttractionDialog}
          >
            Добави ново пътуване
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {filteredAttractionTrips.map((trip) => (
            <Grid item xs={12} md={4} key={trip.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {trip.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {trip.description.length > 150 ? trip.description.substring(0, 150) + '...' : trip.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Маршрут:</strong> {trip.route}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Продължителност:</strong> {trip.duration}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Цена:</strong> {trip.pricePerPerson} лв. на човек
                    </Typography>
                    <Typography variant="body2">
                      <strong>Капацитет:</strong> {trip.capacity} пътници
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Предстоящи дати:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {trip.nextDates.map((date, index) => (
                        <Chip
                          key={index}
                          size="small"
                          label={new Date(date).toLocaleDateString()}
                          icon={<CalendarTodayIcon />}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small" startIcon={<VisibilityIcon />} onClick={() => handleAttractionDetails(trip)}>
                    Детайли
                  </Button>
                  <Button size="small" startIcon={<EditIcon />} onClick={() => handleAttractionEdit(trip)}>
                    Редактирай
                  </Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleAttractionDelete(trip)}>
                    Изтрий
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredAttractionTrips.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Няма намерени атракционни пътувания, отговарящи на критериите за търсене.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Отдаване на подвижен състав под наем
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddRentalDialog}
          >
            Добави нова единица
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {filteredRentals.map((rental) => (
            <Grid item xs={12} md={6} key={rental.id}>
              <Card sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ 
                  width: 150, 
                  bgcolor: 'grey.300', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DirectionsRailwayIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h2" variant="h6">
                      {rental.type}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Модел: {rental.model}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MoneyIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        <strong>Цена:</strong> {rental.pricePerDay} лв./ден (мин. {rental.minPeriod})
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      <strong>Капацитет:</strong> {rental.capacity}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Характеристики:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {rental.features.map((feature, index) => (
                          <Chip key={index} label={feature} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    {rental.availability === 'available' ? (
                      <Chip label="Свободен" color="success" />
                    ) : (
                      <Chip label="Нает" color="error" />
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Button size="small" startIcon={<VisibilityIcon />} onClick={() => handleRentalDetails(rental)}>
                      Детайли
                    </Button>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleRentalEdit(rental)}>
                      Редактирай
                    </Button>
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleRentalDelete(rental)}>
                      Изтрий
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
          {filteredRentals.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Няма намерени единици за отдаване под наем, отговарящи на критериите за търсене.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Снимачна дейност
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddFilmingDialog}
          >
            Добави нов проект
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Име на проекта</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Локация</TableCell>
                <TableCell>Период</TableCell>
                <TableCell width="150px">Цена</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell width="160px" align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFilmingProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell width="150px">{project.price.toLocaleString()} лв.</TableCell>
                  <TableCell>
                    {project.status === 'active' && (
                      <Chip label="Активен" color="success" size="small" />
                    )}
                    {project.status === 'upcoming' && (
                      <Chip label="Предстоящ" color="info" size="small" />
                    )}
                    {project.status === 'completed' && (
                      <Chip label="Приключил" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell width="160px" align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton size="small" onClick={() => handleFilmingDetails(project)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleFilmingEdit(project)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleFilmingDelete(project)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredFilmingProjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      Няма намерени проекти за снимачна дейност, отговарящи на критериите за търсене.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      {/* Диалог за детайли */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={closeAllDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {tabValue === 0 && currentTransport && 'Детайли за специален превоз'}
          {tabValue === 1 && currentAttraction && 'Детайли за атракционно пътуване'}
          {tabValue === 2 && currentRental && 'Детайли за отдаване под наем'}
          {tabValue === 3 && currentFilmingProject && 'Детайли за снимачна дейност'}
        </DialogTitle>
        <DialogContent dividers>
          {/* Съдържание за специален превоз */}
          {tabValue === 0 && currentTransport && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">{currentTransport.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Клиент: {currentTransport.client}</Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Маршрут:</strong> {currentTransport.route}</Typography>
                <Typography variant="body1">
                  <strong>Период:</strong> {new Date(currentTransport.startDate).toLocaleDateString()} - {new Date(currentTransport.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1"><strong>Цена:</strong> {currentTransport.price.toLocaleString()} лв.</Typography>
                <Typography variant="body1"><strong>Брой вагони:</strong> {currentTransport.wagons}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Статус на превоза</Typography>
                    {currentTransport.status === 'active' && (
                      <Alert severity="success" sx={{ mt: 1 }}>Активен превоз</Alert>
                    )}
                    {currentTransport.status === 'upcoming' && (
                      <Alert severity="info" sx={{ mt: 1 }}>Предстоящ превоз</Alert>
                    )}
                    {currentTransport.status === 'completed' && (
                      <Alert severity="success" sx={{ mt: 1 }}>Приключил превоз</Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {/* Съдържание за снимачна дейност */}
          {tabValue === 3 && currentFilmingProject && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">{currentFilmingProject.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Клиент: {currentFilmingProject.client}</Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Локация:</strong> {currentFilmingProject.location}</Typography>
                <Typography variant="body1">
                  <strong>Период:</strong> {new Date(currentFilmingProject.startDate).toLocaleDateString()} - {new Date(currentFilmingProject.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1"><strong>Цена:</strong> {currentFilmingProject.price.toLocaleString()} лв.</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Използвано оборудване</Typography>
                    <List>
                      {currentFilmingProject.usedEquipment.map((item: string, index: number) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Статус на проекта</Typography>
                    {currentFilmingProject.status === 'active' && (
                      <Alert severity="success" sx={{ mt: 1 }}>Активен проект</Alert>
                    )}
                    {currentFilmingProject.status === 'upcoming' && (
                      <Alert severity="info" sx={{ mt: 1 }}>Предстоящ проект</Alert>
                    )}
                    {currentFilmingProject.status === 'completed' && (
                      <Alert severity="success" sx={{ mt: 1 }}>Приключил проект</Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {/* Съдържание за атракционно пътуване */}
          {tabValue === 1 && currentAttraction && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">{currentAttraction.name}</Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>{currentAttraction.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Маршрут:</strong> {currentAttraction.route}</Typography>
                <Typography variant="body1"><strong>Продължителност:</strong> {currentAttraction.duration}</Typography>
                <Typography variant="body1"><strong>Цена на човек:</strong> {currentAttraction.pricePerPerson} лв.</Typography>
                <Typography variant="body1"><strong>Капацитет:</strong> {currentAttraction.capacity} пътници</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Предстоящи дати</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {currentAttraction.nextDates.map((date: string, index: number) => (
                        <Chip
                          key={index}
                          label={new Date(date).toLocaleDateString()}
                          icon={<CalendarTodayIcon />}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {/* Съдържание за отдаване под наем */}
          {tabValue === 2 && currentRental && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">{currentRental.type}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Модел: {currentRental.model}</Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Капацитет:</strong> {currentRental.capacity}</Typography>
                <Typography variant="body1"><strong>Цена на ден:</strong> {currentRental.pricePerDay} лв.</Typography>
                <Typography variant="body1"><strong>Минимален период:</strong> {currentRental.minPeriod}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Характеристики</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {currentRental.features.map((feature: string, index: number) => (
                        <Chip
                          key={index}
                          label={feature}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Alert
                  severity={currentRental.availability === 'available' ? 'success' : 'error'}
                >
                  {currentRental.availability === 'available' ? 'Свободен за наемане' : 'В момента е нает'}
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAllDialogs}>Затвори</Button>
          <Button 
            onClick={() => {
              closeAllDialogs();
              
              // Отваряне на редактиране според активния таб
              if (tabValue === 0 && currentTransport) {
                handleTransportEdit(currentTransport);
              } else if (tabValue === 1 && currentAttraction) {
                handleAttractionEdit(currentAttraction);
              } else if (tabValue === 2 && currentRental) {
                handleRentalEdit(currentRental);
              } else if (tabValue === 3 && currentFilmingProject) {
                handleFilmingEdit(currentFilmingProject);
              }
            }}
            color="primary"
            startIcon={<EditIcon />}
          >
            Редактирай
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за редактиране */}
      <Dialog 
        open={openEditDialog}
        onClose={closeAllDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {tabValue === 0 && currentTransport && 'Редактиране на специален превоз'}
          {tabValue === 1 && currentAttraction && 'Редактиране на атракционно пътуване'}
          {tabValue === 2 && currentRental && 'Редактиране на отдаване под наем'}
          {tabValue === 3 && currentFilmingProject && 'Редактиране на снимачна дейност'}
        </DialogTitle>
        <DialogContent dividers>
          {/* Форма за редактиране на специален превоз */}
          {tabValue === 0 && currentTransport && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на превоза"
                  fullWidth
                  name="name"
                  value={editTransportForm.name}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                />
                <TextField
                  label="Клиент"
                  fullWidth
                  name="client"
                  value={editTransportForm.client}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.client}
                  helperText={formErrors.client}
                  margin="normal"
                />
                <TextField
                  label="Маршрут"
                  fullWidth
                  name="route"
                  value={editTransportForm.route}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.route}
                  helperText={formErrors.route}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Начална дата"
                  type="date"
                  fullWidth
                  name="startDate"
                  value={editTransportForm.startDate}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Крайна дата"
                  type="date"
                  fullWidth
                  name="endDate"
                  value={editTransportForm.endDate}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Цена (лв.)"
                  fullWidth
                  name="price"
                  value={editTransportForm.price}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Брой вагони"
                  fullWidth
                  name="wagons"
                  value={editTransportForm.wagons}
                  onChange={handleEditTransportFormChange}
                  error={!!formErrors.wagons}
                  helperText={formErrors.wagons}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="transport-status-label">Статус</InputLabel>
                  <Select
                    labelId="transport-status-label"
                    value={editTransportForm.status}
                    onChange={handleEditTransportStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          
          {/* Форма за редактиране на атракционно пътуване */}
          {tabValue === 1 && currentAttraction && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на пътуването"
                  fullWidth
                  name="name"
                  value={editAttractionForm.name}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                />
                <TextField
                  label="Маршрут"
                  fullWidth
                  name="route"
                  value={editAttractionForm.route}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.route}
                  helperText={formErrors.route}
                  margin="normal"
                />
                <TextField
                  label="Продължителност"
                  fullWidth
                  name="duration"
                  value={editAttractionForm.duration}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.duration}
                  helperText={formErrors.duration}
                  margin="normal"
                />
                <TextField
                  label="Цена на човек (лв.)"
                  fullWidth
                  name="pricePerPerson"
                  value={editAttractionForm.pricePerPerson}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.pricePerPerson}
                  helperText={formErrors.pricePerPerson}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Капацитет (брой пътници)"
                  fullWidth
                  name="capacity"
                  value={editAttractionForm.capacity}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.capacity}
                  helperText={formErrors.capacity}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="attraction-status-label">Статус</InputLabel>
                  <Select
                    labelId="attraction-status-label"
                    value={editAttractionForm.status}
                    onChange={handleEditAttractionStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Описание"
                  fullWidth
                  name="description"
                  value={editAttractionForm.description}
                  onChange={handleEditAttractionFormChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  margin="normal"
                  multiline
                  rows={5}
                />
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Предстоящи дати:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави дата"
                      type="date"
                      value={newAttractionDate}
                      onChange={(e) => setNewAttractionDate(e.target.value)}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddDateToAttraction}
                      disabled={!newAttractionDate}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {editAttractionForm.nextDates.length > 0 ? (
                      editAttractionForm.nextDates.map((date, index) => (
                        <Chip
                          key={index}
                          label={new Date(date).toLocaleDateString()}
                          icon={<CalendarTodayIcon />}
                          onDelete={() => handleRemoveDateFromAttraction(date)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавени дати. Моля, добавете поне една дата.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
          
          {/* Форма за редактиране на отдаване под наем */}
          {tabValue === 2 && currentRental && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Тип"
                  fullWidth
                  name="type"
                  value={editRentalForm.type}
                  onChange={handleEditRentalFormChange}
                  error={!!formErrors.type}
                  helperText={formErrors.type}
                  margin="normal"
                />
                <TextField
                  label="Модел"
                  fullWidth
                  name="model"
                  value={editRentalForm.model}
                  onChange={handleEditRentalFormChange}
                  error={!!formErrors.model}
                  helperText={formErrors.model}
                  margin="normal"
                />
                <TextField
                  label="Капацитет"
                  fullWidth
                  name="capacity"
                  value={editRentalForm.capacity}
                  onChange={handleEditRentalFormChange}
                  error={!!formErrors.capacity}
                  helperText={formErrors.capacity}
                  margin="normal"
                />
                <TextField
                  label="Цена на ден (лв.)"
                  fullWidth
                  name="pricePerDay"
                  value={editRentalForm.pricePerDay}
                  onChange={handleEditRentalFormChange}
                  error={!!formErrors.pricePerDay}
                  helperText={formErrors.pricePerDay}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Минимален период"
                  fullWidth
                  name="minPeriod"
                  value={editRentalForm.minPeriod}
                  onChange={handleEditRentalFormChange}
                  error={!!formErrors.minPeriod}
                  helperText={formErrors.minPeriod}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="rental-availability-label">Наличност</InputLabel>
                  <Select
                    labelId="rental-availability-label"
                    value={editRentalForm.availability}
                    onChange={handleEditRentalAvailabilityChange}
                    label="Наличност"
                  >
                    <MenuItem value="available">Свободен</MenuItem>
                    <MenuItem value="rented">Нает</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Характеристики:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави характеристика"
                      value={newRentalFeature}
                      onChange={(e) => setNewRentalFeature(e.target.value)}
                      size="small"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddFeatureToRental}
                      disabled={!newRentalFeature.trim()}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {editRentalForm.features.length > 0 ? (
                      editRentalForm.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          onDelete={() => handleRemoveFeatureFromRental(feature)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавени характеристики. Моля, добавете поне една характеристика.
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Преглед на информацията
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Тип:</strong> {editRentalForm.type}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Модел:</strong> {editRentalForm.model}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Капацитет:</strong> {editRentalForm.capacity}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Цена на ден:</strong> {Number(editRentalForm.pricePerDay).toLocaleString()} лв.
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Минимален период:</strong> {editRentalForm.minPeriod}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Наличност:</strong> {editRentalForm.availability === 'available' ? 'Свободен' : 'Нает'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
          
          {/* Форма за редактиране на снимачна дейност */}
          {tabValue === 3 && currentFilmingProject && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на проекта"
                  fullWidth
                  name="name"
                  value={editFilmingForm.name}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                />
                <TextField
                  label="Клиент"
                  fullWidth
                  name="client"
                  value={editFilmingForm.client}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.client}
                  helperText={formErrors.client}
                  margin="normal"
                />
                <TextField
                  label="Локация"
                  fullWidth
                  name="location"
                  value={editFilmingForm.location}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.location}
                  helperText={formErrors.location}
                  margin="normal"
                />
                <TextField
                  label="Начална дата"
                  type="date"
                  fullWidth
                  name="startDate"
                  value={editFilmingForm.startDate}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Крайна дата"
                  type="date"
                  fullWidth
                  name="endDate"
                  value={editFilmingForm.endDate}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Цена (лв.)"
                  fullWidth
                  name="price"
                  value={editFilmingForm.price}
                  onChange={handleEditFilmingFormChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="filming-status-label">Статус</InputLabel>
                  <Select
                    labelId="filming-status-label"
                    value={editFilmingForm.status}
                    onChange={handleEditFilmingStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Използвано оборудване:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави оборудване"
                      value={newFilmingEquipment}
                      onChange={(e) => setNewFilmingEquipment(e.target.value)}
                      size="small"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddEquipmentToFilming}
                      disabled={!newFilmingEquipment.trim()}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {editFilmingForm.usedEquipment.length > 0 ? (
                      editFilmingForm.usedEquipment.map((equipment, index) => (
                        <Chip
                          key={index}
                          label={equipment}
                          onDelete={() => handleRemoveEquipmentFromFilming(equipment)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавено оборудване. Моля, добавете използваното оборудване.
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Преглед на информацията
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Име на проекта:</strong> {editFilmingForm.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Клиент:</strong> {editFilmingForm.client}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Локация:</strong> {editFilmingForm.location}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Период:</strong> {editFilmingForm.startDate && editFilmingForm.endDate ? 
                          `${new Date(editFilmingForm.startDate).toLocaleDateString()} - ${new Date(editFilmingForm.endDate).toLocaleDateString()}` : 
                          'Не е зададен период'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Цена:</strong> {editFilmingForm.price ? `${Number(editFilmingForm.price).toLocaleString()} лв.` : 'Не е зададена цена'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Статус:</strong> {
                          editFilmingForm.status === 'active' ? 'Активен' :
                          editFilmingForm.status === 'upcoming' ? 'Предстоящ' :
                          editFilmingForm.status === 'completed' ? 'Приключил' : 'Не е зададен'
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAllDialogs}>Отказ</Button>
          {tabValue === 0 && currentTransport && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveTransportEdit}
            >
              Запази промените
            </Button>
          )}
          {tabValue === 1 && currentAttraction && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveAttractionEdit}
            >
              Запази промените
            </Button>
          )}
          {tabValue === 2 && currentRental && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveRentalEdit}
            >
              Запази промените
            </Button>
          )}
          {tabValue === 3 && currentFilmingProject && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveFilmingEdit}
            >
              Запази промените
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Диалог за изтриване */}
      <Dialog
        open={openDeleteDialog}
        onClose={closeAllDialogs}
      >
        <DialogTitle>
          Потвърждение за изтриване
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {tabValue === 0 && currentTransport && 
              `Сигурни ли сте, че искате да изтриете специалния превоз "${currentTransport.name}"?`
            }
            {tabValue === 1 && currentAttraction && 
              `Сигурни ли сте, че искате да изтриете атракционното пътуване "${currentAttraction.name}"?`
            }
            {tabValue === 2 && currentRental && 
              `Сигурни ли сте, че искате да изтриете "${currentRental.type} ${currentRental.model}" от списъка за отдаване под наем?`
            }
            {tabValue === 3 && currentFilmingProject && 
              `Сигурни ли сте, че искате да изтриете проекта за снимачна дейност "${currentFilmingProject.name}"?`
            }
          </DialogContentText>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Това действие не може да бъде отменено!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAllDialogs}>Отказ</Button>
          <Button 
            color="error" 
            onClick={handleConfirmDelete}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за добавяне на нов специализиран превоз или атракционно пътуване */}
      <Dialog
        open={openAddDialog}
        onClose={closeAllDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {tabValue === 0 && 'Добавяне на нов специализиран превоз'}
          {tabValue === 1 && 'Добавяне на ново атракционно пътуване'}
          {tabValue === 2 && 'Добавяне на нова единица за отдаване под наем'}
          {tabValue === 3 && 'Добавяне на нов проект за снимачна дейност'}
        </DialogTitle>
        <DialogContent dividers>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на превоза"
                  fullWidth
                  name="name"
                  value={newTransportForm.name}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                  autoFocus
                />
                <TextField
                  label="Клиент"
                  fullWidth
                  name="client"
                  value={newTransportForm.client}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.client}
                  helperText={formErrors.client}
                  margin="normal"
                />
                <TextField
                  label="Маршрут"
                  fullWidth
                  name="route"
                  value={newTransportForm.route}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.route}
                  helperText={formErrors.route}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Начална дата"
                  type="date"
                  fullWidth
                  name="startDate"
                  value={newTransportForm.startDate}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Крайна дата"
                  type="date"
                  fullWidth
                  name="endDate"
                  value={newTransportForm.endDate}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Цена (лв.)"
                  fullWidth
                  name="price"
                  value={newTransportForm.price}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Брой вагони"
                  fullWidth
                  name="wagons"
                  value={newTransportForm.wagons}
                  onChange={handleNewTransportFormChange}
                  error={!!formErrors.wagons}
                  helperText={formErrors.wagons}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="new-transport-status-label">Статус</InputLabel>
                  <Select
                    labelId="new-transport-status-label"
                    value={newTransportForm.status}
                    onChange={handleNewTransportStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на пътуването"
                  fullWidth
                  name="name"
                  value={newAttractionForm.name}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                  autoFocus
                />
                <TextField
                  label="Маршрут"
                  fullWidth
                  name="route"
                  value={newAttractionForm.route}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.route}
                  helperText={formErrors.route}
                  margin="normal"
                />
                <TextField
                  label="Продължителност"
                  fullWidth
                  name="duration"
                  value={newAttractionForm.duration}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.duration}
                  helperText={formErrors.duration}
                  margin="normal"
                />
                <TextField
                  label="Цена на човек (лв.)"
                  fullWidth
                  name="pricePerPerson"
                  value={newAttractionForm.pricePerPerson}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.pricePerPerson}
                  helperText={formErrors.pricePerPerson}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Капацитет (брой пътници)"
                  fullWidth
                  name="capacity"
                  value={newAttractionForm.capacity}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.capacity}
                  helperText={formErrors.capacity}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="new-attraction-status-label">Статус</InputLabel>
                  <Select
                    labelId="new-attraction-status-label"
                    value={newAttractionForm.status}
                    onChange={handleNewAttractionStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Описание"
                  fullWidth
                  name="description"
                  value={newAttractionForm.description}
                  onChange={handleNewAttractionFormChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  margin="normal"
                  multiline
                  rows={5}
                />
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Предстоящи дати:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави дата"
                      type="date"
                      value={newAttractionDateForAdd}
                      onChange={(e) => setNewAttractionDateForAdd(e.target.value)}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddDateToNewAttraction}
                      disabled={!newAttractionDateForAdd}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {newAttractionForm.nextDates.length > 0 ? (
                      newAttractionForm.nextDates.map((date, index) => (
                        <Chip
                          key={index}
                          label={new Date(date).toLocaleDateString()}
                          icon={<CalendarTodayIcon />}
                          onDelete={() => handleRemoveDateFromNewAttraction(date)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавени дати. Моля, добавете поне една дата.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Тип"
                  fullWidth
                  name="type"
                  value={newRentalForm.type}
                  onChange={handleNewRentalFormChange}
                  error={!!formErrors.type}
                  helperText={formErrors.type}
                  margin="normal"
                  autoFocus
                />
                <TextField
                  label="Модел"
                  fullWidth
                  name="model"
                  value={newRentalForm.model}
                  onChange={handleNewRentalFormChange}
                  error={!!formErrors.model}
                  helperText={formErrors.model}
                  margin="normal"
                />
                <TextField
                  label="Капацитет"
                  fullWidth
                  name="capacity"
                  value={newRentalForm.capacity}
                  onChange={handleNewRentalFormChange}
                  error={!!formErrors.capacity}
                  helperText={formErrors.capacity}
                  margin="normal"
                />
                <TextField
                  label="Цена на ден (лв.)"
                  fullWidth
                  name="pricePerDay"
                  value={newRentalForm.pricePerDay}
                  onChange={handleNewRentalFormChange}
                  error={!!formErrors.pricePerDay}
                  helperText={formErrors.pricePerDay}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Минимален период"
                  fullWidth
                  name="minPeriod"
                  value={newRentalForm.minPeriod}
                  onChange={handleNewRentalFormChange}
                  error={!!formErrors.minPeriod}
                  helperText={formErrors.minPeriod}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="new-rental-availability-label">Наличност</InputLabel>
                  <Select
                    labelId="new-rental-availability-label"
                    value={newRentalForm.availability}
                    onChange={handleNewRentalAvailabilityChange}
                    label="Наличност"
                  >
                    <MenuItem value="available">Свободен</MenuItem>
                    <MenuItem value="rented">Нает</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Характеристики:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави характеристика"
                      value={newRentalFeatureForAdd}
                      onChange={(e) => setNewRentalFeatureForAdd(e.target.value)}
                      size="small"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddFeatureToNewRental}
                      disabled={!newRentalFeatureForAdd.trim()}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {newRentalForm.features.length > 0 ? (
                      newRentalForm.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          onDelete={() => handleRemoveFeatureFromNewRental(feature)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавени характеристики. Моля, добавете поне една характеристика.
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Преглед на информацията
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Тип:</strong> {newRentalForm.type || '(не е въведен)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Модел:</strong> {newRentalForm.model || '(не е въведен)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Капацитет:</strong> {newRentalForm.capacity || '(не е въведен)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Цена на ден:</strong> {newRentalForm.pricePerDay ? `${Number(newRentalForm.pricePerDay).toLocaleString()} лв.` : '(не е въведена)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Минимален период:</strong> {newRentalForm.minPeriod || '(не е въведен)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Наличност:</strong> {newRentalForm.availability === 'available' ? 'Свободен' : 'Нает'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Име на проекта"
                  fullWidth
                  name="name"
                  value={newFilmingForm.name}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  margin="normal"
                  autoFocus
                />
                <TextField
                  label="Клиент"
                  fullWidth
                  name="client"
                  value={newFilmingForm.client}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.client}
                  helperText={formErrors.client}
                  margin="normal"
                />
                <TextField
                  label="Локация"
                  fullWidth
                  name="location"
                  value={newFilmingForm.location}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.location}
                  helperText={formErrors.location}
                  margin="normal"
                />
                <TextField
                  label="Начална дата"
                  type="date"
                  fullWidth
                  name="startDate"
                  value={newFilmingForm.startDate}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Крайна дата"
                  type="date"
                  fullWidth
                  name="endDate"
                  value={newFilmingForm.endDate}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Цена (лв.)"
                  fullWidth
                  name="price"
                  value={newFilmingForm.price}
                  onChange={handleNewFilmingFormChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  margin="normal"
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="new-filming-status-label">Статус</InputLabel>
                  <Select
                    labelId="new-filming-status-label"
                    value={newFilmingForm.status}
                    onChange={handleNewFilmingStatusChange}
                    label="Статус"
                  >
                    <MenuItem value="active">Активен</MenuItem>
                    <MenuItem value="upcoming">Предстоящ</MenuItem>
                    <MenuItem value="completed">Приключил</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Използвано оборудване:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <TextField
                      label="Добави оборудване"
                      value={newFilmingEquipmentForAdd}
                      onChange={(e) => setNewFilmingEquipmentForAdd(e.target.value)}
                      size="small"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={handleAddEquipmentToNewFilming}
                      disabled={!newFilmingEquipmentForAdd.trim()}
                    >
                      Добави
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {newFilmingForm.usedEquipment.length > 0 ? (
                      newFilmingForm.usedEquipment.map((equipment, index) => (
                        <Chip
                          key={index}
                          label={equipment}
                          onDelete={() => handleRemoveEquipmentFromNewFilming(equipment)}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Няма добавено оборудване. Моля, добавете използваното оборудване.
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Преглед на информацията
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Име на проекта:</strong> {newFilmingForm.name || '(не е въведено)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Клиент:</strong> {newFilmingForm.client || '(не е въведен)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Локация:</strong> {newFilmingForm.location || '(не е въведена)'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Период:</strong> {newFilmingForm.startDate && newFilmingForm.endDate ? 
                          `${new Date(newFilmingForm.startDate).toLocaleDateString()} - ${new Date(newFilmingForm.endDate).toLocaleDateString()}` : 
                          'Не е зададен период'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Цена:</strong> {newFilmingForm.price ? `${Number(newFilmingForm.price).toLocaleString()} лв.` : 'Не е зададена цена'}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Статус:</strong> {
                          newFilmingForm.status === 'active' ? 'Активен' :
                          newFilmingForm.status === 'upcoming' ? 'Предстоящ' :
                          newFilmingForm.status === 'completed' ? 'Приключил' : 'Не е зададен'
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAllDialogs}>Отказ</Button>
          {tabValue === 0 && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleAddNewTransport}
            >
              Добави
            </Button>
          )}
          {tabValue === 1 && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleAddNewAttraction}
            >
              Добави
            </Button>
          )}
          {tabValue === 2 && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleAddNewRental}
            >
              Добави
            </Button>
          )}
          {tabValue === 3 && (
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleAddNewFilming}
            >
              Добави
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Snackbar за съобщения */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={notificationType}
          variant="filled"
          sx={{ 
            width: '100%', 
            minWidth: '300px',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,0,0,0.1)',
            '& .MuiAlert-icon': {
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px'
            },
            '& .MuiAlert-message': {
              fontSize: '14px',
              fontWeight: 500
            }
          }}
          iconMapping={{
            success: <CheckCircleOutlineIcon />,
            error: <ErrorOutlineIcon />,
            warning: <InfoIcon />,
            info: <InfoIcon />
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SpecialServicesPage; 