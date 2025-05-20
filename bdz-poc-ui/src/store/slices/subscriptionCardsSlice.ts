import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SubscriptionCard {
  id: string;
  cardNumber: string;
  holderName: string;
  type: string;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive' | 'expired' | 'suspended';
  documentType: string;
}

interface SubscriptionCardsState {
  cards: SubscriptionCard[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionCardsState = {
  cards: [
    {
      id: '1',
      cardNumber: 'CARD001',
      holderName: 'Иван Иванов',
      type: 'Месечен',
      validFrom: '2024-03-01',
      validTo: '2024-04-01',
      status: 'active',
      documentType: '1'
    },
    {
      id: '2',
      cardNumber: 'CARD002',
      holderName: 'Петър Петров',
      type: 'Годишен',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      documentType: '2'
    },
    {
      id: '3',
      cardNumber: 'CARD003',
      holderName: 'Мария Георгиева',
      type: 'Студентски',
      validFrom: '2024-02-01',
      validTo: '2024-06-30',
      status: 'inactive',
      documentType: '1'
    }
  ],
  loading: false,
  error: null
};

const subscriptionCardsSlice = createSlice({
  name: 'subscriptionCards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<SubscriptionCard[]>) => {
      state.cards = action.payload;
    },
    addCard: (state, action: PayloadAction<SubscriptionCard>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<SubscriptionCard>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setCards,
  addCard,
  updateCard,
  deleteCard,
  setLoading,
  setError
} = subscriptionCardsSlice.actions;

export default subscriptionCardsSlice.reducer; 