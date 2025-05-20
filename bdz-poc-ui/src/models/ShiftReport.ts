export interface ShiftReport {
  id: string;
  cashier: string;
  office: string;
  station: string;
  cashRegisterNumber: string;
  shiftStart: Date;
  shiftEnd: Date;
  startDeposit: number;
  endDeposit: number;
  systemEndDeposit: number;
  balance: number;
  isAccepted: boolean;
}

export const mockShiftReports: ShiftReport[] = [
  {
    id: '1',
    cashier: 'Иван Иванов',
    office: 'Централна каса',
    station: 'София',
    cashRegisterNumber: 'K001',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 2500,
    systemEndDeposit: 2500,
    balance: 1500,
    isAccepted: true
  },
  {
    id: '2',
    cashier: 'Петя Петрова',
    office: 'Каса 1',
    station: 'Пловдив',
    cashRegisterNumber: 'K002',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 1800,
    systemEndDeposit: 1800,
    balance: 800,
    isAccepted: false
  },
  {
    id: '3',
    cashier: 'Георги Георгиев',
    office: 'Каса 2',
    station: 'Варна',
    cashRegisterNumber: 'K003',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 3200,
    systemEndDeposit: 3200,
    balance: 2200,
    isAccepted: true
  },
  {
    id: '4',
    cashier: 'Мария Маринова',
    office: 'Каса 3',
    station: 'Бургас',
    cashRegisterNumber: 'K004',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 2100,
    systemEndDeposit: 2100,
    balance: 1100,
    isAccepted: true
  },
  {
    id: '5',
    cashier: 'Николай Николов',
    office: 'Каса 4',
    station: 'Русе',
    cashRegisterNumber: 'K005',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 1900,
    systemEndDeposit: 1900,
    balance: 900,
    isAccepted: false
  },
  {
    id: '6',
    cashier: 'Стоян Петков',
    office: 'Каса 6',
    station: 'Русе',
    cashRegisterNumber: 'K006',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 1900,
    systemEndDeposit: 1900,
    balance: 900,
    isAccepted: false
  },
  {
    id: '7',
    cashier: 'Радка Стоянова',
    office: 'Каса 7',
    station: 'Стара Загора',
    cashRegisterNumber: 'K007',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 2300,
    systemEndDeposit: 2300,
    balance: 1300,
    isAccepted: true
  },
  {
    id: '8',
    cashier: 'Димитър Иванов',
    office: 'Каса 8',
    station: 'Плевен',
    cashRegisterNumber: 'K008',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 1700,
    systemEndDeposit: 1700,
    balance: 700,
    isAccepted: true
  },
  {
    id: '9',
    cashier: 'Георги Петров',
    office: 'Каса 9',
    station: 'Велико Търново',
    cashRegisterNumber: 'K009',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 2600,
    systemEndDeposit: 2600,
    balance: 1600,
    isAccepted: true
  },
  {
    id: '10',
    cashier: 'Силвия Димитрова',
    office: 'Каса 10',
    station: 'Шумен',
    cashRegisterNumber: 'K010',
    shiftStart: new Date('2024-03-20T08:00:00'),
    shiftEnd: new Date('2024-03-20T16:00:00'),
    startDeposit: 1000,
    endDeposit: 2400,
    systemEndDeposit: 2400,
    balance: 1400,
    isAccepted: false
  }
]; 