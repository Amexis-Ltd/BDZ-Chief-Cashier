import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TravelDocument {
  id: string;
  documentNumber: string;
  clientName: string;
  type: string;
  date: string;
  status: 'active' | 'inactive' | 'expired' | 'suspended';
}

interface TravelDocumentsState {
  documents: TravelDocument[];
}

const initialState: TravelDocumentsState = {
  documents: [
    {
      id: '1',
      documentNumber: 'TD-001',
      clientName: 'Иван Иванов',
      type: 'Билет',
      date: '2024-03-20',
      status: 'active'
    },
    {
      id: '2',
      documentNumber: 'TD-002',
      clientName: 'Петър Петров',
      type: 'Билет',
      date: '2024-03-20',
      status: 'active'
    }
  ]
};

const travelDocumentsSlice = createSlice({
  name: 'travelDocuments',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<TravelDocument>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action: PayloadAction<TravelDocument>) => {
      const index = state.documents.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    }
  }
});

export const {
  addDocument,
  updateDocument,
  deleteDocument
} = travelDocumentsSlice.actions;

export default travelDocumentsSlice.reducer; 