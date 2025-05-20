export interface Cashier {
  id: string;
  name: string;
  employeeId: string;
  locationId: string;
  isActive: boolean;
  assignedRegisters: string[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CashRegister {
  id: string;
  registerNumber: string;
  modelName: string;
  serialNumber: string;
  locationId: string;
  isActive: boolean;
  fiscalMemoryNumber: string;
  registeredWithNRA: boolean;
  fdrid?: string;
  simCardNumber?: string;
  lastReportDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerDetail {
  id: string;
  workerName: string;
  employmentStatus: string;
  contractType: string;
  isActive: boolean;
}

export interface CashDesks {
  id: string;
  name: string;
  locationId: string;
  type: 'Билетна каса' | 'Кондукторна каса' | 'Мобилно устройство';
  description?: string;
  requirements?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  maintenanceCompany: string;
  maintenanceContact: string;
  isActive: boolean;
  registeredWithNRA: boolean;
  registrationDate?: string;
  deregistrationDate?: string;
  cashDesks?: CashDesks[];
  cashRegisters: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BusinessPartner {
  id: string;
  name: string;
  vatNumber: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  partnerType: 'supplier' | 'client' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface PrinterCode {
  id: string;
  name: string;
  number: string;
  typeValue: string;
  taxGroup: string;
  isRevenue: boolean;
  isActive: boolean;
  locationId: string;
}

export interface KlenExportRequest {
  id: string;
  registerId: string;
  startDate: string;
  endDate: string;
  exportType: 'service' | 'internal' | 'all';
  requestedBy: string;
  status: 'pending' | 'completed' | 'failed';
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationalUnit {
  id: string;
  name: string;
  parentId?: string;
  level: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PointOfSale {
  id: string;
  name: string;
  eik: string | null;
  type: 'station' | 'ticket_office' | 'pda_device' | 'vending_machine';
  status: 'active' | 'inactive' | 'maintenance';
  city: string;
  street: string;
  number: string;
  postalCode: string;
  region: string;
  company: string;
  serviceCompanyName?: string;
  serviceCompanyEIK?: string | null;
  serviceContractStartDate?: string | null;
  serviceContractEndDate?: string | null;
  fdrid?: string | null;
} 