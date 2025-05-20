import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Claim {
  id: string;
  claimNumber: string;
  clientName: string;
  type: string;
  date: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  description: string;
}

export interface ClaimsState {
  claims: Claim[];
}

const initialState: ClaimsState = {
  claims: [
    {
      id: '1',
      claimNumber: 'CL-001',
      clientName: 'Иван Иванов',
      type: 'Забавяне',
      date: '2024-03-20',
      status: 'pending',
      description: 'Забавяне на влака с 30 минути'
    },
    {
      id: '2',
      claimNumber: 'CL-002',
      clientName: 'Петър Петров',
      type: 'Отказ',
      date: '2024-03-19',
      status: 'in_progress',
      description: 'Отказ на влака'
    }
  ]
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    addClaim: (state, action: PayloadAction<Claim>) => {
      state.claims.push(action.payload);
    },
    updateClaim: (state, action: PayloadAction<Claim>) => {
      const index = state.claims.findIndex(claim => claim.id === action.payload.id);
      if (index !== -1) {
        state.claims[index] = action.payload;
      }
    },
    deleteClaim: (state, action: PayloadAction<string>) => {
      state.claims = state.claims.filter(claim => claim.id !== action.payload);
    }
  }
});

export const {
  addClaim,
  updateClaim,
  deleteClaim
} = claimsSlice.actions;

export default claimsSlice.reducer; 