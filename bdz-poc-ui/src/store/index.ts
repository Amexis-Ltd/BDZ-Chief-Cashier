import { configureStore } from '@reduxjs/toolkit';
import trainReducer from './slices/trainSlice';
import authReducer from './features/auth/authSlice';
import compositionReducer from './features/composition/compositionSlice';
import stationsReducer from './slices/stationsSlice';
import zonesReducer from './slices/zonesSlice';
import wagonsReducer from './slices/wagonsSlice';
import documentsReducer from './slices/documentsSlice';
import subscriptionCardsReducer from './slices/subscriptionCardsSlice';
import serviceCardsReducer from './slices/serviceCardsSlice';
import travelDocumentsReducer from './slices/travelDocumentsSlice';
import claimsReducer from './slices/claimsSlice';
import groupTravelReducer from './slices/groupTravelSlice';
import cashModuleReducer from './features/cashModule/cashModuleSlice';

export const store = configureStore({
  reducer: {
    trains: trainReducer,
    auth: authReducer,
    composition: compositionReducer,
    stations: stationsReducer,
    zones: zonesReducer,
    wagons: wagonsReducer,
    documents: documentsReducer,
    subscriptionCards: subscriptionCardsReducer,
    serviceCards: serviceCardsReducer,
    travelDocuments: travelDocumentsReducer,
    claims: claimsReducer,
    groupTravel: groupTravelReducer,
    cashModule: cashModuleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 