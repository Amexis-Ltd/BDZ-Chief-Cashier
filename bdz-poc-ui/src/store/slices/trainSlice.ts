// Train type definitions
export interface WagonComposition {
  type: string;
  count: number;
}

export interface Train {
  id?: string;
  number: string;
  type: string;
  category: string;
  startStation: string;
  endStation: string;
  intermediateStations: string[];
  departureTime: string;
  arrivalTime: string;
  composition: WagonComposition[];
  movementPeriod: string;
  customDays: string[];
}

// Train type options
export const TRAIN_TYPES = [
  { value: 'БВ', label: 'Бърз влак' },
  { value: 'ПВ', label: 'Пътнически влак' },
  { value: 'ЕВ', label: 'Експресен влак' },
] as const;

export const TRAIN_CATEGORIES = [
  { value: '1', label: 'Категория 1' },
  { value: '2', label: 'Категория 2' },
  { value: '3', label: 'Категория 3' },
] as const;

export const WAGON_TYPES = [
  { value: '1', label: 'Пътнически вагон' },
  { value: '2', label: 'Спален вагон' },
  { value: '3', label: 'Ресторант' },
  { value: '4', label: 'Багажен вагон' },
] as const;

export const MOVEMENT_PERIODS = [
  { value: 'daily', label: 'Ежедневно' },
  { value: 'workdays', label: 'Работни дни' },
  { value: 'weekends', label: 'Събота и неделя' },
  { value: 'custom', label: 'По избор' },
] as const;

export const WEEK_DAYS = [
  'Понеделник',
  'Вторник',
  'Сряда',
  'Четвъртък',
  'Петък',
  'Събота',
  'Неделя',
] as const;

// Initial state
export interface TrainState {
  trains: Train[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainState = {
  trains: [
    {
      id: '1',
      number: '1234',
      type: 'БВ',
      category: '1',
      startStation: 'София',
      endStation: 'Варна',
      intermediateStations: ['Пловдив', 'Стара Загора', 'Карнобат'],
      departureTime: '08:00',
      arrivalTime: '14:30',
      composition: [
        { type: '1', count: 4 }, // 4 пътнически вагона
        { type: '2', count: 1 }, // 1 спален вагон
        { type: '3', count: 1 }, // 1 ресторант
        { type: '4', count: 1 }, // 1 багажен вагон
      ],
      movementPeriod: 'daily',
      customDays: [],
    },
    {
      id: '2',
      number: '5678',
      type: 'ЕВ',
      category: '1',
      startStation: 'София',
      endStation: 'Бургас',
      intermediateStations: ['Пловдив', 'Нова Загора', 'Ямбол'],
      departureTime: '07:30',
      arrivalTime: '12:45',
      composition: [
        { type: '1', count: 3 }, // 3 пътнически вагона
        { type: '3', count: 1 }, // 1 ресторант
        { type: '4', count: 1 }, // 1 багажен вагон
      ],
      movementPeriod: 'workdays',
      customDays: [],
    },
    {
      id: '3',
      number: '9012',
      type: 'ПВ',
      category: '2',
      startStation: 'София',
      endStation: 'Русе',
      intermediateStations: ['Мездра', 'Левски', 'Плевен'],
      departureTime: '06:15',
      arrivalTime: '11:30',
      composition: [
        { type: '1', count: 5 }, // 5 пътнически вагона
        { type: '4', count: 1 }, // 1 багажен вагон
      ],
      movementPeriod: 'weekends',
      customDays: [],
    },
  ],
  loading: false,
  error: null,
};

// Slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const trainSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    addTrain: (state, action: PayloadAction<Train>) => {
      const newTrain = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9), // Генериране на уникален ID
      };
      state.trains.push(newTrain);
    },
    updateTrain: (state, action: PayloadAction<Train>) => {
      const index = state.trains.findIndex(train => train.id === action.payload.id);
      if (index !== -1) {
        state.trains[index] = action.payload;
      }
    },
    deleteTrain: (state, action: PayloadAction<string>) => {
      state.trains = state.trains.filter(train => train.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addTrain, updateTrain, deleteTrain, setLoading, setError } = trainSlice.actions;
export default trainSlice.reducer; 