import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceCard {
  id: string;
  cardNumber: string;
  holderName: string;
  type: string;
  validFrom: string;
  validTo: string;
  status: string;
  employeeNumber: string;
}

interface ServiceCardsState {
  cards: ServiceCard[];
}

const initialState: ServiceCardsState = {
  cards: [
    {
      id: '1',
      cardNumber: 'SC-001',
      holderName: 'Иван Иванов',
      type: 'Служебна',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      employeeNumber: 'EMP001'
    },
    {
      id: '2',
      cardNumber: 'SC-002',
      holderName: 'Петър Петров',
      type: 'Служебна',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      employeeNumber: 'EMP002'
    }
  ]
};

const serviceCardsSlice = createSlice({
  name: 'serviceCards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<ServiceCard>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<ServiceCard>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    }
  }
});

export const {
  addCard,
  updateCard,
  deleteCard
} = serviceCardsSlice.actions;

export default serviceCardsSlice.reducer; 