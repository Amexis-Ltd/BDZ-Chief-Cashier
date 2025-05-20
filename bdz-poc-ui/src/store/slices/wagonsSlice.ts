import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WagonType {
  id: string;
  name: string;
  code: string;
  capacity: number;
  seatLayout: {
    rows: number;
    seatsPerRow: number;
    layout: string;
    seatOptions: { [key: number]: string[] };
    compartments: number;
  };
  class: 'First' | 'Second' | 'Third';
  isActive: boolean;
  amenities: string[];
  technicalSpecs: { [key: string]: string };
}

interface WagonsState {
  wagonTypes: WagonType[];
  loading: boolean;
  error: string | null;
}

const initialState: WagonsState = {
  wagonTypes: [
    {
      id: '1',
      name: 'Пътнически вагон',
      code: 'PV',
      capacity: 80,
      seatLayout: {
        rows: 20,
        seatsPerRow: 4,
        layout: '[]',
        seatOptions: {
          1: ['До прозорец', 'С маса'],
          2: ['До коридор', 'С контакт'],
          3: ['До прозорец', 'С WiFi'],
          4: ['До коридор', 'С кондиционер']
        },
        compartments: 0
      },
      class: 'Second',
      isActive: true,
      amenities: ['Климатик', 'Тоалетна', 'Багажно отделение', 'Електрически контакти'],
      technicalSpecs: {
        'Максимална скорост': '160 км/ч',
        'Тегло': '45 тона',
        'Дължина': '26.4 м',
        'Ширина': '2.8 м',
        'Височина': '4.2 м'
      }
    },
    {
      id: '2',
      name: 'Спален вагон',
      code: 'SV',
      capacity: 30,
      seatLayout: {
        rows: 10,
        seatsPerRow: 3,
        layout: '[]',
        seatOptions: {
          1: ['До прозорец', 'С маса', 'С контакт'],
          2: ['До коридор', 'С WiFi'],
          3: ['До прозорец', 'С кондиционер']
        },
        compartments: 5
      },
      class: 'First',
      isActive: true,
      amenities: ['Климатик', 'Тоалетна', 'Спални купета', 'Електрически контакти', 'Wi-Fi', 'Багажно отделение'],
      technicalSpecs: {
        'Максимална скорост': '160 км/ч',
        'Тегло': '48 тона',
        'Дължина': '26.4 м',
        'Ширина': '2.8 м',
        'Височина': '4.2 м'
      }
    },
    {
      id: '3',
      name: 'Ресторант',
      code: 'RV',
      capacity: 40,
      seatLayout: {
        rows: 10,
        seatsPerRow: 4,
        layout: '[]',
        seatOptions: {
          1: ['С маса', 'С контакт'],
          2: ['С маса', 'С WiFi'],
          3: ['С маса', 'С кондиционер'],
          4: ['С маса', 'С контакт']
        },
        compartments: 0
      },
      class: 'First',
      isActive: true,
      amenities: ['Кухня', 'Бар', 'Тоалетна', 'Климатик', 'Wi-Fi', 'Електрически контакти'],
      technicalSpecs: {
        'Максимална скорост': '160 км/ч',
        'Тегло': '50 тона',
        'Дължина': '26.4 м',
        'Ширина': '2.8 м',
        'Височина': '4.2 м'
      }
    }
  ],
  loading: false,
  error: null,
};

const wagonsSlice = createSlice({
  name: 'wagons',
  initialState,
  reducers: {
    setWagonTypes: (state, action: PayloadAction<WagonType[]>) => {
      state.wagonTypes = action.payload;
    },
    addWagonType: (state, action: PayloadAction<WagonType>) => {
      state.wagonTypes.push(action.payload);
    },
    updateWagonType: (state, action: PayloadAction<WagonType>) => {
      const index = state.wagonTypes.findIndex((type) => type.id === action.payload.id);
      if (index !== -1) {
        state.wagonTypes[index] = action.payload;
      }
    },
    deleteWagonType: (state, action: PayloadAction<string>) => {
      state.wagonTypes = state.wagonTypes.filter((type) => type.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWagonTypes,
  addWagonType,
  updateWagonType,
  deleteWagonType,
  setLoading,
  setError,
} = wagonsSlice.actions;

export default wagonsSlice.reducer; 