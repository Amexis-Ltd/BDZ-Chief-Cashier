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
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
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
    id: 'final_passenger_report',
    name: 'Окончателен отчет за превозени пътници',
    description: 'Отчет за превозени пътници и реализирани пътникокилометри по поделения и общо за мрежата'
  },
  {
    id: 'passenger_report',
    name: 'Отчет за превозени пътници',
    description: 'Детайлен отчет за превозени пътници по гари, поделения, тарифи и кореспонденции'
  },
  {
    id: 'correspondence_report',
    name: 'Справка по Кореспонденции',
    description: 'Анализ на кореспонденциите с възможност за натрупване по месеци и години'
  }
];

// Константи за данни
const divisions = [
  'Пътнически превози София',
  'Пътнически превози Пловдив',
  'Пътнически превози Варна',
  'Пътнически превози Бургас',
  'Пътнически превози Русе'
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

const trainCategories = [
  'Пътнически',
  'Бърз',
  'Експрес',
  'Интерсити'
] as const;

const movementTypes = [
  'Местно',
  'Износ',
  'Внос',
  'Транзит'
] as const;

const tariffZones = [
  'Зона 1 (до 50 км)',
  'Зона 2 (51-100 км)',
  'Зона 3 (101-200 км)',
  'Зона 4 (201-300 км)',
  'Зона 5 (над 300 км)'
] as const;

const tariffTypes = [
  'Стандартна',
  'Намалена',
  'Пенсионерска',
  'Студентска',
  'Детска',
  'Групова'
] as const;

const transportTypes = [
  'Вътрешен',
  'Международен'
] as const;

// Типове за константите
type Division = typeof divisions[number];
type Station = typeof stations[number];
type TrainCategory = typeof trainCategories[number];
type MovementType = typeof movementTypes[number];
type TariffZone = typeof tariffZones[number];
type TariffType = typeof tariffTypes[number];
type TransportType = typeof transportTypes[number];

// Интерфейс за данните
interface ReportData {
  id: string;
  date: string;
  division?: Division;
  station?: Station;
  transportType?: TransportType;
  trainCategory?: TrainCategory;
  movementType?: MovementType;
  tariffZone?: TariffZone;
  tariffType?: TariffType;
  passengers: number;
  passengerKm: number;
  correspondence?: string;
  domesticPassengers?: number;
  internationalPassengers?: number;
  domesticPassengerKm?: number;
  internationalPassengerKm?: number;
}

// Тип за сортиране
type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

// Интерфейс за филтрите
interface ColumnFilters {
  date?: string;
  division?: string;
  station?: string;
  transportType?: string;
  trainCategory?: string;
  movementType?: string;
  tariffZone?: string;
  tariffType?: string;
  passengers?: string;
  passengerKm?: string;
  correspondence?: string;
  domesticPassengers?: string;
  internationalPassengers?: string;
  domesticPassengerKm?: string;
  internationalPassengerKm?: string;
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
            case 'final_passenger_report':
              divisions.forEach(division => {
                const uniqueKey = `${date.split('T')[0]}-${division}`;
                if (!usedKeys.has(uniqueKey)) {
                  usedKeys.add(uniqueKey);
                  const domesticPassengers = Math.round(getRandomNumber(1000, 5000) * multiplier);
                  const internationalPassengers = Math.round(getRandomNumber(500, 2000) * multiplier);
                  const domesticPassengerKm = Math.round(domesticPassengers * getRandomNumber(50, 200));
                  const internationalPassengerKm = Math.round(internationalPassengers * getRandomNumber(200, 500));
                  
                  data.push({
                    id: `${year}-${month}-${report.id}-${division}-${index}`,
                    date: date,
                    division: division as Division,
                    passengers: domesticPassengers + internationalPassengers,
                    passengerKm: domesticPassengerKm + internationalPassengerKm,
                    domesticPassengers,
                    internationalPassengers,
                    domesticPassengerKm,
                    internationalPassengerKm
                  });
                }
              });
              break;

            case 'passenger_report':
              stations.forEach(station => {
                const transportType = transportTypes[Math.floor(Math.random() * transportTypes.length)] as TransportType;
                const trainCategory = trainCategories[Math.floor(Math.random() * trainCategories.length)] as TrainCategory;
                const movementType = movementTypes[Math.floor(Math.random() * movementTypes.length)] as MovementType;
                const tariffZone = tariffZones[Math.floor(Math.random() * tariffZones.length)] as TariffZone;
                const tariffType = tariffTypes[Math.floor(Math.random() * tariffTypes.length)] as TariffType;
                
                const uniqueKey = `${date.split('T')[0]}-${station}-${transportType}-${trainCategory}-${movementType}`;
                if (!usedKeys.has(uniqueKey)) {
                  usedKeys.add(uniqueKey);
                  const passengers = Math.round(getRandomNumber(500, 3000) * multiplier);
                  const passengerKm = Math.round(passengers * getRandomNumber(50, 300));
                  
                  data.push({
                    id: `${year}-${month}-${report.id}-${station}-${index}`,
                    date: date,
                    station: station as Station,
                    transportType,
                    trainCategory,
                    movementType,
                    tariffZone,
                    tariffType,
                    passengers,
                    passengerKm
                  });
                }
              });
              break;

            case 'correspondence_report':
              for (let i = 0; i < 5; i++) {
                const station1 = stations[Math.floor(Math.random() * stations.length)];
                const station2 = stations[Math.floor(Math.random() * stations.length)];
                const correspondence = `${station1} - ${station2}`;
                const uniqueKey = `${date.split('T')[0]}-${correspondence}`;
                
                if (!usedKeys.has(uniqueKey)) {
                  usedKeys.add(uniqueKey);
                  const passengers = Math.round(getRandomNumber(200, 1500) * multiplier);
                  const passengerKm = Math.round(passengers * getRandomNumber(100, 400));
                  
                  data.push({
                    id: `${year}-${month}-${report.id}-${correspondence}-${index}`,
                    date: date,
                    correspondence,
                    passengers,
                    passengerKm
                  });
                }
              }
              break;
          }
        });
      }
    });
  });

  return data;
};

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
      case 'final_passenger_report':
        key = `${item.date.split('T')[0]}-${item.division}`;
        break;
      case 'passenger_report':
        key = `${item.date.split('T')[0]}-${item.station}-${item.division}-${item.trainCategory}-${item.movementType}-${item.tariffZone}-${item.tariffType}`;
        break;
      case 'correspondence_report':
        key = `${item.date.split('T')[0]}-${item.correspondence}`;
        break;
      default:
        key = item.id;
    }
    
    // Ако вече има запис с този ключ, проверяваме дали новият има по-голям брой пътници
    const existing = uniqueEntries.get(key);
    if (existing) {
      if (item.passengers > (existing.passengers || 0)) {
        uniqueEntries.set(key, item);
      }
    } else {
      uniqueEntries.set(key, item);
    }
  });
  
  return Array.from(uniqueEntries.values());
};

// Генерираме примерните данни
const mockData: ReportData[] = generateMockData();

// Инициализираме кеша с данни
const dataCache = new Map<string, ReportData[]>();
reportTypes.forEach(report => {
  dataCache.set(report.id, mockData.filter(item => item.id.split('-')[2] === report.id));
});

// Функция за форматиране на стойностите
const formatValue = (value: number) => value.toLocaleString('bg-BG');

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
    render: (row: ReportData) => formatDisplayDate(row.date as string)
  },
  {
    id: 'division',
    label: 'Поделение',
    minWidth: 120,
    showIf: (report) => report.id === 'final_passenger_report' || report.id === 'passenger_report',
  },
  {
    id: 'domesticPassengers',
    label: 'Вътрешни пътници',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'final_passenger_report',
  },
  {
    id: 'internationalPassengers',
    label: 'Международни пътници',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'final_passenger_report',
  },
  {
    id: 'domesticPassengerKm',
    label: 'Вътрешни пътникокилометри',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'final_passenger_report',
  },
  {
    id: 'internationalPassengerKm',
    label: 'Международни пътникокилометри',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
    showIf: (report) => report.id === 'final_passenger_report',
  },
  {
    id: 'station',
    label: 'Гара',
    minWidth: 120,
    showIf: (report) => report.id === 'passenger_report',
  },
  {
    id: 'trainCategory',
    label: 'Категория влак',
    minWidth: 120,
    showIf: (report) => report.id === 'passenger_report',
  },
  {
    id: 'movementType',
    label: 'Вид движение',
    minWidth: 120,
    showIf: (report) => report.id === 'passenger_report',
  },
  {
    id: 'tariffZone',
    label: 'Тарифна зона',
    minWidth: 120,
    showIf: (report) => report.id === 'passenger_report',
  },
  {
    id: 'tariffType',
    label: 'Вид тарифа',
    minWidth: 120,
    showIf: (report) => report.id === 'passenger_report',
  },
  {
    id: 'correspondence',
    label: 'Кореспонденция',
    minWidth: 120,
    showIf: (report) => report.id === 'correspondence_report',
  },
  {
    id: 'passengers',
    label: 'Пътници',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
  },
  {
    id: 'passengerKm',
    label: 'Пътникокилометри',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('bg-BG'),
  },
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

const StatisticsReports: React.FC = () => {
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

    // Първо сортираме данните по дата
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Определяме началната дата за натрупване (1 януари на текущата година)
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // 1 януари на текущата година
    
    // Филтрираме данните само за текущата година
    const yearData = sortedData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });

    // Създаваме Map за натрупване на стойностите по ключ
    const accumulatedData = new Map<string, ReportData>();
    
    yearData.forEach(item => {
      // Определяме ключа за натрупване в зависимост от типа справка
      let key: string;
      if (selectedReportData?.id === 'final_passenger_report') {
        key = item.division || 'Други';
      } else if (selectedReportData?.id === 'passenger_report') {
        key = `${item.station || 'Други'}-${item.division || 'Други'}-${item.trainCategory || 'Други'}-${item.movementType || 'Други'}-${item.tariffZone || 'Други'}-${item.tariffType || 'Други'}`;
      } else if (selectedReportData?.id === 'correspondence_report') {
        key = item.correspondence || 'Други';
      } else {
        key = 'Всички';
      }

      const existing = accumulatedData.get(key);
      
      if (existing) {
        // Добавяме стойностите към съществуващите, запазвайки последната дата
        accumulatedData.set(key, {
          ...item,
          id: existing.id, // Запазваме оригиналния ID
          date: item.date, // Запазваме последната дата
          passengers: existing.passengers + item.passengers,
          passengerKm: existing.passengerKm + item.passengerKm,
          domesticPassengers: (existing.domesticPassengers || 0) + (item.domesticPassengers || 0),
          internationalPassengers: (existing.internationalPassengers || 0) + (item.internationalPassengers || 0),
          domesticPassengerKm: (existing.domesticPassengerKm || 0) + (item.domesticPassengerKm || 0),
          internationalPassengerKm: (existing.internationalPassengerKm || 0) + (item.internationalPassengerKm || 0),
        });
      } else {
        // Първа стойност за този ключ
        accumulatedData.set(key, { ...item });
      }
    });

    // Връщаме натрупаните данни, сортирани по дата
    return Array.from(accumulatedData.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Функция за филтриране на данните
  const getFilteredData = () => {
    if (!selectedReportData) return [];

    const reportData = dataCache.get(selectedReportData.id) || [];
    let filtered = [...reportData];

    // Премахваме дублираните записи преди филтриране
    filtered = removeDuplicateEntries(filtered, selectedReportData.id);

    // 1. Филтриране по период
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

    // 2. Филтриране по колони
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => {
          const itemValue = item[key as keyof ReportData];
          
          // Ако стойността е undefined или null, пропускаме филтрирането
          if (itemValue == null) return true;
          
          // Конвертираме стойността в string за сравнение
          const itemValueStr = String(itemValue).toLowerCase();
          const filterValueStr = value.toLowerCase();
          
          // Проверяваме дали стойността съдържа филтъра
          return itemValueStr.includes(filterValueStr);
        });
      }
    });

    // 3. Групиране (ако е избрано)
    if (groupBy !== 'none') {
      const grouped = new Map<string, ReportData[]>();
      
      // Групираме данните
      filtered.forEach(item => {
        let key: string;
        switch (groupBy) {
          case 'division':
            key = item.division || 'Други';
            break;
          case 'station':
            key = item.station || 'Други';
            break;
          case 'month':
            key = item.date.slice(0, 7);
            break;
          default:
            key = 'Всички';
        }
        
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(item);
      });

      // За всяка група:
      // 1. Сортираме данните
      // 2. Прилагаме натрупване ако е избрано
      // 3. Връщаме резултата
      return Array.from(grouped.entries()).map(([key, items]) => {
        const sortedItems = getSortedData(items);
        const processedItems = accumulate ? calculateAccumulatedValues(sortedItems) : sortedItems;
        
        return {
          isGroup: true,
          key,
          items: processedItems
        };
      });
    }

    // 4. Ако няма групиране:
    // 1. Сортираме данните
    // 2. Прилагаме натрупване ако е избрано
    const sortedData = getSortedData(filtered);
    return accumulate ? calculateAccumulatedValues(sortedData) : sortedData;
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
            domesticPassengers: (acc.domesticPassengers || 0) + (curr.domesticPassengers || 0),
            internationalPassengers: (acc.internationalPassengers || 0) + (curr.internationalPassengers || 0),
            domesticPassengerKm: (acc.domesticPassengerKm || 0) + (curr.domesticPassengerKm || 0),
            internationalPassengerKm: (acc.internationalPassengerKm || 0) + (curr.internationalPassengerKm || 0)
          }), {} as ReportData);

          switch (selectedReportData.id) {
            case 'final_passenger_report':
              return {
                name: item.key,
                'Вътрешни пътници': groupTotals.domesticPassengers,
                'Международни пътници': groupTotals.internationalPassengers,
                'Вътрешни пътникокилометри': groupTotals.domesticPassengerKm,
                'Международни пътникокилометри': groupTotals.internationalPassengerKm
              };
            case 'passenger_report':
              return {
                name: item.key,
                Пътници: groupTotals.passengers,
                'Пътникокилометри': groupTotals.passengerKm
              };
            case 'correspondence_report':
              return {
                name: item.key,
                Пътници: groupTotals.passengers,
                'Пътникокилометри': groupTotals.passengerKm
              };
            default:
              return {
                name: item.key,
                Пътници: groupTotals.passengers,
                'Пътникокилометри': groupTotals.passengerKm
              };
          }
        }
        return null;
      }).filter(Boolean);
    } else {
      // Обработка на негрупирани данни (съществуващата логика)
      const dataItems = filtered.filter((item): item is ReportData => !('isGroup' in item));

      switch (selectedReportData.id) {
        case 'final_passenger_report':
          return dataItems.map(item => ({
            name: item.division,
            'Вътрешни пътници': item.domesticPassengers,
            'Международни пътници': item.internationalPassengers,
            'Вътрешни пътникокилометри': item.domesticPassengerKm,
            'Международни пътникокилометри': item.internationalPassengerKm
          }));
        case 'passenger_report':
          return dataItems.map(item => ({
            name: item.station,
            Пътници: item.passengers,
            'Пътникокилометри': item.passengerKm,
            'Категория влак': item.trainCategory,
            'Вид движение': item.movementType,
            'Тарифна зона': item.tariffZone,
            'Вид тарифа': item.tariffType
          }));
        case 'correspondence_report':
          return dataItems.map(item => ({
            name: item.correspondence,
            Пътници: item.passengers,
            'Пътникокилометри': item.passengerKm
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
      case 'final_passenger_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Вътрешни пътници" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="Международни пътници" fill="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="Вътрешни пътникокилометри" stroke="#ff7300" />
              <Line yAxisId="right" type="monotone" dataKey="Международни пътникокилометри" stroke="#ff0000" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'passenger_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Пътници" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="Пътникокилометри" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'correspondence_report':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <RechartsTooltip content={CustomTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="Пътници" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="Пътникокилометри" stroke="#ff7300" />
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
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Филтри по колони
          </Typography>
        </Grid>
        
        {/* Филтри за окончателен отчет */}
        {selectedReportData.id === 'final_passenger_report' && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Дата"
                value={columnFilters.date || ''}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Поделение</InputLabel>
                <Select
                  value={columnFilters.division || ''}
                  onChange={(e) => handleFilterChange('division', e.target.value)}
                  label="Поделение"
                >
                  <MenuItem value="">Всички поделения</MenuItem>
                  {divisions.map(division => (
                    <MenuItem key={division} value={division}>{division}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Вътрешни пътници"
                value={columnFilters.domesticPassengers || ''}
                onChange={(e) => handleFilterChange('domesticPassengers', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Международни пътници"
                value={columnFilters.internationalPassengers || ''}
                onChange={(e) => handleFilterChange('internationalPassengers', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Вътрешни пътникокилометри"
                value={columnFilters.domesticPassengerKm || ''}
                onChange={(e) => handleFilterChange('domesticPassengerKm', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Международни пътникокилометри"
                value={columnFilters.internationalPassengerKm || ''}
                onChange={(e) => handleFilterChange('internationalPassengerKm', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Пътници"
                value={columnFilters.passengers || ''}
                onChange={(e) => handleFilterChange('passengers', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Пътникокилометри"
                value={columnFilters.passengerKm || ''}
                onChange={(e) => handleFilterChange('passengerKm', e.target.value)}
              />
            </Grid>
          </>
        )}

        {/* Филтри за отчет за превозени пътници */}
        {selectedReportData.id === 'passenger_report' && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Дата"
                value={columnFilters.date || ''}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Гара</InputLabel>
                <Select
                  value={columnFilters.station || ''}
                  onChange={(e) => handleFilterChange('station', e.target.value)}
                  label="Гара"
                >
                  <MenuItem value="">Всички гари</MenuItem>
                  {stations.map(station => (
                    <MenuItem key={station} value={station}>{station}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Поделение</InputLabel>
                <Select
                  value={columnFilters.division || ''}
                  onChange={(e) => handleFilterChange('division', e.target.value)}
                  label="Поделение"
                >
                  <MenuItem value="">Всички поделения</MenuItem>
                  {divisions.map(division => (
                    <MenuItem key={division} value={division}>{division}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Категория влак</InputLabel>
                <Select
                  value={columnFilters.trainCategory || ''}
                  onChange={(e) => handleFilterChange('trainCategory', e.target.value)}
                  label="Категория влак"
                >
                  <MenuItem value="">Всички категории</MenuItem>
                  {trainCategories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Вид движение</InputLabel>
                <Select
                  value={columnFilters.movementType || ''}
                  onChange={(e) => handleFilterChange('movementType', e.target.value)}
                  label="Вид движение"
                >
                  <MenuItem value="">Всички видове</MenuItem>
                  {movementTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Тарифна зона</InputLabel>
                <Select
                  value={columnFilters.tariffZone || ''}
                  onChange={(e) => handleFilterChange('tariffZone', e.target.value)}
                  label="Тарифна зона"
                >
                  <MenuItem value="">Всички зони</MenuItem>
                  {tariffZones.map(zone => (
                    <MenuItem key={zone} value={zone}>{zone}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Вид тарифа</InputLabel>
                <Select
                  value={columnFilters.tariffType || ''}
                  onChange={(e) => handleFilterChange('tariffType', e.target.value)}
                  label="Вид тарифа"
                >
                  <MenuItem value="">Всички видове</MenuItem>
                  {tariffTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}

        {/* Филтри за справка по кореспонденции */}
        {selectedReportData.id === 'correspondence_report' && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Дата"
                value={columnFilters.date || ''}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Кореспонденция"
                value={columnFilters.correspondence || ''}
                onChange={(e) => handleFilterChange('correspondence', e.target.value)}
              />
            </Grid>
          </>
        )}

        {/* Бутон за изчистване на филтрите */}
        <Grid item xs={12} sm={6} md={3}>
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

  // Filter columns based on the selected report
  const visibleColumnsForReport = columns.filter((col: Column) => 
    !col.showIf || (selectedReportData && col.showIf(selectedReportData))
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
        Статистически справки
      </Typography>
      
      <Paper sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
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
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {selectedReportData.description}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
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

              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {periodType === 'month' && (
                    <DatePicker
                      views={["year", "month"]}
                      label="Избери месец"
                      value={month}
                      onChange={setMonth}
                      slotProps={{ 
                        textField: { 
                          size: "small", 
                          fullWidth: true,
                          sx: { width: '100%' }
                        } 
                      }}
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
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={1}
                      sx={{ width: '100%' }}
                    >
                      <DatePicker
                        label="От"
                        value={range[0]}
                        onChange={date => setRange([date, range[1]])}
                        slotProps={{ 
                          textField: { 
                            size: "small",
                            fullWidth: true
                          } 
                        }}
                      />
                      <DatePicker
                        label="До"
                        value={range[1]}
                        onChange={date => setRange([range[0], date])}
                        slotProps={{ 
                          textField: { 
                            size: "small",
                            fullWidth: true
                          } 
                        }}
                      />
                    </Stack>
                  )}
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Select
                  value={groupBy}
                  onChange={e => setGroupBy(e.target.value)}
                  size="small"
                  fullWidth
                >
                  <MenuItem value="none">Без групиране</MenuItem>
                  <MenuItem value="division">Поделение</MenuItem>
                  <MenuItem value="station">Гара</MenuItem>
                  <MenuItem value="month">Месец</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
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

              {/* Филтри по колони */}
              <Grid item xs={12}>
                {renderColumnFilters()}
              </Grid>

              <Grid item xs={12}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    mt: 2,
                    '& .MuiButton-root': {
                      width: { xs: '100%', sm: 'auto' }
                    }
                  }}
                >
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
                    sx={{ 
                      ml: { xs: 0, sm: 'auto' },
                      width: { xs: '100%', sm: 'auto' },
                      '& .MuiToggleButton-root': {
                        flex: { xs: 1, sm: 'none' }
                      }
                    }}
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
                  <IconButton onClick={() => setVisibleColumns(new Set())} size="small">
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
                    {visibleColumnsForReport.map((column: Column) => (
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
            <Paper sx={{ mb: 2 }}>
              {renderChart()}
            </Paper>
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
            <Table>
              <TableHead>
                <TableRow>
                  {visibleColumnsForReport
                    .filter((col: Column) => visibleColumns.has(col.id))
                    .map((column: Column) => (
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
                      .filter((col: Column) => visibleColumns.has(col.id))
                      .map((column: Column) => (
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

export default StatisticsReports; 