import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  FormControl,
  InputLabel,
  TableSortLabel,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
  ListItemText,
  TablePagination,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Tooltip as RechartsTooltip,
  TooltipProps,
} from 'recharts';

// Дефиниране на типове за справките
type ReportType = {
  id: string;
  name: string;
  description: string;
};

const reportTypes: ReportType[] = [
  {
    id: 'train_report',
    name: 'Справка по влак',
    description: 'Детайлна справка по влак, включваща маршрут, тип влак, брой пътници и приходи'
  },
  {
    id: 'subscription_report',
    name: 'Справка по Абонаментни карти',
    description: 'Анализ на продажбите на абонаментни карти по тип и период на валидност'
  },
  {
    id: 'passenger_km_report',
    name: 'Справка брой пътници и пътникокилометри',
    description: 'Статистика за броя пътници и изминати пътникокилометри по маршрути'
  },
  {
    id: 'ticket_sales_report',
    name: 'Справка закупени билети',
    description: 'Анализ на продажбите на билети по вид и маршрут'
  },
  {
    id: 'subscription_sales_report',
    name: 'Справка закупени абонаментни карти',
    description: 'Детайлен анализ на продажбите на абонаментни карти'
  }
];

// Константи за данни
const routes = [
  'София-Пловдив',
  'София-Варна',
  'София-Бургас',
  'София-Русе',
  'Пловдив-Бургас',
  'Варна-Бургас'
] as const;

const trainTypes = [
  'Пътнически',
  'Бърз',
  'Експрес',
  'Интерсити'
] as const;

const ticketTypes = [
  'Еднопосочен',
  'Двупосочен',
  'Детски',
  'Пенсионерски',
  'Студентски',
  'Групов'
] as const;

const subscriptionTypes = [
  { type: 'Студентски', price: 100, discount: 0.5 },
  { type: 'Възрастен', price: 200, discount: 0 },
  { type: 'Пенсионерски', price: 150, discount: 0.25 },
  { type: 'Детски', price: 120, discount: 0.5 },
  { type: 'Семеен', price: 350, discount: 0.1 }
] as const;

const validityPeriods = [
  { period: 'Месечен', multiplier: 1 },
  { period: 'Тримесечен', multiplier: 2.7 },
  { period: 'Шестмесечен', multiplier: 5 },
  { period: 'Годишен', multiplier: 9 }
] as const;

const stations = [
  'София',
  'Пловдив',
  'Варна',
  'Бургас',
  'Русе',
  'Стара Загора',
  'Плевен',
  'Благоевград'
] as const;

// Константи за влакове
const trainNumbers = [
  { number: '1234', route: 'София-Пловдив', type: 'Интерсити' },
  { number: '2345', route: 'София-Варна', type: 'Бърз' },
  { number: '3456', route: 'София-Бургас', type: 'Експрес' },
  { number: '4567', route: 'София-Русе', type: 'Пътнически' },
  { number: '5678', route: 'Пловдив-Бургас', type: 'Бърз' },
  { number: '6789', route: 'Варна-Бургас', type: 'Пътнически' },
  { number: '7890', route: 'София-Пловдив', type: 'Експрес' },
  { number: '8901', route: 'София-Варна', type: 'Интерсити' },
  { number: '9012', route: 'София-Бургас', type: 'Бърз' },
  { number: '0123', route: 'София-Русе', type: 'Експрес' }
] as const;

// Типове за константите
type Route = typeof routes[number];
type TrainType = typeof trainTypes[number];
type TicketType = typeof ticketTypes[number];
type Station = typeof stations[number];
type TrainNumber = typeof trainNumbers[number]['number'];
type SubscriptionType = typeof subscriptionTypes[number]['type'];
type ValidityPeriod = typeof validityPeriods[number]['period'];

// Интерфейс за данните
interface ReportData {
  id: string;
  date: string;
  station?: Station;
  category: string;
  income: number;
  expenses: number;
  balance: number;
  trainNumber?: TrainNumber;
  passengers?: number;
  ticketType?: TicketType;
  ticketCount?: number;
  passengerKm?: number;
  route?: Route;
  trainType?: TrainType;
  subscriptionType?: SubscriptionType;
  validityPeriod?: ValidityPeriod;
  subscriptionCount?: number;
}

// Тип за сортиране
type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

// Интерфейс за филтрите
interface ColumnFilters {
  date?: string;
  station?: string;
  trainNumber?: string;
  category?: string;
  ticketType?: string;
  ticketCount?: string;
  passengerKm?: string;
  route?: string;
  trainType?: string;
  subscriptionType?: string;
  validityPeriod?: string;
  subscriptionCount?: string;
  income?: string;
  expenses?: string;
  balance?: string;
  passengers?: string;
}

// Функция за генериране на случайно число
const getRandomNumber = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Функция за генериране на уникални дати за месец
const generateUniqueDatesForMonth = (year: number, month: number, count: number): string[] => {
  const dates: string[] = [];
  const monthUsedDates = new Set<string>();
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Разделяме месеца на равни интервали
  const interval = Math.floor(daysInMonth / count);
  
  // Генерираме дати в различни интервали от месеца
  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let date: string;
    
    do {
      // Генерираме дата в текущия интервал
      const startDay = i * interval + 1;
      const endDay = Math.min((i + 1) * interval, daysInMonth);
      const day = Math.floor(Math.random() * (endDay - startDay + 1)) + startDay;
      
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      
      date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      attempts++;
    } while (monthUsedDates.has(date.split('T')[0]) && attempts < 10);
    
    if (attempts < 10) {
      monthUsedDates.add(date.split('T')[0]);
      dates.push(date);
    }
  }
  
  // Сортираме датите хронологически
  return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
};

// Функция за генериране на примерни данни
const generateMockData = (): ReportData[] => {
  const data: ReportData[] = [];
  const usedKeys = new Set<string>();

  reportTypes.forEach(report => {
    [2024, 2025].forEach(year => {
      const months = year === 2024 ? 12 : 6;
      const multiplier = year === 2025 ? 1.15 : 1;

      for (let month = 1; month <= months; month++) {
        // Генерираме между 8 и 12 записа за всеки месец
        const recordsPerMonth = Math.floor(Math.random() * 5) + 8;
        
        // Генерираме уникални дати, равномерно разпределени през месеца
        const monthDates = generateUniqueDatesForMonth(year, month, recordsPerMonth);
        
        monthDates.forEach((date, index) => {
          switch (report.id) {
            case 'train_report':
              trainNumbers.forEach(train => {
                const uniqueKey = `${date.split('T')[0]}-${train.number}`;
                if (!usedKeys.has(uniqueKey)) {
                  usedKeys.add(uniqueKey);
                  // Генерираме различни данни според типа влак
                  let basePassengers: number;
                  let baseIncome: number;
                  let expenseMultiplier: number;

                  switch (train.type) {
                    case 'Интерсити':
                      basePassengers = getRandomNumber(200, 400);
                      baseIncome = getRandomNumber(40, 60);
                      expenseMultiplier = 0.25; // По-ниски разходи за интерсити влакове
                      break;
                    case 'Бърз':
                      basePassengers = getRandomNumber(150, 300);
                      baseIncome = getRandomNumber(30, 45);
                      expenseMultiplier = 0.3;
                      break;
                    case 'Експрес':
                      basePassengers = getRandomNumber(100, 250);
                      baseIncome = getRandomNumber(25, 35);
                      expenseMultiplier = 0.35;
                      break;
                    case 'Пътнически':
                      basePassengers = getRandomNumber(50, 150);
                      baseIncome = getRandomNumber(15, 25);
                      expenseMultiplier = 0.4;
                      break;
                    default:
                      basePassengers = getRandomNumber(100, 200);
                      baseIncome = getRandomNumber(20, 30);
                      expenseMultiplier = 0.35;
                  }

                  const passengers = Math.round(basePassengers * multiplier);
                  const income = Math.round(passengers * baseIncome * multiplier);
                  const expenses = Math.round(income * expenseMultiplier);
                  
                  data.push({
                    id: `${year}-${month}-${report.id}-${train.number}-${index}`,
                    date: date,
                    trainNumber: train.number,
                    category: 'Влак',
                    route: train.route,
                    trainType: train.type,
                    passengers,
                    passengerKm: Math.round(passengers * getRandomNumber(100, 300)),
                    income,
                    expenses,
                    balance: income - expenses
                  });
                }
              });
              break;

            case 'subscription_report':
              stations.forEach(station => {
                subscriptionTypes.forEach(subType => {
                  validityPeriods.forEach(validity => {
                    const uniqueKey = `${date.split('T')[0]}-${station}-${subType.type}-${validity.period}`;
                    if (!usedKeys.has(uniqueKey)) {
                      usedKeys.add(uniqueKey);
                      const subscriptions = Math.round(getRandomNumber(20, 100) * multiplier);
                      const basePrice = subType.price * validity.multiplier;
                      const discountedPrice = basePrice * (1 - subType.discount);
                      const income = Math.round(subscriptions * discountedPrice);

                      data.push({
                        id: `${year}-${month}-${report.id}-${station}-${subType.type}-${validity.period}-${index}`,
                        date: date,
                        station,
                        category: 'Абонаменти',
                        subscriptionType: subType.type,
                        validityPeriod: validity.period,
                        subscriptionCount: subscriptions,
                        income,
                        expenses: 0,
                        balance: income
                      });
                    }
                  });
                });
              });
              break;

            case 'passenger_km_report':
              routes.forEach(route => {
                const uniqueKey = `${date.split('T')[0]}-${route}`;
                if (!usedKeys.has(uniqueKey)) {
                  usedKeys.add(uniqueKey);
                  const passengers = Math.round(getRandomNumber(1000, 5000) * multiplier);
                  const passengerKm = Math.round(passengers * getRandomNumber(100, 300));
                  const income = Math.round(passengers * getRandomNumber(20, 50) * multiplier);

                  data.push({
                    id: `${year}-${month}-${report.id}-${route}-${index}`,
                    date: date,
                    category: 'Пътникокилометри',
                    route,
                    passengers,
                    passengerKm,
                    income,
                    expenses: 0,
                    balance: income
                  });
                }
              });
              break;

            case 'ticket_sales_report':
              routes.forEach(route => {
                ticketTypes.forEach(ticketType => {
                  const uniqueKey = `${date.split('T')[0]}-${route}-${ticketType}`;
                  if (!usedKeys.has(uniqueKey)) {
                    usedKeys.add(uniqueKey);
                    const ticketCount = Math.round(getRandomNumber(100, 1000) * multiplier);
                    const basePrice = getRandomNumber(20, 50);
                    const income = Math.round(ticketCount * basePrice * multiplier);

                    data.push({
                      id: `${year}-${month}-${report.id}-${route}-${ticketType}-${index}`,
                      date: date,
                      category: 'Билети',
                      route,
                      ticketType,
                      ticketCount,
                      income,
                      expenses: 0,
                      balance: income
                    });
                  }
                });
              });
              break;

            case 'subscription_sales_report':
              stations.forEach(station => {
                subscriptionTypes.forEach(subType => {
                  validityPeriods.forEach(validity => {
                    const uniqueKey = `${date.split('T')[0]}-${station}-${subType.type}-${validity.period}-sales`;
                    if (!usedKeys.has(uniqueKey)) {
                      usedKeys.add(uniqueKey);
                      // Генерираме различни данни от subscription_report
                      const subscriptionCount = Math.round(getRandomNumber(30, 150) * multiplier); // Различен диапазон
                      const basePrice = subType.price * validity.multiplier;
                      const discountedPrice = basePrice * (1 - subType.discount);
                      const income = Math.round(subscriptionCount * discountedPrice);
                      const expenses = Math.round(income * 0.15); // Различен процент разходи
                      const ticketCount = Math.round(subscriptionCount * 0.2); // Допълнителни билети
                      const additionalIncome = Math.round(ticketCount * getRandomNumber(10, 30));

                      data.push({
                        id: `${year}-${month}-${report.id}-${station}-${subType.type}-${validity.period}-${index}`,
                        date: date,
                        station,
                        category: 'Продажби на абонаменти',
                        subscriptionType: subType.type,
                        validityPeriod: validity.period,
                        subscriptionCount,
                        ticketCount,
                        income: income + additionalIncome,
                        expenses,
                        balance: income + additionalIncome - expenses
                      });
                    }
                  });
                });
              });
              break;
          }
        });
      }
    });
  });

  return data;
};

// Генерираме примерните данни
const mockData: ReportData[] = generateMockData();

// Функция за форматиране на стойностите
const formatValue = (value: number) => `${value.toLocaleString('bg-BG')} лв.`;

// Функция за форматиране на датата за показване
const formatDisplayDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('bg-BG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Функция за форматиране на датата за филтриране
const formatFilterDate = (dateStr: string) => {
  return dateStr.split('T')[0];
};

// Функция за премахване на дублирани записи
const removeDuplicateEntries = (data: ReportData[], reportType: string) => {
  const uniqueEntries = new Map<string, ReportData>();
  
  data.forEach(item => {
    let key: string;
    
    // Създаваме уникален ключ в зависимост от типа справка
    switch (reportType) {
      case 'train_report':
        key = `${formatFilterDate(item.date)}-${item.trainNumber}`;
        break;
      case 'subscription_report':
        key = `${formatFilterDate(item.date)}-${item.station}-${item.subscriptionType}-${item.validityPeriod}`;
        break;
      case 'passenger_km_report':
        key = `${formatFilterDate(item.date)}-${item.route}`;
        break;
      case 'ticket_sales_report':
        key = `${formatFilterDate(item.date)}-${item.route}-${item.ticketType}`;
        break;
      case 'subscription_sales_report':
        key = `${formatFilterDate(item.date)}-${item.station}-${item.subscriptionType}-${item.validityPeriod}`;
        break;
      default:
        key = formatFilterDate(item.date);
    }
    
    const existing = uniqueEntries.get(key);
    if (!existing || (item.passengers || 0) > (existing.passengers || 0)) {
      uniqueEntries.set(key, item);
    }
  });
  
  return Array.from(uniqueEntries.values());
};

// Add columns definition before the MarketingReports component
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  width?: number;
  maxWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: number) => string;
  render?: (row: ReportData) => React.ReactNode;
  showIf?: (report: ReportType) => boolean;
}

const columns: Column[] = [
  {
    id: 'date',
    label: 'Дата и час',
    minWidth: 120,
    render: (row: ReportData) => formatDisplayDate(row.date)
  },
  {
    id: 'trainNumber',
    label: 'Номер влак',
    minWidth: 100,
    showIf: (report) => report.id === 'train_report'
  },
  {
    id: 'route',
    label: 'Маршрут',
    minWidth: 120,
    showIf: (report) => report.id === 'train_report' || report.id === 'passenger_km_report' || report.id === 'ticket_sales_report'
  },
  {
    id: 'trainType',
    label: 'Тип влак',
    minWidth: 120,
    showIf: (report) => report.id === 'train_report'
  },
  {
    id: 'station',
    label: 'Гара',
    minWidth: 120,
    showIf: (report) => report.id === 'subscription_report' || report.id === 'subscription_sales_report'
  },
  {
    id: 'subscriptionType',
    label: 'Тип абонамент',
    minWidth: 120,
    showIf: (report) => report.id === 'subscription_report' || report.id === 'subscription_sales_report'
  },
  {
    id: 'validityPeriod',
    label: 'Период на валидност',
    minWidth: 120,
    showIf: (report) => report.id === 'subscription_report' || report.id === 'subscription_sales_report'
  },
  {
    id: 'ticketType',
    label: 'Вид билет',
    minWidth: 120,
    showIf: (report) => report.id === 'ticket_sales_report'
  },
  {
    id: 'passengers',
    label: 'Пътници',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'train_report' || report.id === 'passenger_km_report' || report.id === 'ticket_sales_report'
  },
  {
    id: 'passengerKm',
    label: 'Пътникокилометри',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'train_report' || report.id === 'passenger_km_report' || report.id === 'ticket_sales_report'
  },
  {
    id: 'ticketCount',
    label: 'Брой билети',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'ticket_sales_report'
  },
  {
    id: 'subscriptionCount',
    label: 'Брой абонаменти',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'subscription_report' || report.id === 'subscription_sales_report'
  },
  {
    id: 'income',
    label: 'Приходи',
    minWidth: 120,
    align: 'right',
    format: (value: number) => formatValue(value)
  },
  {
    id: 'expenses',
    label: 'Разходи',
    minWidth: 120,
    align: 'right',
    format: (value: number) => formatValue(value)
  },
  {
    id: 'balance',
    label: 'Баланс',
    minWidth: 120,
    align: 'right',
    format: (value: number) => formatValue(value)
  }
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="subtitle2">{label}</Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" sx={{ color: entry.color }}>
            {`${entry.name}: ${formatValue(entry.value as number)}`}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

const MarketingReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [periodType, setPeriodType] = useState<'month' | 'year' | 'range'>('month');
  const [month, setMonth] = useState<Date | null>(new Date());
  const [year, setYear] = useState<number>(2024);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [groupBy, setGroupBy] = useState('none');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'asc' });
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
  const [accumulate, setAccumulate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    // Initially show only columns that are visible for the first report type
    const initialReport = reportTypes[0];
    return new Set(columns
      .filter(col => !col.showIf || col.showIf(initialReport))
      .map(col => col.id)
    );
  });
  const [dataCache] = useState<Map<string, ReportData[]>>(() => {
    const cache = new Map<string, ReportData[]>();
    reportTypes.forEach(report => {
      cache.set(report.id, mockData.filter(item => item.id.split('-')[2] === report.id));
    });
    return cache;
  });

  const handleExport = (type: 'excel' | 'pdf') => {
    alert(`Експорт в ${type.toUpperCase()} (пример)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedReportData = reportTypes.find(r => r.id === selectedReport);

  // Функция за сортиране на данните
  const getSortedData = (data: any[]) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Функция за промяна на сортирането
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Функция за изчисляване на натрупаните стойности
  const calculateAccumulatedValues = (data: ReportData[]) => {
    if (!accumulate) return data;

    const accumulatedData = new Map<string, ReportData>();
    
    // Сортираме данните по дата
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    sortedData.forEach(item => {
      let key: string;
      
      // Създаваме уникален ключ в зависимост от типа справка
      switch (selectedReportData?.id) {
        case 'train_report':
          key = item.trainNumber || 'total';
          break;
        case 'subscription_report':
        case 'subscription_sales_report':
          key = `${item.station}-${item.subscriptionType}-${item.validityPeriod}`;
          break;
        case 'passenger_km_report':
          key = item.route || 'total';
          break;
        case 'ticket_sales_report':
          key = `${item.route}-${item.ticketType}`;
          break;
        default:
          key = 'total';
      }
      
      const existing = accumulatedData.get(key);
      
      if (existing) {
        // Добавяме стойностите към съществуващите
        accumulatedData.set(key, {
          ...item,
          passengers: (existing.passengers || 0) + (item.passengers || 0),
          passengerKm: (existing.passengerKm || 0) + (item.passengerKm || 0),
          ticketCount: (existing.ticketCount || 0) + (item.ticketCount || 0),
          subscriptionCount: (existing.subscriptionCount || 0) + (item.subscriptionCount || 0),
          income: existing.income + item.income,
          expenses: existing.expenses + item.expenses,
          balance: existing.balance + item.balance
        });
      } else {
        // Първа стойност за този ключ
        accumulatedData.set(key, { ...item });
      }
    });

    return Array.from(accumulatedData.values());
  };

  // Модифицираме getFilteredData да използва натрупаните стойности
  const getFilteredData = () => {
    if (!selectedReportData) return [];

    const reportData = dataCache.get(selectedReportData.id) || [];
    let filtered = [...reportData];

    // Премахваме дублираните записи преди филтриране
    filtered = removeDuplicateEntries(filtered, selectedReportData.id);

    // Прилагаме филтрите както досега
    if (periodType === 'month' && month) {
      const monthStr = month.toISOString().slice(0, 7);
      // При натрупване, филтрираме само крайната дата, но запазваме всички данни до нея
      if (accumulate) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          const filterDate = new Date(monthStr);
          return itemDate <= filterDate;
        });
      } else {
        filtered = filtered.filter(item => formatFilterDate(item.date).startsWith(monthStr));
      }
    } else if (periodType === 'year') {
      // При натрупване, филтрираме само крайната дата, но запазваме всички данни до нея
      if (accumulate) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          const filterDate = new Date(year, 11, 31); // 31 декември на избраната година
          return itemDate <= filterDate;
        });
      } else {
        filtered = filtered.filter(item => formatFilterDate(item.date).startsWith(year.toString()));
      }
    } else if (periodType === 'range' && range[0] && range[1]) {
      // При натрупване, филтрираме само крайната дата, но запазваме всички данни до нея
      if (accumulate) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate <= range[1]!;
        });
      } else {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= range[0]! && itemDate <= range[1]!;
        });
      }
    }

    // Прилагаме колонните филтри
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => {
          const itemValue = item[key as keyof ReportData];
          if (typeof itemValue === 'number') {
            return itemValue.toString().includes(value);
          } else if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(value.toLowerCase());
          }
          return true;
        });
      }
    });

    // Изчисляваме натрупаните стойности ако е избрано
    filtered = calculateAccumulatedValues(filtered);

    return getSortedData(filtered);
  };

  const filteredData = getFilteredData();

  // Функция за подготовка на данните за графиките
  const getChartData = () => {
    if (!selectedReportData) return [];

    const filtered = getFilteredData();
    if (!Array.isArray(filtered)) return [];

    // Проверяваме дали данните са групирани
    const isGrouped = filtered.some(item => 'isGroup' in item);

    if (isGrouped) {
      // Обработка на групирани данни
      return filtered.map(item => {
        if ('isGroup' in item) {
          // Изчисляваме общите стойности за групата
          const groupTotals = item.items.reduce((acc: ReportData, curr: ReportData) => ({
            passengers: (acc.passengers || 0) + (curr.passengers || 0),
            passengerKm: (acc.passengerKm || 0) + (curr.passengerKm || 0),
            income: (acc.income || 0) + (curr.income || 0),
            ticketCount: (acc.ticketCount || 0) + (curr.ticketCount || 0),
            subscriptionCount: (acc.subscriptionCount || 0) + (curr.subscriptionCount || 0)
          }), {} as ReportData);

          switch (selectedReportData.id) {
            case 'train_report':
              return {
                name: item.key,
                Пътници: groupTotals.passengers,
                'Пътникокилометри': groupTotals.passengerKm,
                Приходи: groupTotals.income
              };
            case 'subscription_report':
            case 'subscription_sales_report':
              return {
                name: item.key,
                'Брой абонаменти': groupTotals.subscriptionCount,
                Приходи: groupTotals.income
              };
            case 'passenger_km_report':
              return {
                name: item.key,
                Пътници: groupTotals.passengers,
                'Пътникокилометри': groupTotals.passengerKm,
                Приходи: groupTotals.income
              };
            case 'ticket_sales_report':
              return {
                name: item.key,
                'Брой билети': groupTotals.ticketCount,
                Приходи: groupTotals.income
              };
            default:
              return {
                name: item.key,
                Приходи: groupTotals.income
              };
          }
        }
        return null;
      }).filter(Boolean);
    } else {
      // Обработка на негрупирани данни (съществуващата логика)
      const dataItems = filtered.filter((item): item is ReportData => !('isGroup' in item));

      switch (selectedReportData.id) {
        case 'train_report':
          return dataItems.map(item => ({
            name: `Влак ${item.trainNumber}`,
            Пътници: item.passengers,
            'Пътникокилометри': item.passengerKm,
            Приходи: item.income,
            'Тип влак': item.trainType,
            Маршрут: item.route
          }));
        case 'subscription_report':
        case 'subscription_sales_report':
          return dataItems.map(item => ({
            name: item.station,
            'Брой абонаменти': item.subscriptionCount,
            Приходи: item.income,
            'Тип абонамент': item.subscriptionType,
            'Период на валидност': item.validityPeriod
          }));
        case 'passenger_km_report':
          return dataItems.map(item => ({
            name: item.route,
            Пътници: item.passengers,
            'Пътникокилометри': item.passengerKm,
            Приходи: item.income
          }));
        case 'ticket_sales_report':
          return dataItems.map(item => ({
            name: item.route,
            'Брой билети': item.ticketCount,
            Приходи: item.income,
            'Вид билет': item.ticketType
          }));
        default:
          return [];
      }
    }
  };

  // Функция за рендериране на подходящата графика
  const renderChart = () => {
    const data = getChartData();
    if (!data.length) return null;

    switch (selectedReportData?.id) {
      case 'train_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={formatValue} />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Пътници" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="Пътникокилометри" fill="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="Приходи" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'subscription_report':
      case 'subscription_sales_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={formatValue} />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Брой абонаменти" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="Приходи" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'passenger_km_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={formatValue} />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Пътници" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="Пътникокилометри" fill="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="Приходи" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'ticket_sales_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tickFormatter={formatValue} />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Брой билети" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="Приходи" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  // Функция за промяна на филтрите
  const handleFilterChange = (key: keyof ColumnFilters, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Функция за рендериране на филтрите за колоните
  const renderColumnFilters = () => {
    if (!selectedReportData) return null;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Филтри по колони
          </Typography>
        </Grid>
        
        {/* Общи филтри */}
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Дата"
            value={columnFilters.date || ''}
            onChange={(e) => handleFilterChange('date', e.target.value)}
          />
        </Grid>

        {/* Филтри за справка по влак */}
        {selectedReportData.id === 'train_report' && (
          <>
            <Grid item xs={12} md={2}>
              <TextField
                size="small"
                fullWidth
                label="Маршрут"
                value={columnFilters.route || ''}
                onChange={(e) => handleFilterChange('route', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                size="small"
                fullWidth
                displayEmpty
                value={columnFilters.trainType || ''}
                onChange={(e) => handleFilterChange('trainType', e.target.value)}
              >
                <MenuItem value="">Всички типове влакове</MenuItem>
                {trainTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </Grid>
          </>
        )}

        {/* Филтри за справка закупени билети */}
        {selectedReportData.id === 'ticket_sales_report' && (
          <Grid item xs={12} md={2}>
            <Select
              size="small"
              fullWidth
              displayEmpty
              value={columnFilters.ticketType || ''}
              onChange={(e) => handleFilterChange('ticketType', e.target.value)}
            >
              <MenuItem value="">Всички видове билети</MenuItem>
              {ticketTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </Grid>
        )}

        {/* Филтри за справки с абонаменти */}
        {(selectedReportData.id === 'subscription_report' || selectedReportData.id === 'subscription_sales_report') && (
          <>
            <Grid item xs={12} md={2}>
              <Select
                size="small"
                fullWidth
                displayEmpty
                value={columnFilters.subscriptionType || ''}
                onChange={(e) => handleFilterChange('subscriptionType', e.target.value)}
              >
                <MenuItem value="">Всички типове абонаменти</MenuItem>
                {subscriptionTypes.map(type => (
                  <MenuItem key={type.type} value={type.type}>{type.type}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                size="small"
                fullWidth
                displayEmpty
                value={columnFilters.validityPeriod || ''}
                onChange={(e) => handleFilterChange('validityPeriod', e.target.value)}
              >
                <MenuItem value="">Всички периоди</MenuItem>
                {validityPeriods.map(period => (
                  <MenuItem key={period.period} value={period.period}>{period.period}</MenuItem>
                ))}
              </Select>
            </Grid>
          </>
        )}

        {/* Общи филтри за числови стойности */}
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Пътникокилометри"
            value={columnFilters.passengerKm || ''}
            onChange={(e) => handleFilterChange('passengerKm', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Брой билети"
            value={columnFilters.ticketCount || ''}
            onChange={(e) => handleFilterChange('ticketCount', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Брой абонаменти"
            value={columnFilters.subscriptionCount || ''}
            onChange={(e) => handleFilterChange('subscriptionCount', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Приходи"
            value={columnFilters.income || ''}
            onChange={(e) => handleFilterChange('income', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Разходи"
            value={columnFilters.expenses || ''}
            onChange={(e) => handleFilterChange('expenses', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            size="small"
            fullWidth
            label="Баланс"
            value={columnFilters.balance || ''}
            onChange={(e) => handleFilterChange('balance', e.target.value)}
          />
        </Grid>

        {/* Бутон за изчистване на филтрите */}
        <Grid item xs={12} md={2}>
          <Button
            size="small"
            fullWidth
            variant="outlined"
            onClick={() => setColumnFilters({})}
            sx={{ height: '40px' }}
          >
            Изчисти филтрите
          </Button>
        </Grid>
      </Grid>
    );
  };

  // Add pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get paginated data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [selectedReport, periodType, month, year, range, groupBy, columnFilters, accumulate, rowsPerPage]);

  const toggleAllColumns = () => {
    setVisibleColumns(prev => {
      if (prev.size === visibleColumnsForReport.length) {
        return new Set();
      }
      return new Set(visibleColumnsForReport.map(col => col.id));
    });
  };

  // Filter columns based on the selected report
  const visibleColumnsForReport = columns.filter(col => 
    !col.showIf || (selectedReportData && col.showIf(selectedReportData))
  );

  // Update visible columns when report type changes
  React.useEffect(() => {
    if (selectedReportData) {
      const validColumns = new Set(
        columns
          .filter(col => !col.showIf || col.showIf(selectedReportData))
          .map(col => col.id)
      );
      // Keep only columns that are valid for the current report
      setVisibleColumns(prev => new Set(
        Array.from(prev).filter(colId => validColumns.has(colId))
      ));
    }
  }, [selectedReportData]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Маркетингови справки</Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="report-select-label">Изберете справка</InputLabel>
              <Select
                labelId="report-select-label"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                label="Изберете справка"
              >
                <MenuItem value="">
                  <em>Изберете справка</em>
                </MenuItem>
                {reportTypes.map(report => (
                  <MenuItem key={report.id} value={report.id}>
                    {report.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedReportData && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedReportData.description}
                </Typography>
              </Grid>

              <Grid item xs={12} md={2}>
                <Select
                  value={periodType}
                  onChange={e => setPeriodType(e.target.value as any)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="month">Месец</MenuItem>
                  <MenuItem value="year">Година</MenuItem>
                  <MenuItem value="range">Диапазон</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {periodType === 'month' && (
                    <DatePicker
                      views={["year", "month"]}
                      label="Избери месец"
                      value={month}
                      onChange={setMonth}
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                  )}
                  {periodType === 'year' && (
                    <TextField
                      label="Година"
                      type="number"
                      value={year}
                      onChange={e => setYear(Number(e.target.value))}
                      size="small"
                      fullWidth
                    />
                  )}
                  {periodType === 'range' && (
                    <Stack direction="row" spacing={1}>
                      <DatePicker
                        label="От"
                        value={range[0]}
                        onChange={date => setRange([date, range[1]])}
                        slotProps={{ textField: { size: "small" } }}
                      />
                      <DatePicker
                        label="До"
                        value={range[1]}
                        onChange={date => setRange([range[0], date])}
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </Stack>
                  )}
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={2}>
                <Select
                  value={groupBy}
                  onChange={e => setGroupBy(e.target.value)}
                  size="small"
                  fullWidth
                >
                  <MenuItem value="none">Без групиране</MenuItem>
                  <MenuItem value="station">Гара</MenuItem>
                  <MenuItem value="route">Маршрут</MenuItem>
                  <MenuItem value="month">Месец</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accumulate}
                      onChange={(e) => setAccumulate(e.target.checked)}
                    />
                  }
                  label="С натрупване"
                />
              </Grid>

              {/* Добавяме филтрите по колони */}
              <Grid item xs={12}>
                {renderColumnFilters()}
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => handleExport('excel')}
                  >
                    Експорт в Excel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => handleExport('pdf')}
                  >
                    Експорт в PDF
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                  >
                    Печат
                  </Button>
                  <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_e, val) => val && setView(val)}
                    sx={{ ml: 'auto' }}
                  >
                    <ToggleButton value="table" aria-label="Таблица">
                      <TableChartIcon />
                    </ToggleButton>
                    <ToggleButton value="chart" aria-label="Графика">
                      <BarChartIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {selectedReportData && (
        <>
          {view === 'table' ? (
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                {selectedReport ? reportTypes.find(r => r.id === selectedReport)?.name : 'Изберете справка'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Tooltip title={visibleColumns.size === visibleColumnsForReport.length ? "Скрий всички колони" : "Покажи всички колони"}>
                  <IconButton onClick={toggleAllColumns} size="small">
                    {visibleColumns.size === visibleColumnsForReport.length ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Tooltip>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Колони</InputLabel>
                  <Select
                    multiple
                    value={Array.from(visibleColumns)}
                    onChange={(e) => {
                      const newColumns = new Set(e.target.value as string[]);
                      // Ensure we only set columns that are valid for the current report
                      const validColumns = new Set(
                        visibleColumnsForReport.map(col => col.id)
                      );
                      setVisibleColumns(new Set(
                        Array.from(newColumns).filter(colId => validColumns.has(colId))
                      ));
                    }}
                    renderValue={(selected) => `${selected.length} колони`}
                    label="Колони"
                  >
                    {visibleColumnsForReport.map((column) => (
                      <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={visibleColumns.has(column.id)} />
                        <ListItemText primary={column.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              {renderChart()}
            </Box>
          )}
          <TableContainer 
            component={Paper} 
            sx={{ 
              overflow: 'auto',
              '& .MuiTable-root': {
                minWidth: 650,
                tableLayout: 'auto',
              },
              '& .MuiTableCell-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '8px 16px',
                '&:hover': {
                  overflow: 'visible',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  zIndex: 1,
                  position: 'relative',
                }
              },
              '& .MuiTableHead-root .MuiTableCell-root': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 'bold',
                position: 'sticky',
                top: 0,
                zIndex: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              },
              '& .MuiTableBody-root .MuiTableRow-root:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {visibleColumnsForReport
                    .filter(col => visibleColumns.has(col.id))
                    .map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ 
                          minWidth: column.minWidth,
                          width: column.width,
                          maxWidth: column.maxWidth,
                        }}
                        sx={{
                          '& .MuiTableSortLabel-root': {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            '& .MuiTableSortLabel-icon': {
                              marginLeft: '4px',
                              marginRight: 0,
                              position: 'absolute',
                              right: 0
                            }
                          }
                        }}
                      >
                        <TableSortLabel
                          active={sortConfig.key === column.id}
                          direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                          onClick={() => handleSort(column.id)}
                          sx={{
                            '&.MuiTableSortLabel-root': {
                              '& .MuiTableSortLabel-icon': {
                                opacity: sortConfig.key === column.id ? 1 : 0.5
                              },
                              '& .MuiTableSortLabel-iconDirectionAsc, & .MuiTableSortLabel-iconDirectionDesc': {
                                position: 'absolute',
                                right: 0
                              }
                            }
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.id} hover>
                    {visibleColumnsForReport
                      .filter(col => visibleColumns.has(col.id))
                      .map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          style={{ 
                            minWidth: column.minWidth,
                            width: column.width,
                            maxWidth: column.maxWidth,
                          }}
                        >
                          {column.render 
                            ? column.render(row)
                            : column.format && typeof row[column.id] === 'number'
                              ? column.format(row[column.id] as number)
                              : row[column.id]}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[25, 50, 100, 250]}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} от ${count}`}
              labelRowsPerPage="Записи на страница:"
              sx={{
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  margin: 0
                }
              }}
            />
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default MarketingReports; 