import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Document {
  id: string;
  name: string;
  shortName: string;
  price: number;
  allowDuplicate: boolean;
  duplicatePrice?: number;
  description: string;
  class: string;
  category: string;
  discount: string;
  isActive: boolean;
}

interface DocumentsState {
  documents: Document[];
}

const initialState: DocumentsState = {
  documents: [
    {
      id: '1',
      name: 'Абонаментна карта',
      shortName: 'АК',
      price: 50,
      allowDuplicate: true,
      duplicatePrice: 10,
      description: 'Месечна абонаментна карта за пътуване',
      class: 'Първи',
      category: 'Възрастен',
      discount: 'Без намаление',
      isActive: true
    },
    {
      id: '2',
      name: 'Служебна карта',
      shortName: 'СК',
      price: 0,
      allowDuplicate: true,
      duplicatePrice: 5,
      description: 'Служебна карта за служители',
      class: 'Първи',
      category: 'Възрастен',
      discount: '100%',
      isActive: true
    },
    {
      id: '3',
      name: 'Студентска карта',
      shortName: 'СТК',
      price: 30,
      allowDuplicate: true,
      duplicatePrice: 8,
      description: 'Студентска карта за пътуване',
      class: 'Втори',
      category: 'Студентски',
      discount: '50%',
      isActive: true
    },
    {
      id: '4',
      name: 'Пенсионерска карта',
      shortName: 'ПК',
      price: 25,
      allowDuplicate: true,
      duplicatePrice: 8,
      description: 'Пенсионерска карта за пътуване',
      class: 'Втори',
      category: 'Пенсионерски',
      discount: '50%',
      isActive: true
    },
    {
      id: '5',
      name: 'Детска карта',
      shortName: 'ДК',
      price: 20,
      allowDuplicate: true,
      duplicatePrice: 5,
      description: 'Детска карта за пътуване',
      class: 'Втори',
      category: 'Детски',
      discount: '50%',
      isActive: true
    }
  ]
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(d => d.id !== action.payload);
    }
  }
});

export const {
  addDocument,
  updateDocument,
  deleteDocument
} = documentsSlice.actions;

export default documentsSlice.reducer; 