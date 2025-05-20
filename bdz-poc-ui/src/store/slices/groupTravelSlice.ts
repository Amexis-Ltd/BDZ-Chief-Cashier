import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupTravelRequest {
  id: string;
  requestNumber: string;
  groupName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  groupType: string;
  totalPeople: number;
  childrenUnder7: number;
  peopleWithDiscount: number;
  departureDate: string | null;
  departureTime: string | null;
  departureStation: string;
  arrivalStation: string;
  hasTransfers: boolean;
  hasReturnJourney: boolean;
  returnDate: string | null;
  returnTime: string | null;
  returnDepartureStation: string;
  returnArrivalStation: string;
  returnHasTransfers: boolean;
  notes: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'ticket_issued';
  createdAt: string;
  updatedAt: string;
}

interface GroupTravelState {
  requests: GroupTravelRequest[];
  loading: boolean;
  error: string | null;
}

const generateRequestNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GT-${year}${month}${day}-${random}`;
};

const initialState: GroupTravelState = {
  requests: [
    {
      id: '1',
      requestNumber: 'GT-20240301-0001',
      groupName: 'ОУ "Христо Ботев"',
      contactPerson: 'Мария Иванова',
      contactEmail: 'maria@school.bg',
      contactPhone: '0888123456',
      groupType: 'school',
      totalPeople: 35,
      childrenUnder7: 0,
      peopleWithDiscount: 5,
      departureDate: '2024-05-15T00:00:00.000Z',
      departureTime: '2024-05-15T08:00:00.000Z',
      departureStation: '1',
      arrivalStation: '2',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-05-17T00:00:00.000Z',
      returnTime: '2024-05-17T16:00:00.000Z',
      returnDepartureStation: '2',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Учебна екскурзия',
      status: 'approved',
      createdAt: '2024-03-01T10:00:00.000Z',
      updatedAt: '2024-03-02T14:30:00.000Z'
    },
    {
      id: '2',
      requestNumber: 'GT-20240310-0002',
      groupName: 'ДГ "Слънчо"',
      contactPerson: 'Иванка Петрова',
      contactEmail: 'ivanka@kindergarten.bg',
      contactPhone: '0888777666',
      groupType: 'kindergarten',
      totalPeople: 30,
      childrenUnder7: 25,
      peopleWithDiscount: 0,
      departureDate: '2024-05-20T00:00:00.000Z',
      departureTime: '2024-05-20T08:30:00.000Z',
      departureStation: '1',
      arrivalStation: '5',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-05-20T00:00:00.000Z',
      returnTime: '2024-05-20T16:00:00.000Z',
      returnDepartureStation: '5',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Дневна екскурзия',
      status: 'approved',
      createdAt: '2024-03-10T08:00:00.000Z',
      updatedAt: '2024-03-11T10:00:00.000Z'
    },
    {
      id: '3',
      requestNumber: 'GT-20240315-0003',
      groupName: 'Спортен клуб "Орел"',
      contactPerson: 'Петър Петров',
      contactEmail: 'petar@sports.bg',
      contactPhone: '0888666555',
      groupType: 'sports',
      totalPeople: 25,
      childrenUnder7: 0,
      peopleWithDiscount: 0,
      departureDate: '2024-06-01T00:00:00.000Z',
      departureTime: '2024-06-01T07:00:00.000Z',
      departureStation: '1',
      arrivalStation: '3',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-06-03T00:00:00.000Z',
      returnTime: '2024-06-03T18:00:00.000Z',
      returnDepartureStation: '3',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Спортен събор',
      status: 'pending',
      createdAt: '2024-03-15T09:00:00.000Z',
      updatedAt: '2024-03-15T09:00:00.000Z'
    },
    {
      id: '4',
      requestNumber: 'GT-20240320-0004',
      groupName: 'Културен център "Изкуство"',
      contactPerson: 'Анна Георгиева',
      contactEmail: 'anna@art.bg',
      contactPhone: '0888444333',
      groupType: 'cultural',
      totalPeople: 40,
      childrenUnder7: 0,
      peopleWithDiscount: 10,
      departureDate: '2024-06-10T00:00:00.000Z',
      departureTime: '2024-06-10T08:00:00.000Z',
      departureStation: '1',
      arrivalStation: '4',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-06-12T00:00:00.000Z',
      returnTime: '2024-06-12T17:00:00.000Z',
      returnDepartureStation: '4',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Културно събитие',
      status: 'pending',
      createdAt: '2024-03-20T11:00:00.000Z',
      updatedAt: '2024-03-20T11:00:00.000Z'
    },
    {
      id: '5',
      requestNumber: 'GT-20240325-0005',
      groupName: 'Tech Solutions Ltd',
      contactPerson: 'Георги Иванов',
      contactEmail: 'georgi@company.bg',
      contactPhone: '0888555444',
      groupType: 'company',
      totalPeople: 50,
      childrenUnder7: 0,
      peopleWithDiscount: 0,
      departureDate: '2024-06-15T00:00:00.000Z',
      departureTime: '2024-06-15T07:00:00.000Z',
      departureStation: '1',
      arrivalStation: '6',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-06-17T00:00:00.000Z',
      returnTime: '2024-06-17T19:00:00.000Z',
      returnDepartureStation: '6',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Корпоративно събитие',
      status: 'rejected',
      createdAt: '2024-03-25T14:00:00.000Z',
      updatedAt: '2024-03-26T09:00:00.000Z'
    },
    {
      id: '6',
      requestNumber: 'GT-20240328-0006',
      groupName: 'Туристически клуб "Планинар"',
      contactPerson: 'Стоян Стоянов',
      contactEmail: 'stoyan@hiking.bg',
      contactPhone: '0888333222',
      groupType: 'other',
      totalPeople: 20,
      childrenUnder7: 0,
      peopleWithDiscount: 5,
      departureDate: '2024-07-05T00:00:00.000Z',
      departureTime: '2024-07-05T06:00:00.000Z',
      departureStation: '1',
      arrivalStation: '7',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-07-07T00:00:00.000Z',
      returnTime: '2024-07-07T20:00:00.000Z',
      returnDepartureStation: '7',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Планински преход',
      status: 'pending',
      createdAt: '2024-03-28T10:00:00.000Z',
      updatedAt: '2024-03-28T10:00:00.000Z'
    },
    {
      id: '7',
      requestNumber: 'GT-20240401-0007',
      groupName: 'Музикална школа "Мелодия"',
      contactPerson: 'Лили Иванова',
      contactEmail: 'lili@music.bg',
      contactPhone: '0888111222',
      groupType: 'cultural',
      totalPeople: 45,
      childrenUnder7: 0,
      peopleWithDiscount: 10,
      departureDate: '2024-06-20T00:00:00.000Z',
      departureTime: '2024-06-20T08:00:00.000Z',
      departureStation: '1',
      arrivalStation: '8',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-06-22T00:00:00.000Z',
      returnTime: '2024-06-22T18:00:00.000Z',
      returnDepartureStation: '8',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Музикален фестивал',
      status: 'approved',
      createdAt: '2024-04-01T09:00:00.000Z',
      updatedAt: '2024-04-02T11:00:00.000Z'
    },
    {
      id: '8',
      requestNumber: 'GT-20240405-0008',
      groupName: 'Художествена галерия "Цвете"',
      contactPerson: 'Николай Петров',
      contactEmail: 'nikolay@art.bg',
      contactPhone: '0888999000',
      groupType: 'cultural',
      totalPeople: 15,
      childrenUnder7: 0,
      peopleWithDiscount: 0,
      departureDate: '2024-07-15T00:00:00.000Z',
      departureTime: '2024-07-15T09:00:00.000Z',
      departureStation: '1',
      arrivalStation: '9',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-07-15T00:00:00.000Z',
      returnTime: '2024-07-15T17:00:00.000Z',
      returnDepartureStation: '9',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Изложба',
      status: 'pending',
      createdAt: '2024-04-05T13:00:00.000Z',
      updatedAt: '2024-04-05T13:00:00.000Z'
    },
    {
      id: '9',
      requestNumber: 'GT-20240410-0009',
      groupName: 'Спортен клуб "Победа"',
      contactPerson: 'Димитър Димитров',
      contactEmail: 'dimitar@sport.bg',
      contactPhone: '0888777888',
      groupType: 'sports',
      totalPeople: 30,
      childrenUnder7: 0,
      peopleWithDiscount: 0,
      departureDate: '2024-08-01T00:00:00.000Z',
      departureTime: '2024-08-01T07:00:00.000Z',
      departureStation: '1',
      arrivalStation: '10',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-08-03T00:00:00.000Z',
      returnTime: '2024-08-03T19:00:00.000Z',
      returnDepartureStation: '10',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Спортен турнир',
      status: 'pending',
      createdAt: '2024-03-30T10:00:00.000Z',
      updatedAt: '2024-03-30T10:00:00.000Z'
    },
    {
      id: '10',
      requestNumber: 'GT-20240412-0010',
      groupName: 'Театрална трупа "Масло"',
      contactPerson: 'Радка Иванова',
      contactEmail: 'radka@theater.bg',
      contactPhone: '0888666555',
      groupType: 'cultural',
      totalPeople: 25,
      childrenUnder7: 0,
      peopleWithDiscount: 5,
      departureDate: '2024-08-10T00:00:00.000Z',
      departureTime: '2024-08-10T08:30:00.000Z',
      departureStation: '1',
      arrivalStation: '11',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-08-12T00:00:00.000Z',
      returnTime: '2024-08-12T18:00:00.000Z',
      returnDepartureStation: '11',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Театрален фестивал',
      status: 'rejected',
      createdAt: '2024-03-31T11:00:00.000Z',
      updatedAt: '2024-04-01T09:00:00.000Z'
    },
    {
      id: '11',
      requestNumber: 'GT-20240414-0011',
      groupName: 'Ученици от 5-ти клас',
      contactPerson: 'Светла Петрова',
      contactEmail: 'svetla@school.bg',
      contactPhone: '0888444333',
      groupType: 'school',
      totalPeople: 35,
      childrenUnder7: 0,
      peopleWithDiscount: 8,
      departureDate: '2024-09-01T00:00:00.000Z',
      departureTime: '2024-09-01T08:00:00.000Z',
      departureStation: '1',
      arrivalStation: '12',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-09-03T00:00:00.000Z',
      returnTime: '2024-09-03T16:00:00.000Z',
      returnDepartureStation: '12',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Учебна екскурзия',
      status: 'pending',
      createdAt: '2024-04-01T10:00:00.000Z',
      updatedAt: '2024-04-01T10:00:00.000Z'
    },
    {
      id: '12',
      requestNumber: 'GT-20240416-0012',
      groupName: 'Танцов ансамбъл "Ритъм"',
      contactPerson: 'Мария Георгиева',
      contactEmail: 'maria@dance.bg',
      contactPhone: '0888222111',
      groupType: 'cultural',
      totalPeople: 40,
      childrenUnder7: 0,
      peopleWithDiscount: 10,
      departureDate: '2024-09-15T00:00:00.000Z',
      departureTime: '2024-09-15T07:30:00.000Z',
      departureStation: '1',
      arrivalStation: '13',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-09-17T00:00:00.000Z',
      returnTime: '2024-09-17T18:30:00.000Z',
      returnDepartureStation: '13',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Танцов конкурс',
      status: 'approved',
      createdAt: '2024-04-02T09:00:00.000Z',
      updatedAt: '2024-04-03T11:00:00.000Z'
    },
    {
      id: '13',
      requestNumber: 'GT-20240418-0013',
      groupName: 'Пенсионерски клуб "Здравей"',
      contactPerson: 'Пенка Димитрова',
      contactEmail: 'penka@seniors.bg',
      contactPhone: '0888000111',
      groupType: 'other',
      totalPeople: 45,
      childrenUnder7: 0,
      peopleWithDiscount: 45,
      departureDate: '2024-10-01T00:00:00.000Z',
      departureTime: '2024-10-01T09:00:00.000Z',
      departureStation: '1',
      arrivalStation: '14',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-10-03T00:00:00.000Z',
      returnTime: '2024-10-03T17:00:00.000Z',
      returnDepartureStation: '14',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Културна програма',
      status: 'pending',
      createdAt: '2024-04-03T10:00:00.000Z',
      updatedAt: '2024-04-03T10:00:00.000Z'
    },
    {
      id: '14',
      requestNumber: 'GT-20240420-0014',
      groupName: 'Детска градина "Звездичка"',
      contactPerson: 'Иван Иванов',
      contactEmail: 'ivan@kindergarten.bg',
      contactPhone: '0888999888',
      groupType: 'kindergarten',
      totalPeople: 30,
      childrenUnder7: 28,
      peopleWithDiscount: 0,
      departureDate: '2024-10-15T00:00:00.000Z',
      departureTime: '2024-10-15T08:30:00.000Z',
      departureStation: '1',
      arrivalStation: '15',
      hasTransfers: false,
      hasReturnJourney: true,
      returnDate: '2024-10-15T00:00:00.000Z',
      returnTime: '2024-10-15T16:00:00.000Z',
      returnDepartureStation: '15',
      returnArrivalStation: '1',
      returnHasTransfers: false,
      notes: 'Дневна екскурзия',
      status: 'pending',
      createdAt: '2024-04-04T11:00:00.000Z',
      updatedAt: '2024-04-04T11:00:00.000Z'
    },
    {
      id: '15',
      requestNumber: 'GT-20240422-0015',
      groupName: 'Корпоративен тиймбилдинг',
      contactPerson: 'Георги Петров',
      contactEmail: 'georgi@company.bg',
      contactPhone: '0888777666',
      groupType: 'company',
      totalPeople: 50,
      childrenUnder7: 0,
      peopleWithDiscount: 0,
      departureDate: '2024-11-01T00:00:00.000Z',
      departureTime: '2024-11-01T07:00:00.000Z',
      departureStation: '1',
      arrivalStation: '16',
      hasTransfers: true,
      hasReturnJourney: true,
      returnDate: '2024-11-03T00:00:00.000Z',
      returnTime: '2024-11-03T19:00:00.000Z',
      returnDepartureStation: '16',
      returnArrivalStation: '1',
      returnHasTransfers: true,
      notes: 'Корпоративно събитие',
      status: 'rejected',
      createdAt: '2024-04-05T14:00:00.000Z',
      updatedAt: '2024-04-06T09:00:00.000Z'
    }
  ],
  loading: false,
  error: null,
};

const groupTravelSlice = createSlice({
  name: 'groupTravel',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<GroupTravelRequest[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<GroupTravelRequest>) => {
      const newRequest = {
        ...action.payload,
        requestNumber: generateRequestNumber()
      };
      state.requests.push(newRequest);
    },
    updateRequest: (state, action: PayloadAction<GroupTravelRequest>) => {
      const index = state.requests.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    deleteRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  setLoading,
  setError,
} = groupTravelSlice.actions;

export default groupTravelSlice.reducer; 