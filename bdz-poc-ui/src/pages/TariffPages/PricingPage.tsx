import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tabs,
  Tab,
  Autocomplete,
  Switch,
  FormControlLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CalculateIcon from '@mui/icons-material/Calculate';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import InfoIcon from '@mui/icons-material/Info';
import { bg } from 'date-fns/locale';

// Dummy data
const mockStations = [
  { id: 1, name: 'София' },
  { id: 2, name: 'Пловдив' },
  { id: 3, name: 'Варна' },
  { id: 4, name: 'Бургас' },
  { id: 5, name: 'Русе' },
  { id: 6, name: 'Стара Загора' },
  { id: 7, name: 'Плевен' },
  { id: 8, name: 'Благоевград' },
  { id: 9, name: 'Монтана' },
  { id: 10, name: 'Ловеч' }
];

// Интерфейс за намаление
interface Discount {
  id: number;
  name: string;
  percent: number;
}

const mockDiscountTypes: Discount[] = [
  { id: 1, name: 'Ученически', percent: 50 },
  { id: 2, name: 'Пенсионерски', percent: 35 },
  { id: 3, name: 'Детски (до 7 г.)', percent: 100 },
  { id: 4, name: 'Детски (7-10 г.)', percent: 50 },
  { id: 5, name: 'Студентски', percent: 25 },
  { id: 6, name: 'Инвалиди', percent: 75 },
  { id: 7, name: 'Групово (над 10 човека)', percent: 30 },
  { id: 8, name: 'Ранно закупуване (14+ дни)', percent: 15 }
];

// Интерфейс за ценово правило
interface PriceRule {
  id: number;
  name: string;
  basePrice: number;
  zoneType: string;
  notes: string;
}

const mockPriceRules: PriceRule[] = [
  { id: 1, name: 'Градски превози - София', basePrice: 2.00, zoneType: 'Вътрешноградски', notes: 'Базова цена за градски превози в София' },
  { id: 2, name: 'Градски превози - Други', basePrice: 1.50, zoneType: 'Вътрешноградски', notes: 'Базова цена за градски превози в други градове' },
  { id: 3, name: 'Междуселищни - до 50 км', basePrice: 0.15, zoneType: 'Междуселищни', notes: 'Цена на километър за разстояния до 50 км' },
  { id: 4, name: 'Междуселищни - 50-100 км', basePrice: 0.12, zoneType: 'Междуселищни', notes: 'Цена на километър за разстояния 50-100 км' },
  { id: 5, name: 'Междуселищни - над 100 км', basePrice: 0.10, zoneType: 'Междуселищни', notes: 'Цена на километър за разстояния над 100 км' },
  { id: 6, name: 'Родопска теснолинейка', basePrice: 15.00, zoneType: 'Специални маршрути', notes: 'Фиксирана цена за атракционно пътуване' },
  { id: 7, name: 'Търговска оферта - групи', basePrice: 0.08, zoneType: 'Търговски оферти', notes: 'Цена на километър за групови пътувания' },
  { id: 8, name: 'Деца до 7 години', basePrice: 0.00, zoneType: 'Безплатни и намалени', notes: 'Безплатен превоз за деца до 7 години' },
  { id: 9, name: 'Ветерани от войните', basePrice: 0.00, zoneType: 'Безплатни и намалени', notes: 'Безплатен превоз за ветерани от войните' },
  { id: 10, name: 'Лица с увреждания', basePrice: 0.00, zoneType: 'Безплатни и намалени', notes: 'Безплатен превоз за лица с трайни увреждания' },
  { id: 11, name: 'Ръчен багаж - малък', basePrice: 0.00, zoneType: 'Превоз на ръчен багаж', notes: 'Безплатен превоз на малък ръчен багаж (до 30x40x60 см)' },
  { id: 12, name: 'Ръчен багаж - среден', basePrice: 2.00, zoneType: 'Превоз на ръчен багаж', notes: 'Превоз на среден ръчен багаж (до 50x60x80 см)' }
];

// Интерфейс за допълнителна услуга
interface AdditionalService {
  id: number;
  name: string;
  price: number;
  description: string;
}

const mockAdditionalServices: AdditionalService[] = [
  { id: 1, name: 'Резервация', price: 2.00, description: 'Запазване на конкретно място' },
  { id: 2, name: 'Голям багаж', price: 5.00, description: 'Багаж над 50x40x30 см' },
  { id: 3, name: 'Превоз на велосипед', price: 3.00, description: 'Транспорт на велосипед в специален вагон' },
  { id: 4, name: 'Превоз на домашен любимец', price: 4.00, description: 'Транспорт на домашен любимец (с контейнер)' },
  { id: 5, name: 'Промяна на резервация', price: 1.50, description: 'Такса за промяна на съществуваща резервация' }
];

const mockZoneTypes = [
  'Вътрешноградски',
  'Междуселищни',
  'Специални маршрути',
  'Търговски оферти',
  'Безплатни и намалени',
  'Превоз на ръчен багаж'
];

// Интерфейс за промоционална тарифа
interface Promotion {
  id: number;
  name: string;
  discountPercent: number;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  type: 'seasonal' | 'campaign' | 'regional';
  regions?: string[];
  description: string;
}

const mockPromotions: Promotion[] = [
  { 
    id: 1, 
    name: 'Лятна промоция', 
    discountPercent: 20, 
    startDate: new Date(2023, 5, 1), 
    endDate: new Date(2023, 7, 31), 
    isActive: true, 
    type: 'seasonal',
    description: 'Лятна отстъпка за всички направления през юни-август'
  },
  { 
    id: 2, 
    name: 'Великденска промоция', 
    discountPercent: 15, 
    startDate: new Date(2023, 3, 10), 
    endDate: new Date(2023, 3, 20), 
    isActive: false, 
    type: 'campaign',
    description: 'Специална отстъпка по време на Великденските празници'
  },
  { 
    id: 3, 
    name: 'Намаление за Родопския регион', 
    discountPercent: 30, 
    startDate: null, 
    endDate: null, 
    isActive: true, 
    type: 'regional',
    regions: ['Смолян', 'Пловдив', 'Пазарджик', 'Кърджали'],
    description: 'Регионално намаление за пътувания в Родопите'
  },
  { 
    id: 4, 
    name: 'Черноморско намаление', 
    discountPercent: 25, 
    startDate: new Date(2023, 4, 1), 
    endDate: new Date(2023, 8, 30), 
    isActive: true, 
    type: 'regional',
    regions: ['Бургас', 'Варна'],
    description: 'Отстъпка за пътуване до морски дестинации през лятото'
  }
];

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

const PricingPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  
  // Състояние за управление на диалога за ценови правила
  const [priceRuleDialogOpen, setPriceRuleDialogOpen] = useState(false);
  const [currentPriceRule, setCurrentPriceRule] = useState<PriceRule | null>(null);
  const [priceRules, setPriceRules] = useState(mockPriceRules);
  
  // Състояние за управление на формата за ценово правило
  const [priceRuleForm, setPriceRuleForm] = useState<PriceRule>({
    id: 0,
    name: '',
    basePrice: 0,
    zoneType: 'Вътрешноградски',
    notes: ''
  });

  const [pricingData, setPricingData] = useState({
    fromStation: null,
    toStation: null,
    passengerType: '',
    passengerCount: 1,
    travelClass: '2',
    discountType: '',
    additionalServices: [] as number[],
    roundTrip: false,
    isAdvancePurchase: false,
    // Добавяме нови полета за липсващите функционалности
    tripCount: 1,                   // Брой пътувания
    clientGroup: '',                // Тарифи, ограничени до определени групи клиенти
    seatReservation: false,         // Резервация на място
    ticketChangeOptions: '',        // Опции за промяна на билет
    ticketCancellationOptions: ''   // Опции за анулиране на билет
  });

  // Състояние за управление на диалога за намаления
  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [discounts, setDiscounts] = useState(mockDiscountTypes);
  
  // Състояние за управление на формата за намаление
  const [discountForm, setDiscountForm] = useState<Discount>({
    id: 0,
    name: '',
    percent: 0
  });

  // Състояние за управление на диалога за допълнителни услуги
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<AdditionalService | null>(null);
  const [services, setServices] = useState(mockAdditionalServices);
  
  // Състояние за управление на формата за допълнителна услуга
  const [serviceForm, setServiceForm] = useState<AdditionalService>({
    id: 0,
    name: '',
    price: 0,
    description: ''
  });

  // Състояние за управление на диалога за промоции
  const [promotionDialogOpen, setPromotionDialogOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);
  const [promotions, setPromotions] = useState(mockPromotions);
    
  // Състояние за управление на формата за промоция  
  const [promotionForm, setPromotionForm] = useState<Promotion>({    
    id: 0,    
    name: '',    
    discountPercent: 0,    
    startDate: null,    
    endDate: null,    
    isActive: false,    
    type: 'seasonal',    
    regions: [],    
    description: ''  
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePricingChange = (field: string, value: any) => {
    setPricingData({
      ...pricingData,
      [field]: value
    });
  };

  const calculatePrice = () => {
    // Тук би имало същинската логика за изчисляване на цена
    // Това е опростен пример
    
    // Базова цена (опростено - просто фиктивна стойност)
    let basePrice = 10.00;
    
    // Клас на пътуване
    if (pricingData.travelClass === '1') {
      basePrice *= 1.5; // 50% надценка за първа класа
    }
    
    // Брой пътници
    basePrice *= pricingData.passengerCount;
    
    // Добавяме цена за брой пътувания
    basePrice *= pricingData.tripCount;
    
    setCalcResult(basePrice);
    
    // Намаления
    let discount = 0;
    if (pricingData.discountType) {
      const selectedDiscount = discounts.find(d => d.id.toString() === pricingData.discountType);
      if (selectedDiscount) {
        discount = (selectedDiscount.percent / 100) * basePrice;
      }
    }
    
    // Прилагане на промоционални тарифи
    const currentDate = new Date();
    let promotionalDiscount = 0;
    
    // Намираме приложимите промоции
    const applicablePromotions = promotions.filter(promotion => {
      // Проверяваме само активни промоции
      if (!promotion.isActive) return false;
      
      // Проверка на дата (ако е зададена)
      if (promotion.startDate && promotion.endDate) {
        if (currentDate < promotion.startDate || currentDate > promotion.endDate) {
          return false;
        }
      }
      
      // Проверка на регион (за регионални промоции)
      if (promotion.type === 'regional' && promotion.regions && promotion.regions.length > 0) {
        const fromStation = pricingData.fromStation as any;
        const toStation = pricingData.toStation as any;
        
        // Проверяваме дали някоя от гарите е в списъка с региони за промоцията
        if (!fromStation || !toStation) return false;
        
        const fromStationInRegion = promotion.regions.some(region => 
          fromStation.name.includes(region)
        );
        
        const toStationInRegion = promotion.regions.some(region => 
          toStation.name.includes(region)
        );
        
        if (!fromStationInRegion && !toStationInRegion) {
          return false;
        }
      }
      
      return true;
    });
    
    // Прилагаме промоцията с най-голям процент отстъпка (ако има такава)
    if (applicablePromotions.length > 0) {
      const bestPromotion = applicablePromotions.reduce((prev, current) => 
        (prev.discountPercent > current.discountPercent) ? prev : current
      );
      
      promotionalDiscount = (bestPromotion.discountPercent / 100) * basePrice;
    }
    
    // Общо намаление (взимаме по-голямото от двете)
    const totalDiscount = Math.max(discount, promotionalDiscount);
    
    setDiscountedPrice(basePrice - totalDiscount);
    
    // Допълнителни услуги
    let additionalServicesCost = 0;
    if (pricingData.additionalServices.length > 0) {
      pricingData.additionalServices.forEach(serviceId => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          additionalServicesCost += service.price;
        }
      });
    }
    
    // Добавяме цена за резервация на място
    if (pricingData.seatReservation) {
      additionalServicesCost += 2.00 * pricingData.passengerCount; // 2 лв. на човек
    }
    
    // Добавяме цена за промяна на билет
    if (pricingData.ticketChangeOptions === 'standard') {
      additionalServicesCost += 1.50;
    } else if (pricingData.ticketChangeOptions === 'flexible') {
      additionalServicesCost += 3.00;
    }
    
    // Добавяме цена за анулиране на билет
    if (pricingData.ticketCancellationOptions === 'partial') {
      additionalServicesCost += 2.00;
    } else if (pricingData.ticketCancellationOptions === 'full') {
      additionalServicesCost += 4.00;
    }
    
    // Двупосочно пътуване
    if (pricingData.roundTrip) {
      additionalServicesCost += (basePrice - totalDiscount) * 0.9; // 10% отстъпка за обратен билет
    }
    
    // Предварително закупуване
    let finalPrice = basePrice - totalDiscount + additionalServicesCost;
    if (pricingData.isAdvancePurchase) {
      finalPrice *= 0.9; // 10% отстъпка за предварително закупуване
    }
    
    setTotalPrice(finalPrice);
  };

  // Обработчици за диалога за ценови правила
  const handleOpenPriceRuleDialog = (rule: PriceRule | null = null) => {
    if (rule) {
      setCurrentPriceRule(rule);
      setPriceRuleForm({
        id: rule.id,
        name: rule.name,
        basePrice: rule.basePrice,
        zoneType: rule.zoneType,
        notes: rule.notes
      });
    } else {
      setCurrentPriceRule(null);
      setPriceRuleForm({
        id: Math.max(0, ...priceRules.map(r => r.id)) + 1,
        name: '',
        basePrice: 0,
        zoneType: 'Вътрешноградски',
        notes: ''
      });
    }
    setPriceRuleDialogOpen(true);
  };
  
  const handleClosePriceRuleDialog = () => {
    setPriceRuleDialogOpen(false);
  };
  
  const handlePriceRuleFormChange = (field: string, value: any) => {
    setPriceRuleForm({
      ...priceRuleForm,
      [field]: value
    });
  };
  
  const handleSavePriceRule = () => {
    if (currentPriceRule) {
      // Редактиране на съществуващо правило
      setPriceRules(priceRules.map(rule => 
        rule.id === priceRuleForm.id ? priceRuleForm : rule
      ));
    } else {
      // Добавяне на ново правило
      setPriceRules([...priceRules, priceRuleForm]);
    }
    setPriceRuleDialogOpen(false);
  };

  const handleDeletePriceRule = (ruleId: number) => {
    // Изтриване на правило
    setPriceRules(priceRules.filter(rule => rule.id !== ruleId));
  };

  // Обработчици за диалога за намаления
  const handleOpenDiscountDialog = (discount: Discount | null = null) => {
    if (discount) {
      setCurrentDiscount(discount);
      setDiscountForm({
        id: discount.id,
        name: discount.name,
        percent: discount.percent
      });
    } else {
      setCurrentDiscount(null);
      setDiscountForm({
        id: Math.max(0, ...discounts.map(d => d.id)) + 1,
        name: '',
        percent: 0
      });
    }
    setDiscountDialogOpen(true);
  };
  
  const handleCloseDiscountDialog = () => {
    setDiscountDialogOpen(false);
  };
  
  const handleDiscountFormChange = (field: string, value: any) => {
    setDiscountForm({
      ...discountForm,
      [field]: value
    });
  };
  
  const handleSaveDiscount = () => {
    if (currentDiscount) {
      // Редактиране на съществуващо намаление
      setDiscounts(discounts.map(discount => 
        discount.id === discountForm.id ? discountForm : discount
      ));
    } else {
      // Добавяне на ново намаление
      setDiscounts([...discounts, discountForm]);
    }
    setDiscountDialogOpen(false);
  };
  
  const handleDeleteDiscount = (discountId: number) => {
    // Изтриване на намаление
    setDiscounts(discounts.filter(discount => discount.id !== discountId));
  };

  // Обработчици за диалога за допълнителни услуги
  const handleOpenServiceDialog = (service: AdditionalService | null = null) => {
    if (service) {
      setCurrentService(service);
      setServiceForm({
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description
      });
    } else {
      setCurrentService(null);
      setServiceForm({
        id: Math.max(0, ...services.map(s => s.id)) + 1,
        name: '',
        price: 0,
        description: ''
      });
    }
    setServiceDialogOpen(true);
  };
  
  const handleCloseServiceDialog = () => {
    setServiceDialogOpen(false);
  };
  
  const handleServiceFormChange = (field: string, value: any) => {
    setServiceForm({
      ...serviceForm,
      [field]: value
    });
  };
  
  const handleSaveService = () => {
    if (currentService) {
      // Редактиране на съществуваща услуга
      setServices(services.map(service => 
        service.id === serviceForm.id ? serviceForm : service
      ));
    } else {
      // Добавяне на нова услуга
      setServices([...services, serviceForm]);
    }
    setServiceDialogOpen(false);
  };
  
  const handleDeleteService = (serviceId: number) => {
    // Изтриване на услуга
    setServices(services.filter(service => service.id !== serviceId));
  };

  // Обработчици за диалога за промоции
  const handleOpenPromotionDialog = (promotion: Promotion | null = null) => {
    if (promotion) {
      setCurrentPromotion(promotion);
      setPromotionForm({
        id: promotion.id,
        name: promotion.name,
        discountPercent: promotion.discountPercent,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        isActive: promotion.isActive,
        type: promotion.type,
        regions: promotion.regions || [],
        description: promotion.description
      });
    } else {
      setCurrentPromotion(null);
      setPromotionForm({
        id: Math.max(0, ...promotions.map(p => p.id)) + 1,
        name: '',
        discountPercent: 0,
        startDate: null,
        endDate: null,
        isActive: false,
        type: 'seasonal',
        regions: [],
        description: ''
      });
    }
    setPromotionDialogOpen(true);
  };
  
  const handleClosePromotionDialog = () => {
    setPromotionDialogOpen(false);
  };
  
  const handlePromotionFormChange = (field: string, value: any) => {
    setPromotionForm({
      ...promotionForm,
      [field]: value
    });
  };
  
  const handleSavePromotion = () => {
    if (currentPromotion) {
      // Редактиране на съществуваща промоция
      setPromotions(promotions.map(promotion => 
        promotion.id === promotionForm.id ? promotionForm : promotion
      ));
    } else {
      // Добавяне на нова промоция
      setPromotions([...promotions, promotionForm]);
    }
    setPromotionDialogOpen(false);
  };
  
  const handleDeletePromotion = (promotionId: number) => {
    // Изтриване на промоция
    setPromotions(promotions.filter(promotion => promotion.id !== promotionId));
  };
  
      const getPromotionTypeLabel = (type: string): string => {    switch (type) {      case 'seasonal': return 'Сезонна';      case 'campaign': return 'Кампанийна';      case 'regional': return 'Регионална';      default: return 'Неизвестна';    }  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ценообразуване
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Управление на цени за различни зони и изчисляване на цени на билети според множество параметри
        </Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="pricing tabs">
          <Tab label="Калкулатор на цени" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Цени по зони" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Видове намаления" id="tab-2" aria-controls="tabpanel-2" />
          <Tab label="Допълнителни услуги" id="tab-3" aria-controls="tabpanel-3" />
          <Tab label="Промоционални тарифи" id="tab-4" aria-controls="tabpanel-4" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Калкулатор на цени на билети
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <MapIcon color="primary" sx={{ mr: 1 }} />
                  Маршрут
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="from-station"
                      options={mockStations}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Начална гара" required />}
                      onChange={(_, value) => handlePricingChange('fromStation', value)}
                      isOptionEqualToValue={(option, value) => option.id === value?.id}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Autocomplete
                      id="to-station"
                      options={mockStations}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Крайна гара" required />}
                      onChange={(_, value) => handlePricingChange('toStation', value)}
                      isOptionEqualToValue={(option, value) => option.id === value?.id}
                    />
                  </Grid>
                  
                  
                  
                  {/* Добавяме поле за брой пътувания */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="trip-count"
                      label="Брой пътувания"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={pricingData.tripCount}
                      onChange={(e) => handlePricingChange('tripCount', parseInt(e.target.value) || 1)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pricingData.roundTrip}
                          onChange={(e) => handlePricingChange('roundTrip', e.target.checked)}
                          name="roundTrip"
                        />
                      }
                      label="Двупосочно пътуване"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  Информация за пътника
                </Typography>
                
                <Grid container spacing={2}>
                  {/* Добавяме поле за тарифи, ограничени до определени групи клиенти */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="client-group-label">Тарифна група</InputLabel>
                      <Select
                        labelId="client-group-label"
                        id="client-group"
                        value={pricingData.clientGroup}
                        label="Тарифна група"
                        onChange={(e) => handlePricingChange('clientGroup', e.target.value)}
                      >
                        <MenuItem value="regular">Редовни пътници</MenuItem>
                        <MenuItem value="student">Учащи (студенти/ученици)</MenuItem>
                        <MenuItem value="senior">Пенсионери</MenuItem>
                        <MenuItem value="family">Семейства с деца</MenuItem>
                        <MenuItem value="corporate">Корпоративни клиенти</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="passenger-type-label">Възрастова група</InputLabel>
                      <Select
                        labelId="passenger-type-label"
                        id="passenger-type"
                        value={pricingData.passengerType}
                        label="Възрастова група"
                        onChange={(e) => handlePricingChange('passengerType', e.target.value)}
                      >
                        <MenuItem value="adult">Възрастен</MenuItem>
                        <MenuItem value="child">Дете (до 7 г.)</MenuItem>
                        <MenuItem value="child7to10">Дете (7-10 г.)</MenuItem>
                        <MenuItem value="student">Учащ</MenuItem>
                        <MenuItem value="senior">Пенсионер</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="passenger-count"
                      label="Брой пътници"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={pricingData.passengerCount}
                      onChange={(e) => handlePricingChange('passengerCount', parseInt(e.target.value) || 1)}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="travel-class-label">Клас</InputLabel>
                      <Select
                        labelId="travel-class-label"
                        id="travel-class"
                        value={pricingData.travelClass}
                        label="Клас"
                        onChange={(e) => handlePricingChange('travelClass', e.target.value)}
                      >
                        <MenuItem value="1">Първа класа</MenuItem>
                        <MenuItem value="2">Втора класа</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Добавяме поле за резервация на място */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pricingData.seatReservation}
                          onChange={(e) => handlePricingChange('seatReservation', e.target.checked)}
                          name="seatReservation"
                        />
                      }
                      label="Резервация на място (+2.00 лв.)"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="discount-type-label">Право на намаление</InputLabel>
                      <Select
                        labelId="discount-type-label"
                        id="discount-type"
                        value={pricingData.discountType}
                        label="Право на намаление"
                        onChange={(e) => handlePricingChange('discountType', e.target.value)}
                      >
                        <MenuItem value="">Без намаление</MenuItem>
                        {discounts.map((discount) => (
                          <MenuItem key={discount.id} value={discount.id.toString()}>
                            {discount.name} ({discount.percent}%)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsRailwayIcon color="primary" sx={{ mr: 1 }} />
                  Допълнителни услуги
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="additional-services-label">Допълнителни услуги</InputLabel>
                      <Select
                        labelId="additional-services-label"
                        id="additional-services"
                        multiple
                        value={pricingData.additionalServices}
                        label="Допълнителни услуги"
                        onChange={(e) => handlePricingChange('additionalServices', e.target.value)}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as number[]).map((value) => {
                              const service = services.find(s => s.id === value);
                              return (
                                <Chip key={value} label={service?.name} />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {services.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name} (+{service.price.toFixed(2)} лв.)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pricingData.isAdvancePurchase}
                          onChange={(e) => handlePricingChange('isAdvancePurchase', e.target.checked)}
                          name="isAdvancePurchase"
                        />
                      }
                      label="Предварително закупуване (14+ дни, -10%)"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            {/* Добавяме нова секция за опции за промяна и анулиране */}
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1, p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon color="primary" sx={{ mr: 1 }} />
                  Опции за промяна и анулиране
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="ticket-change-label">Опция за промяна на билет</InputLabel>
                      <Select
                        labelId="ticket-change-label"
                        id="ticket-change"
                        value={pricingData.ticketChangeOptions}
                        label="Опция за промяна на билет"
                        onChange={(e) => handlePricingChange('ticketChangeOptions', e.target.value)}
                      >
                        <MenuItem value="">Без опция за промяна</MenuItem>
                        <MenuItem value="standard">Стандартна (+1.50 лв.)</MenuItem>
                        <MenuItem value="flexible">Гъвкава (+3.00 лв.)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="ticket-cancellation-label">Опция за анулиране</InputLabel>
                      <Select
                        labelId="ticket-cancellation-label"
                        id="ticket-cancellation"
                        value={pricingData.ticketCancellationOptions}
                        label="Опция за анулиране"
                        onChange={(e) => handlePricingChange('ticketCancellationOptions', e.target.value)}
                      >
                        <MenuItem value="">Без опция за анулиране</MenuItem>
                        <MenuItem value="partial">Частично възстановяване (+2.00 лв.)</MenuItem>
                        <MenuItem value="full">Пълно възстановяване (+4.00 лв.)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CalculateIcon />}
                size="large"
                onClick={calculatePrice}
                fullWidth
                disabled={!pricingData.fromStation || !pricingData.toStation}
              >
                Изчисли цена
              </Button>
            </Grid>
            
            {totalPrice !== null && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2, backgroundColor: '#f9f9f9' }}>
                  <Typography variant="h5" gutterBottom align="center">
                    Калкулирана цена
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          Базова цена:
                        </Typography>
                        <Typography variant="h6">
                          {calcResult?.toFixed(2)} лв.
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          След отстъпки:
                        </Typography>
                        <Typography variant="h6">
                          {discountedPrice?.toFixed(2)} лв.
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          Крайна цена:
                        </Typography>
                        <Typography variant="h5" color="primary" fontWeight="bold">
                          {totalPrice.toFixed(2)} лв.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Цени по зони
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenPriceRuleDialog()}
            >
              Добави цена за зона
            </Button>
          </Box>
          
          
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име на зона</TableCell>
                  <TableCell>Тип зона</TableCell>
                  <TableCell width="150px">Базова цена</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={rule.zoneType}
                        size="small"
                        color={
                          rule.zoneType === 'Вътрешноградски' ? 'primary' :
                          rule.zoneType === 'Междуселищни' ? 'secondary' :
                          rule.zoneType === 'Специални маршрути' ? 'info' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{rule.basePrice.toFixed(2)} лв.</TableCell>
                    <TableCell>{rule.notes}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenPriceRuleDialog(rule)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeletePriceRule(rule.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Видове намаления
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDiscountDialog()}
            >
              Добави намаление
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име на намаление</TableCell>
                  <TableCell>Процент намаление</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>{discount.percent}%</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenDiscountDialog(discount)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteDiscount(discount.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Допълнителни услуги
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenServiceDialog()}
            >
              Добави услуга
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име на услуга</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.price.toFixed(2)} лв.</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenServiceDialog(service)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={4}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Промоционални тарифи
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenPromotionDialog()}
            >
              Добави промоция
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име на промоция</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Отстъпка</TableCell>
                  <TableCell>Период</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>
                      {promotion.name}
                      <Typography variant="caption" display="block" color="text.secondary">
                        {promotion.description}
                      </Typography>
                      {promotion.type === 'regional' && promotion.regions && promotion.regions.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          {promotion.regions.map(region => (
                            <Chip 
                              key={region} 
                              label={region} 
                              size="small" 
                              color="info" 
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getPromotionTypeLabel(promotion.type)}
                        size="small"
                        color={
                          promotion.type === 'seasonal' ? 'secondary' :
                          promotion.type === 'campaign' ? 'primary' :
                          promotion.type === 'regional' ? 'success' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{promotion.discountPercent}%</TableCell>
                    <TableCell>
                      {promotion.startDate && promotion.endDate ? (
                        `${new Date(promotion.startDate).toLocaleDateString('bg-BG')} - ${new Date(promotion.endDate).toLocaleDateString('bg-BG')}`
                      ) : (
                        <span>Неограничен период</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={promotion.isActive ? 'Активна' : 'Неактивна'}
                        size="small"
                        color={promotion.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenPromotionDialog(promotion)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeletePromotion(promotion.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      {/* Диалог за създаване/редактиране на ценово правило */}
      <Dialog 
        open={priceRuleDialogOpen} 
        onClose={handleClosePriceRuleDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentPriceRule ? 'Редактиране на цена за зона' : 'Добавяне на нова цена за зона'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Име на зона"
                value={priceRuleForm.name}
                onChange={(e) => handlePriceRuleFormChange('name', e.target.value)}
                helperText="Въведете описателно име за зоната"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="zone-type-label">Тип зона</InputLabel>
                <Select
                  labelId="zone-type-label"
                  id="zone-type"
                  value={priceRuleForm.zoneType}
                  label="Тип зона"
                  onChange={(e) => handlePriceRuleFormChange('zoneType', e.target.value)}
                >
                  {mockZoneTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Базова цена"
                type="number"
                inputProps={{
                  step: 0.01,
                  min: 0
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">лв.</InputAdornment>,
                }}
                value={priceRuleForm.basePrice}
                onChange={(e) => handlePriceRuleFormChange('basePrice', parseFloat(e.target.value) || 0)}
                helperText="Въведете базовата цена за тази зона (в лева)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Описание"
                value={priceRuleForm.notes}
                onChange={(e) => handlePriceRuleFormChange('notes', e.target.value)}
                helperText="Добавете допълнителна информация за тази ценова зона"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePriceRuleDialog}>Откажи</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSavePriceRule}
            startIcon={<SaveIcon />}
            disabled={!priceRuleForm.name || priceRuleForm.basePrice <= 0}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за създаване/редактиране на намаление */}
      <Dialog 
        open={discountDialogOpen} 
        onClose={handleCloseDiscountDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentDiscount ? 'Редактиране на намаление' : 'Добавяне на ново намаление'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Име на намаление"
                value={discountForm.name}
                onChange={(e) => handleDiscountFormChange('name', e.target.value)}
                helperText="Въведете описателно име за намалението"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Процент намаление"
                type="number"
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={discountForm.percent}
                onChange={(e) => handleDiscountFormChange('percent', parseInt(e.target.value) || 0)}
                helperText="Въведете процент намаление (0-100)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDiscountDialog}>Откажи</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveDiscount}
            startIcon={<SaveIcon />}
            disabled={!discountForm.name || discountForm.percent <= 0 || discountForm.percent > 100}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за създаване/редактиране на допълнителна услуга */}
      <Dialog 
        open={serviceDialogOpen} 
        onClose={handleCloseServiceDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentService ? 'Редактиране на допълнителна услуга' : 'Добавяне на нова допълнителна услуга'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Име на услуга"
                value={serviceForm.name}
                onChange={(e) => handleServiceFormChange('name', e.target.value)}
                helperText="Въведете описателно име за услугата"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Цена"
                type="number"
                inputProps={{
                  step: 0.01,
                  min: 0
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">лв.</InputAdornment>,
                }}
                value={serviceForm.price}
                onChange={(e) => handleServiceFormChange('price', parseFloat(e.target.value) || 0)}
                helperText="Въведете цена на услугата (в лева)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Описание"
                value={serviceForm.description}
                onChange={(e) => handleServiceFormChange('description', e.target.value)}
                helperText="Добавете кратко описание на услугата"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseServiceDialog}>Откажи</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveService}
            startIcon={<SaveIcon />}
            disabled={!serviceForm.name || serviceForm.price <= 0}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за създаване/редактиране на промоция */}
      <Dialog 
        open={promotionDialogOpen} 
        onClose={handleClosePromotionDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentPromotion ? 'Редактиране на промоция' : 'Добавяне на нова промоция'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Име на промоцията"
                value={promotionForm.name}
                onChange={(e) => handlePromotionFormChange('name', e.target.value)}
                helperText="Въведете описателно име за промоцията"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="promotion-type-label">Тип промоция</InputLabel>
                <Select
                  labelId="promotion-type-label"
                  id="promotion-type"
                  value={promotionForm.type}
                  label="Тип промоция"
                  onChange={(e) => handlePromotionFormChange('type', e.target.value)}
                >
                  <MenuItem value="seasonal">Сезонна</MenuItem>
                  <MenuItem value="campaign">Кампанийна</MenuItem>
                  <MenuItem value="regional">Регионална</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Процент отстъпка"
                type="number"
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={promotionForm.discountPercent}
                onChange={(e) => handlePromotionFormChange('discountPercent', parseInt(e.target.value) || 0)}
                helperText="Въведете процент отстъпка (0-100)"
              />
            </Grid>
            
            {promotionForm.type === 'regional' && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="regions"
                  options={['София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 'Плевен', 'Смолян', 'Пазарджик', 'Кърджали']}
                  value={promotionForm.regions || []}
                  onChange={(_, newValue) => {
                    handlePromotionFormChange('regions', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Региони"
                      placeholder="Добавете региони"
                      helperText="Изберете регионите, за които важи отстъпката"
                    />
                  )}
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Начална дата"
                  value={promotionForm.startDate}
                  onChange={(newValue) => handlePromotionFormChange('startDate', newValue)}
                  slotProps={{
                    textField: { fullWidth: true, helperText: "Оставете празно за неограничен период" }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                <DatePicker
                  label="Крайна дата"
                  value={promotionForm.endDate}
                  onChange={(newValue) => handlePromotionFormChange('endDate', newValue)}
                  slotProps={{
                    textField: { fullWidth: true, helperText: "Оставете празно за неограничен период" }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={promotionForm.isActive}
                    onChange={(e) => handlePromotionFormChange('isActive', e.target.checked)}
                  />
                }
                label="Активна промоция"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание"
                value={promotionForm.description}
                onChange={(e) => handlePromotionFormChange('description', e.target.value)}
                helperText="Добавете допълнително описание на промоцията"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePromotionDialog}>Откажи</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSavePromotion}
            startIcon={<SaveIcon />}
            disabled={!promotionForm.name || promotionForm.discountPercent <= 0 || promotionForm.discountPercent > 100}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>
      
      
      
      
    </Container>
  );
};

export default PricingPage; 