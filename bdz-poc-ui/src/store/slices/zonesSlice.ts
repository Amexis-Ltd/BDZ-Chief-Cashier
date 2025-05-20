import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Zone {
  id: string;
  name: string;
  description: string;
  stations: string[];
  priceClass: string;
  isActive: boolean;
  deactivationReason?: string;
}

interface ZonesState {
  zones: Zone[];
}

const initialState: ZonesState = {
  zones: [
    {
      id: '1',
      name: 'Зона 1 - Централна',
      description: 'Централна зона, включваща София и околните градове',
      stations: ['1', '2', '3'], // София, Перник, Банкя
      priceClass: 'A',
      isActive: true
    },
    {
      id: '2',
      name: 'Зона 2 - Северна',
      description: 'Северна зона, включваща Враца, Мездра и Монтана',
      stations: ['4', '5', '6'], // Враца, Мездра, Монтана
      priceClass: 'B',
      isActive: true
    },
    {
      id: '3',
      name: 'Зона 3 - Южна',
      description: 'Южна зона, включваща Пловдив, Асеновград и Карлово',
      stations: ['7', '8', '9'], // Пловдив, Асеновград, Карлово
      priceClass: 'C',
      isActive: true
    },
    {
      id: '4',
      name: 'Зона 4 - Източна',
      description: 'Източна зона, включваща Бургас, Сливен и Ямбол',
      stations: ['10', '11', '12'], // Бургас, Сливен, Ямбол
      priceClass: 'B',
      isActive: true
    },
    {
      id: '5',
      name: 'Зона 5 - Западна',
      description: 'Западна зона, включваща Благоевград, Кюстендил и Дупница',
      stations: ['13', '14', '15'], // Благоевград, Кюстендил, Дупница
      priceClass: 'C',
      isActive: false,
      deactivationReason: 'Временно изключена поради ремонт на линията'
    }
  ]
};

const zonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    addZone: (state, action: PayloadAction<Zone>) => {
      state.zones.push(action.payload);
    },
    updateZone: (state, action: PayloadAction<Zone>) => {
      const index = state.zones.findIndex(z => z.id === action.payload.id);
      if (index !== -1) {
        state.zones[index] = action.payload;
      }
    },
    deleteZone: (state, action: PayloadAction<string>) => {
      state.zones = state.zones.filter(z => z.id !== action.payload);
    }
  }
});

export const {
  addZone,
  updateZone,
  deleteZone
} = zonesSlice.actions;

export default zonesSlice.reducer; 