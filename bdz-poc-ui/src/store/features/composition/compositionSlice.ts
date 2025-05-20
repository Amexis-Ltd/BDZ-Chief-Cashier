import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parseISO, format, eachDayOfInterval } from 'date-fns';
import { RootState } from '../../../store/index';

// Функция за генериране на GUID
const generateGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export interface Wagon {
  id: number;
  seatNumber: string;
  wagonNumber: string;
  isActive: boolean;
  compositionId?: number;
  route?: {
    type: string;
    station: string;
    targetTrain?: string;
  };
}

export interface DailyRecord {
  id: string;
  date: string;
  locomotives: string[];
  wagons: Wagon[];
  isActive: boolean;
}

export interface CompositionRecord {
  id: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  locomotives: string[];
  wagons: Wagon[];
  dailyRecords: DailyRecord[];
}

export interface Composition {
  id: number;
  trainNumber: string;
  startStation: string;
  endStation: string;
  records: CompositionRecord[];
}

interface CompositionState {
  compositions: Composition[];
}

const initialState: CompositionState = {
  compositions: [
    { 
      id: 1, 
      trainNumber: '1234',
      startStation: 'София',
      endStation: 'Варна',
      records: [
        {
          id: '1-1',
          startDate: '2024-03-01',
          endDate: '2024-03-31',
          isActive: true,
          locomotives: ['Локомотив 1', 'Локомотив 2'],
          wagons: [
            { id: 1, seatNumber: '1-54', wagonNumber: '12345', isActive: true },
            { id: 2, seatNumber: '1-54', wagonNumber: '12346', isActive: true },
            { id: 3, seatNumber: '1-54', wagonNumber: '12347', isActive: true },
          ],
          dailyRecords: [
            {
              id: 'daily-1',
              date: '2024-03-01',
              locomotives: ['Локомотив 1', 'Локомотив 2'],
              wagons: [
                { id: 1, seatNumber: '1-54', wagonNumber: '12345', isActive: true },
                { id: 2, seatNumber: '1-54', wagonNumber: '12346', isActive: true },
                { id: 3, seatNumber: '1-54', wagonNumber: '12347', isActive: true },
              ],
              isActive: true
            }
          ]
        }
      ]
    },
    { 
      id: 2, 
      trainNumber: '5678',
      startStation: 'Пловдив',
      endStation: 'Бургас',
      records: [
        {
          id: '2-1',
          startDate: '2024-03-15',
          endDate: '2024-04-15',
          isActive: true,
          locomotives: ['Локомотив 2'],
          wagons: [
            { id: 4, seatNumber: '1-54', wagonNumber: '12348', isActive: true },
            { id: 5, seatNumber: '1-54', wagonNumber: '12349', isActive: true },
          ],
          dailyRecords: [
            {
              id: 'daily-2',
              date: '2024-03-15',
              locomotives: ['Локомотив 2'],
              wagons: [
                { id: 4, seatNumber: '1-54', wagonNumber: '12348', isActive: true },
                { id: 5, seatNumber: '1-54', wagonNumber: '12349', isActive: true },
              ],
              isActive: true
            }
          ]
        }
      ]
    },
  ]
};

export const generateDailyRecords = createAsyncThunk(
  'composition/generateDailyRecords',
  async (compositionId: number, { getState }) => {
    const state = getState() as RootState;
    const composition = state.composition.compositions.find((c: Composition) => c.id === compositionId);
    
    if (composition) {
      const lastRecord = composition.records[composition.records.length - 1];
      if (lastRecord) {
        const start = parseISO(lastRecord.startDate);
        const end = parseISO(lastRecord.endDate);
        const days = eachDayOfInterval({ start, end });
        
        const dailyRecords = days.map((date) => ({
          id: generateGuid(),
          date: format(date, 'yyyy-MM-dd'),
          locomotives: lastRecord.locomotives,
          wagons: lastRecord.wagons,
          isActive: true
        }));

        return {
          compositionId,
          recordId: lastRecord.id,
          dailyRecords
        };
      }
    }
    return null;
  }
);

const compositionSlice = createSlice({
  name: 'composition',
  initialState,
  reducers: {
    addComposition: (state, action: PayloadAction<Omit<Composition, 'id'>>) => {
      const newId = Math.max(0, ...state.compositions.map(c => c.id)) + 1;
      state.compositions.push({ ...action.payload, id: newId });
    },
    updateComposition: (state, action: PayloadAction<Composition>) => {
      const index = state.compositions.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.compositions[index] = action.payload;
      }
    },
    deleteComposition: (state, action: PayloadAction<number>) => {
      state.compositions = state.compositions.filter(c => c.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateDailyRecords.fulfilled, (state, action) => {
      if (!action.payload) return;
      
      const composition = state.compositions.find(c => c.id === action.payload!.compositionId);
      if (composition) {
        const record = composition.records.find(r => r.id === action.payload!.recordId);
        if (record) {
          record.dailyRecords = action.payload!.dailyRecords;
        }
      }
    });
  }
});

export const { addComposition, updateComposition, deleteComposition } = compositionSlice.actions;
export default compositionSlice.reducer; 