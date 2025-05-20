import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Station {
  id: string;
  name: string;
  code: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  type: string;
  zone: string;
  subzone: string;
  services: string[];
  isActive: boolean;
  deactivationReason?: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface StationsState {
  stations: Station[];
}

const initialState: StationsState = {
  stations: [
    {
      id: '1',
      name: 'София',
      code: 'SF',
      address: 'бул. Княгиня Мария Луиза 102',
      category: 'Първа категория',
      type: 'Пътнически',
      zone: 'Западна',
      subzone: 'София',
      coordinates: {
        latitude: 42.7128,
        longitude: 23.3219
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC', 'Буфет'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 20:00',
        tuesday: '08:00 - 20:00',
        wednesday: '08:00 - 20:00',
        thursday: '08:00 - 20:00',
        friday: '08:00 - 20:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 20:00'
      }
    },
    {
      id: '2',
      name: 'Пловдив',
      code: 'PD',
      address: 'ул. Цар Борис III 1',
      category: 'Първа категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Пловдив',
      coordinates: {
        latitude: 42.1354,
        longitude: 24.7453
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC', 'Буфет', 'Банкомат'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 20:00',
        tuesday: '08:00 - 20:00',
        wednesday: '08:00 - 20:00',
        thursday: '08:00 - 20:00',
        friday: '08:00 - 20:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 20:00'
      }
    },
    {
      id: '3',
      name: 'Варна',
      code: 'VN',
      address: 'ул. Хан Крум 1',
      category: 'Първа категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Варна',
      coordinates: {
        latitude: 43.2047,
        longitude: 27.9105
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC', 'Буфет', 'Банкомат'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 20:00',
        tuesday: '08:00 - 20:00',
        wednesday: '08:00 - 20:00',
        thursday: '08:00 - 20:00',
        friday: '08:00 - 20:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 20:00'
      }
    },
    {
      id: '4',
      name: 'Бургас',
      code: 'BG',
      address: 'ул. Железопътна 1',
      category: 'Първа категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Бургас',
      coordinates: {
        latitude: 42.5048,
        longitude: 27.4626
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC', 'Буфет', 'Банкомат'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 20:00',
        tuesday: '08:00 - 20:00',
        wednesday: '08:00 - 20:00',
        thursday: '08:00 - 20:00',
        friday: '08:00 - 20:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 20:00'
      }
    },
    {
      id: '5',
      name: 'Русе',
      code: 'RS',
      address: 'ул. Железопътна 2',
      category: 'Първа категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Русе',
      coordinates: {
        latitude: 43.8487,
        longitude: 25.9534
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC', 'Буфет'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 20:00',
        tuesday: '08:00 - 20:00',
        wednesday: '08:00 - 20:00',
        thursday: '08:00 - 20:00',
        friday: '08:00 - 20:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 20:00'
      }
    },
    {
      id: '6',
      name: 'Стара Загора',
      code: 'SZ',
      address: 'ул. Железопътна 3',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Стара Загора',
      coordinates: {
        latitude: 42.4257,
        longitude: 25.6345
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '7',
      name: 'Плевен',
      code: 'PL',
      address: 'ул. Железопътна 4',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Плевен',
      coordinates: {
        latitude: 43.4170,
        longitude: 24.6167
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '8',
      name: 'Сливен',
      code: 'SL',
      address: 'ул. Железопътна 5',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Сливен',
      coordinates: {
        latitude: 42.6858,
        longitude: 26.3291
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '9',
      name: 'Шумен',
      code: 'SH',
      address: 'ул. Железопътна 6',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Шумен',
      coordinates: {
        latitude: 43.2712,
        longitude: 26.9361
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '10',
      name: 'Добрич',
      code: 'DB',
      address: 'ул. Железопътна 7',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Добрич',
      coordinates: {
        latitude: 43.5725,
        longitude: 27.8273
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '11',
      name: 'Велико Търново',
      code: 'VT',
      address: 'ул. Железопътна 8',
      category: 'Втора категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Велико Търново',
      coordinates: {
        latitude: 43.0757,
        longitude: 25.6171
      },
      services: ['Билетна каса', 'Пътнически перон', 'Паркинг', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 18:00',
        tuesday: '08:00 - 18:00',
        wednesday: '08:00 - 18:00',
        thursday: '08:00 - 18:00',
        friday: '08:00 - 18:00',
        saturday: '08:00 - 14:00',
        sunday: '08:00 - 14:00'
      }
    },
    {
      id: '12',
      name: 'Габрово',
      code: 'GB',
      address: 'ул. Железопътна 9',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Северна',
      subzone: 'Габрово',
      coordinates: {
        latitude: 42.8742,
        longitude: 25.3189
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '13',
      name: 'Ямбол',
      code: 'YB',
      address: 'ул. Железопътна 10',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Ямбол',
      coordinates: {
        latitude: 42.4842,
        longitude: 26.5031
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '14',
      name: 'Хасково',
      code: 'HK',
      address: 'ул. Железопътна 11',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Хасково',
      coordinates: {
        latitude: 41.9344,
        longitude: 25.5556
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '15',
      name: 'Кърджали',
      code: 'KJ',
      address: 'ул. Железопътна 12',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Южна',
      subzone: 'Кърджали',
      coordinates: {
        latitude: 41.6434,
        longitude: 25.3797
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '16',
      name: 'Благоевград',
      code: 'BL',
      address: 'ул. Железопътна 13',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Западна',
      subzone: 'Благоевград',
      coordinates: {
        latitude: 42.0119,
        longitude: 23.0957
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '17',
      name: 'Монтана',
      code: 'MN',
      address: 'ул. Железопътна 14',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Западна',
      subzone: 'Монтана',
      coordinates: {
        latitude: 43.4085,
        longitude: 23.2257
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    },
    {
      id: '18',
      name: 'Видин',
      code: 'VD',
      address: 'ул. Железопътна 15',
      category: 'Трета категория',
      type: 'Пътнически',
      zone: 'Западна',
      subzone: 'Видин',
      coordinates: {
        latitude: 43.9911,
        longitude: 22.8727
      },
      services: ['Билетна каса', 'Пътнически перон', 'WC'],
      isActive: true,
      workingHours: {
        monday: '08:00 - 16:00',
        tuesday: '08:00 - 16:00',
        wednesday: '08:00 - 16:00',
        thursday: '08:00 - 16:00',
        friday: '08:00 - 16:00',
        saturday: '08:00 - 12:00',
        sunday: '08:00 - 12:00'
      }
    }
  ]
};

const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    addStation: (state, action: PayloadAction<Station>) => {
      state.stations.push(action.payload);
    },
    updateStation: (state, action: PayloadAction<Station>) => {
      const index = state.stations.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.stations[index] = action.payload;
      }
    },
    deleteStation: (state, action: PayloadAction<string>) => {
      state.stations = state.stations.filter(s => s.id !== action.payload);
    },
  }
});

export const { setStations, addStation, updateStation, deleteStation } = stationsSlice.actions;
export default stationsSlice.reducer; 