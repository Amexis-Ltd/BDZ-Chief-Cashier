import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { v4 as uuidv4 } from 'uuid';
import {
  Cashier,
  SalesLocation,
  CashDesks,
  PrinterCode,
  KlenExportRequest,
  OrganizationalUnit,
  PointOfSale,
} from '../../../types/cashModule';

// Define the state structure for the Cash Module
interface CashModuleState {
  cashiers: Cashier[];
  salesLocations: SalesLocation[];
  cashDesks: CashDesks[];
  printerCodes: PrinterCode[];
  klenExports: KlenExportRequest[];
  organizationalUnits: OrganizationalUnit[];
  loading: boolean;
  error: string | null;
  pointsOfSale: PointOfSale[];
}

// Define pointsOfSale first so their UUIDs can be referenced
const initialPointsOfSale: PointOfSale[] = [
  {
    id: uuidv4(),
    name: 'Централна гара София',
    eik: '123456789',
    type: 'station',
    status: 'active',
    city: 'София',
    street: 'бул. Княгиня Мария Луиза 102',
    number: '',
    postalCode: '1202',
    region: 'София-град',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: '',
    serviceCompanyEIK: null,
    serviceContractStartDate: null,
    serviceContractEndDate: null,
    fdrid: null
  },
  {
    id: uuidv4(),
    name: 'Централна гара Пловдив',
    eik: '987654321',
    type: 'station',
    status: 'active',
    city: 'Пловдив',
    street: 'бул. Христо Ботев 46',
    number: '',
    postalCode: '4000',
    region: 'Пловдив',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: '',
    serviceCompanyEIK: null,
    serviceContractStartDate: null,
    serviceContractEndDate: null,
    fdrid: null
  },
  {
    id: uuidv4(),
    name: 'Централна гара Варна',
    eik: '112233445',
    type: 'station',
    status: 'active',
    city: 'Варна',
    street: 'пл. Славейков 1',
    number: '',
    postalCode: '9000',
    region: 'Варна',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: '',
    serviceCompanyEIK: null,
    serviceContractStartDate: null,
    serviceContractEndDate: null,
    fdrid: null
  },
  {
    id: uuidv4(),
    name: 'Билетна каса - Централна гара София',
    eik: '123456789', // Assuming same EIK as the station for simplicity
    type: 'ticket_office',
    status: 'active',
    city: 'София',
    street: 'бул. Княгиня Мария Луиза 102',
    number: 'Каса 1',
    postalCode: '1202',
    region: 'София-град',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: '',
    serviceCompanyEIK: null,
    serviceContractStartDate: null,
    serviceContractEndDate: null,
    fdrid: null
  },
  {
    id: uuidv4(),
    name: 'PDA Устройство - Централна гара София',
    eik: null, // PDA devices might not have an EIK
    type: 'pda_device',
    status: 'active',
    city: 'София', // Or could be region-based
    street: '',
    number: '',
    postalCode: '',
    region: 'София-област',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: 'Мобилно обслужване АД',
    serviceCompanyEIK: '999888777',
    serviceContractStartDate: '2023-01-01',
    serviceContractEndDate: '2025-01-01',
    fdrid: 'FDRID_PDA_001'
  },
  {
    id: uuidv4(),
    name: 'Автомат Централна гара Варна',
    eik: '112233445', // Assuming same EIK as the station for simplicity
    type: 'vending_machine',
    status: 'active',
    city: 'Варна',
    street: 'пл. Славейков 1',
    number: 'Автомат 3',
    postalCode: '9000',
    region: 'Варна',
    company: 'БДЖ - ПП ЕООД',
    serviceCompanyName: 'Вендинг Сървисиз ООД',
    serviceCompanyEIK: '777666555',
    serviceContractStartDate: '2022-06-01',
    serviceContractEndDate: '2024-06-01',
    fdrid: 'FDRID_VM_003'
  }
];

// Map location EIKs to PointOfSale IDs for easier lookup
const pointOfSaleIdByEIK: { [key: string]: string } = {};
initialPointsOfSale.forEach(pos => {
  if (pos.eik) pointOfSaleIdByEIK[pos.eik.toLowerCase()] = pos.id;
});

// Initial CashDesks
const initialCashDesks: CashDesks[] = [
  {
    id: uuidv4(),
    name: 'Билетна каса 1 - Централна гара София',
    locationId: initialPointsOfSale[0].id, 
    type: 'Билетна каса',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Кондукторски пункт - Централна гара Пловдив',
    locationId: initialPointsOfSale[1].id, 
    type: 'Кондукторна каса',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Мобилен автомат - Централна гара София',
    locationId: initialPointsOfSale[0].id, 
    type: 'Мобилно устройство',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Каса Билетен Център - София (POS_TICKET_OFFICE_SOF)',
    locationId: initialPointsOfSale[3].id, // Corresponds to 'Билетна каса - Централна гара София'
    type: 'Билетна каса',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Кондукторско устройство 1 (POS_PDA_SOF)',
    locationId: initialPointsOfSale[4].id, // Corresponds to 'PDA Устройство - Централна гара София'
    type: 'Кондукторна каса',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Мобилно устройство - Автомат Варна (POS_VM_VAR)',
    locationId: initialPointsOfSale[5].id, // Corresponds to 'Автомат Централна гара Варна'
    type: 'Мобилно устройство',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Initial Printer Codes (associated with initialPointsOfSale)
const initialPrinterCodes: PrinterCode[] = [
  {
    id: uuidv4(),
    name: 'ЖП билет',
    number: 'P001',
    typeValue: 'Артикул',
    taxGroup: 'Б',
    isRevenue: true,
    isActive: true,
    locationId: initialPointsOfSale[0].id,
  },
  {
    id: uuidv4(),
    name: 'Абонаментна карта',
    number: 'P002',
    typeValue: 'Артикул',
    taxGroup: 'Б',
    isRevenue: true,
    isActive: true,
    locationId: initialPointsOfSale[0].id,
  },
  {
    id: uuidv4(),
    name: 'Велосипед',
    number: 'T001',
    typeValue: 'Артикул',
    taxGroup: 'Б',
    isRevenue: true,
    isActive: true,
    locationId: initialPointsOfSale[1].id,
  },
  {
    id: uuidv4(),
    name: 'Такса малко животно',
    number: 'O001',
    typeValue: 'Артикул',
    taxGroup: 'Б',
    isRevenue: true,
    isActive: true,
    locationId: initialPointsOfSale[2].id,
  },
];

// Initial Cashiers
const initialCashiers: Cashier[] = [
  {
    id: uuidv4(),
    name: 'Иван Петров',
    employeeId: 'E001',
    locationId: pointOfSaleIdByEIK['123456789'],
    isActive: true,
    permissions: ['sell_tickets', 'manage_cash'],
    assignedRegisters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Мария Георгиева',
    employeeId: 'E002',
    locationId: pointOfSaleIdByEIK['987654321'],
    isActive: true,
    permissions: ['sell_tickets'],
    assignedRegisters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Георги Иванов',
    employeeId: 'E003',
    locationId: pointOfSaleIdByEIK['112233445'],
    isActive: false,
    permissions: ['manage_cash'],
    assignedRegisters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial state
const initialState: CashModuleState = {
  cashiers: initialCashiers,
  salesLocations: [],
  cashDesks: initialCashDesks, 
  printerCodes: initialPrinterCodes,
  klenExports: [],
  organizationalUnits: [],
  loading: false,
  error: null,
  pointsOfSale: initialPointsOfSale
};

// Create the slice
export const cashModuleSlice = createSlice({
  name: 'cashModule',
  initialState,
  reducers: {
    // Cashiers
    setCashiers: (state, action: PayloadAction<Cashier[]>) => {
      state.cashiers = action.payload;
    },
    addCashier: (state, action: PayloadAction<Cashier>) => {
      state.cashiers.push(action.payload);
    },
    updateCashier: (state, action: PayloadAction<Cashier>) => {
      const index = state.cashiers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cashiers[index] = action.payload;
      }
    },
    deleteCashier: (state, action: PayloadAction<string>) => {
      state.cashiers = state.cashiers.filter(c => c.id !== action.payload);
    },

    // Sales Locations
    setSalesLocations: (state, action: PayloadAction<SalesLocation[]>) => {
      state.salesLocations = action.payload;
    },
    addSalesLocation: (state, action: PayloadAction<SalesLocation>) => {
      state.salesLocations.push(action.payload);
    },
    updateSalesLocation: (state, action: PayloadAction<SalesLocation>) => {
      const index = state.salesLocations.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state.salesLocations[index] = action.payload;
      }
    },
    deleteSalesLocation: (state, action: PayloadAction<string>) => {
      state.salesLocations = state.salesLocations.filter(l => l.id !== action.payload);
    },
    
    // CashDesks
    setCashDesks: (state, action: PayloadAction<CashDesks[]>) => { 
      state.cashDesks = action.payload;
    },
    addCashDesks: (state, action: PayloadAction<CashDesks>) => { 
      state.cashDesks.push(action.payload);
    },
    updateCashDesks: (state, action: PayloadAction<CashDesks>) => { 
      const index = state.cashDesks.findIndex(ws => ws.id === action.payload.id);
      if (index !== -1) {
        state.cashDesks[index] = action.payload;
        state.cashDesks[index].updatedAt = new Date().toISOString(); // Ensure updatedAt is updated
      }
    },
    deleteCashDesks: (state, action: PayloadAction<string>) => { 
      state.cashDesks = state.cashDesks.filter(ws => ws.id !== action.payload);
    },

    // Printer Codes
    setPrinterCodes: (state, action: PayloadAction<PrinterCode[]>) => {
      state.printerCodes = action.payload;
    },
    addPrinterCode: (state, action: PayloadAction<PrinterCode>) => {
      state.printerCodes.push(action.payload);
    },
    updatePrinterCode: (state, action: PayloadAction<PrinterCode>) => {
      const index = state.printerCodes.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.printerCodes[index] = action.payload;
      }
    },
    deletePrinterCode: (state, action: PayloadAction<string>) => {
      state.printerCodes = state.printerCodes.filter(p => p.id !== action.payload);
    },

    // KLEN Exports
    setKlenExports: (state, action: PayloadAction<KlenExportRequest[]>) => {
      state.klenExports = action.payload;
    },
    addKlenExport: (state, action: PayloadAction<KlenExportRequest>) => {
      state.klenExports.push(action.payload);
    },
    updateKlenExport: (state, action: PayloadAction<KlenExportRequest>) => {
      const index = state.klenExports.findIndex(k => k.id === action.payload.id);
      if (index !== -1) {
        state.klenExports[index] = action.payload;
      }
    },
    deleteKlenExport: (state, action: PayloadAction<string>) => {
      state.klenExports = state.klenExports.filter(k => k.id !== action.payload);
    },

    // Organizational Units
    setOrganizationalUnits: (state, action: PayloadAction<OrganizationalUnit[]>) => {
      state.organizationalUnits = action.payload;
    },
    addOrganizationalUnit: (state, action: PayloadAction<OrganizationalUnit>) => {
      state.organizationalUnits.push(action.payload);
    },
    updateOrganizationalUnit: (state, action: PayloadAction<OrganizationalUnit>) => {
      const index = state.organizationalUnits.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.organizationalUnits[index] = action.payload;
      }
    },
    deleteOrganizationalUnit: (state, action: PayloadAction<string>) => {
      state.organizationalUnits = state.organizationalUnits.filter(u => u.id !== action.payload);
    },

    // Common actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Points of Sale
    setPointsOfSale: (state, action: PayloadAction<PointOfSale[]>) => {
      state.pointsOfSale = action.payload;
    },
    addPointOfSale: (state, action: PayloadAction<PointOfSale>) => {
      state.pointsOfSale.push({...action.payload, id: uuidv4(), company: action.payload.company || 'БДЖ - ПП ЕООД'});
    },
    updatePointOfSale: (state, action: PayloadAction<PointOfSale>) => {
      const index = state.pointsOfSale.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.pointsOfSale[index] = action.payload;
      }
    },
    deletePointOfSale: (state, action: PayloadAction<string>) => {
      state.pointsOfSale = state.pointsOfSale.filter(p => p.id !== action.payload);
    }
  }
});

// Export actions
export const {
  setCashiers,
  addCashier,
  updateCashier,
  deleteCashier,
  setSalesLocations,
  addSalesLocation,
  updateSalesLocation,
  deleteSalesLocation,
  setCashDesks, 
  addCashDesks, 
  updateCashDesks, 
  deleteCashDesks, 
  setPrinterCodes,
  addPrinterCode,
  updatePrinterCode,
  deletePrinterCode,
  setKlenExports,
  addKlenExport,
  updateKlenExport,
  deleteKlenExport,
  setOrganizationalUnits,
  addOrganizationalUnit,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
  setLoading,
  setError,
  setPointsOfSale,
  addPointOfSale,
  updatePointOfSale,
  deletePointOfSale
} = cashModuleSlice.actions;

// Export selectors
export const selectCashiers = (state: RootState) => state.cashModule.cashiers;
export const selectSalesLocations = (state: RootState) => state.cashModule.salesLocations;
export const selectCashDesks = (state: RootState) => state.cashModule.cashDesks; 
export const selectPrinterCodes = (state: RootState) => state.cashModule.printerCodes;
export const selectKlenExports = (state: RootState) => state.cashModule.klenExports;
export const selectOrganizationalUnits = (state: RootState) => state.cashModule.organizationalUnits;
export const selectLoading = (state: RootState) => state.cashModule.loading;
export const selectError = (state: RootState) => state.cashModule.error;
export const selectPointsOfSale = (state: RootState) => state.cashModule.pointsOfSale;

export default cashModuleSlice.reducer; 