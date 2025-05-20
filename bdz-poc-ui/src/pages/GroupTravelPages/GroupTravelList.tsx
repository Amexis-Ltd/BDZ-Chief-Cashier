import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Menu,
  Divider,
  CircularProgress,
  Alert,
  Stack,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Clear as ClearIcon, 
  FilterList as FilterIcon, 
  ExpandLess as ExpandLessIcon, 
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Print as PrintIcon,
  Description as DescriptionIcon,
  Send as SendIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Train as TrainIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import QRCode from 'react-qr-code';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteRequest, GroupTravelRequest, updateRequest } from '../../store/slices/groupTravelSlice';
import { bg } from 'date-fns/locale';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReactDOM from 'react-dom/client';

interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  departureStation: string;
  arrivalStation: string;
  groupType: string;
  groupName: string;
  contactPerson: string;
  requestNumber: string;
}

const initialFilterState: FilterState = {
  startDate: null,
  endDate: null,
  status: '',
  departureStation: '',
  arrivalStation: '',
  groupType: '',
  groupName: '',
  contactPerson: '',
  requestNumber: '',
};

interface GroupType {
  id: string;
  name: string;
}

const groupTypes: GroupType[] = [
  { id: 'school', name: 'Училище' },
  { id: 'kindergarten', name: 'Детска градина' },
  { id: 'sports', name: 'Спортен клуб' },
  { id: 'cultural', name: 'Културна институция' },
  { id: 'company', name: 'Фирма' },
  { id: 'other', name: 'Друго' }
];

interface TrainAvailability {
  trainNumber: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  price: number;
  route: string;
  type: string;
}

interface PriceCalculation {
  basePrice: number;
  groupDiscount: number;
  childrenDiscount: number;
  discountCardDiscount: number;
  totalPrice: number;
  priceBreakdown: {
    description: string;
    amount: number;
  }[];
}

type ProcessingStep = 
  | 'details' 
  | 'checking' 
  | 'available' 
  | 'unavailable' 
  | 'price_confirmation' 
  | 'confirmation_sent';

type TicketIssuanceStep = 
  | 'search' 
  | 'details' 
  | 'payment' 
  | 'payment_confirmation' 
  | 'ticket_generation' 
  | 'ticket_sent';

interface PaymentDetails {
  method: 'cash' | 'pos' | 'bank_transfer';
  amount: number;
  confirmationNumber?: string;
  date: string;
}

interface Station {
  id: string;
  name: string;
}

const getStationName = (stationId: string, stations: Station[]) => {
  const station = stations.find(s => s.id === stationId);
  return station ? station.name : stationId;
};


const GroupTravelList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.groupTravel.requests);
  const stations = useAppSelector((state) => state.stations.stations);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [selectedRequestForDocument, setSelectedRequestForDocument] = useState<GroupTravelRequest | null>(null);
  const [processingDialogOpen, setProcessingDialogOpen] = useState(false);
  const [selectedRequestForProcessing, setSelectedRequestForProcessing] = useState<GroupTravelRequest | null>(null);
  const [availableTrains, setAvailableTrains] = useState<TrainAvailability[]>([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('details');
  const [priceCalculation, setPriceCalculation] = useState<PriceCalculation | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<TrainAvailability | null>(null);
  const [confirmationMethods, setConfirmationMethods] = useState<string[]>([]);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [selectedRequestForTicket, setSelectedRequestForTicket] = useState<GroupTravelRequest | null>(null);
  const [ticketStep, setTicketStep] = useState<TicketIssuanceStep>('search');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'cash',
    amount: 0,
    date: new Date().toISOString()
  });

  const handleAdd = () => {
    navigate('/group-travel/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/group-travel/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setRequestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (requestToDelete) {
      dispatch(deleteRequest(requestToDelete));
      setDeleteDialogOpen(false);
      setRequestToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRequestToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'paid':
        return 'info';
      case 'ticket_issued':
        return 'success';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Одобрена';
      case 'rejected':
        return 'Отхвърлена';
      case 'paid':
        return 'Платена';
      case 'ticket_issued':
        return 'Издаден билет';
      default:
        return 'Чака обработка';
    }
  };

  const getStatusTooltip = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Заявката е одобрена';
      case 'rejected':
        return 'Заявката е отхвърлена';
      case 'paid':
        return 'Заявката е платена';
      case 'ticket_issued':
        return 'Билетът е издаден';
      default:
        return 'Заявката чака обработка';
    }
  };

  const getGroupTypeLabel = (type: string) => {
    switch (type) {
      case 'school':
        return 'Училище';
      case 'kindergarten':
        return 'Детска градина';
      case 'sports':
        return 'Спортен клуб';
      case 'cultural':
        return 'Културна институция';
      case 'company':
        return 'Фирма';
      case 'other':
        return 'Друго';
      default:
        return type;
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesDateRange = (!filters.startDate || new Date(request.departureDate!) >= filters.startDate) &&
        (!filters.endDate || new Date(request.departureDate!) <= filters.endDate);
      
      const matchesStatus = !filters.status || request.status === filters.status;
      
      const matchesRoute = (!filters.departureStation || request.departureStation === filters.departureStation) &&
        (!filters.arrivalStation || request.arrivalStation === filters.arrivalStation);
      
      const matchesGroupType = !filters.groupType || request.groupType === filters.groupType;

      const matchesGroupName = !filters.groupName || 
        request.groupName.toLowerCase().includes(filters.groupName.toLowerCase());

      const matchesContactPerson = !filters.contactPerson || 
        request.contactPerson.toLowerCase().includes(filters.contactPerson.toLowerCase());

      const matchesRequestNumber = !filters.requestNumber || 
        request.requestNumber?.toLowerCase().includes(filters.requestNumber.toLowerCase());
      
      return matchesDateRange && matchesStatus && matchesRoute && matchesGroupType && 
        matchesGroupName && matchesContactPerson && matchesRequestNumber;
    });
  }, [requests, filters]);

  const handleFiltersToggle = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, requestId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRequestId(requestId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRequestId(null);
  };

  const handleShowDocument = (request: GroupTravelRequest) => {
    setSelectedRequestForDocument(request);
    setDocumentDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseDocument = () => {
    setDocumentDialogOpen(false);
    setSelectedRequestForDocument(null);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const handlePrintTicket = () => {
    if (selectedRequestForTicket) {
      // Calculate price for the ticket
      const priceCalculation = calculatePrice(selectedRequestForTicket);

      // Add print styles
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body > *:not(#print-content) {
            display: none !important;
          }
          #print-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            padding: 20px;
            margin: 0;
            z-index: 9999;
          }
          .print-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #000;
            padding: 20px;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 4px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1976d2;
          }
          .info-row {
            margin-bottom: 5px;
          }
          .qr-code {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #000;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
          }
          .price-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .price-table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }
          .price-table td:last-child {
            text-align: right;
          }
          .total-price {
            font-weight: bold;
            font-size: 1.1em;
          }
        }
      `;
      document.head.appendChild(style);

      // Create print content
      const printContent = document.createElement('div');
      printContent.id = 'print-content';
      printContent.innerHTML = `
        <div class="print-container">
          <div class="header">
            <h1>БДЖ - Групови билети</h1>
            <h2>${selectedRequestForTicket.groupName}</h2>
          </div>
          
          <div class="section">
            <div class="section-title">Детайли за пътуването</div>
            <div class="info-row">
              <strong>Маршрут:</strong> ${getStationName(selectedRequestForTicket.departureStation, stations)} → ${getStationName(selectedRequestForTicket.arrivalStation, stations)}
            </div>
            <div class="info-row">
              <strong>Дата:</strong> ${new Date(selectedRequestForTicket.departureDate!).toLocaleDateString('bg-BG')}
            </div>
            <div class="info-row">
              <strong>Час:</strong> ${new Date(selectedRequestForTicket.departureTime!).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Информация за пътниците</div>
            <div class="info-row">
              <strong>Общ брой пътници:</strong> ${selectedRequestForTicket.totalPeople} души
            </div>
            <div class="info-row">
              <strong>Деца до 7г.:</strong> ${selectedRequestForTicket.childrenUnder7}
            </div>
            <div class="info-row">
              <strong>Пътници с намаление:</strong> ${selectedRequestForTicket.peopleWithDiscount}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Изчисление на цена</div>
            <table class="price-table">
              <tbody>
                ${priceCalculation.priceBreakdown.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.amount.toFixed(2)} лв.</td>
                  </tr>
                `).join('')}
                <tr class="total-price">
                  <td>Обща сума</td>
                  <td>${priceCalculation.totalPrice.toFixed(2)} лв.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="qr-code">
            <div id="qr-code-container"></div>
            <div style="margin-top: 10px">Номер на заявка: ${selectedRequestForTicket.requestNumber}</div>
          </div>

          <div class="footer">
            Този документ е валиден само заедно с лична карта
          </div>
        </div>
      `;
      document.body.appendChild(printContent);

      // Create QR code using React
      const qrContainer = printContent.querySelector('#qr-code-container');
      if (qrContainer) {
        const root = ReactDOM.createRoot(qrContainer);
        root.render(
          <QRCode
            value={selectedRequestForTicket.id}
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 150 150`}
          />
        );
      }

      // Print
      window.print();

      // Cleanup
      document.body.removeChild(printContent);
      document.head.removeChild(style);
    }
  };

  const handlePrintProcessing = () => {
    if (selectedRequestForProcessing) {
      // Calculate price for the request
      const priceCalculation = calculatePrice(selectedRequestForProcessing);

      // Add print styles
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body > *:not(#print-content) {
            display: none !important;
          }
          #print-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            padding: 20px;
            margin: 0;
            z-index: 9999;
          }
          .print-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #000;
            padding: 20px;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 4px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1976d2;
          }
          .info-row {
            margin-bottom: 5px;
          }
          .qr-code {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #000;
          }
          .price-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .price-table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }
          .price-table td:last-child {
            text-align: right;
          }
          .total-price {
            font-weight: bold;
            font-size: 1.1em;
          }
        }
      `;
      document.head.appendChild(style);

      // Create print content
      const printContent = document.createElement('div');
      printContent.id = 'print-content';
      printContent.innerHTML = `
        <div class="print-container">
          <div class="header">
            <h1>Потвърждение за обработка</h1>
            <h2>${selectedRequestForProcessing.groupName}</h2>
          </div>
          
          <div class="section">
            <div class="section-title">Информация за контакт</div>
            <div class="info-row"><strong>Контактно лице:</strong> ${selectedRequestForProcessing.contactPerson}</div>
            <div class="info-row"><strong>Email:</strong> ${selectedRequestForProcessing.contactEmail}</div>
            <div class="info-row"><strong>Телефон:</strong> ${selectedRequestForProcessing.contactPhone}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Детайли за пътуването</div>
            <div class="info-row"><strong>Маршрут:</strong> ${getStationName(selectedRequestForProcessing.departureStation, stations)} → ${getStationName(selectedRequestForProcessing.arrivalStation, stations)}</div>
            <div class="info-row"><strong>Дата:</strong> ${new Date(selectedRequestForProcessing.departureDate!).toLocaleDateString('bg-BG')}</div>
            <div class="info-row"><strong>Час:</strong> ${new Date(selectedRequestForProcessing.departureTime!).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>

          <div class="section">
            <div class="section-title">Информация за пътниците</div>
            <div class="info-row"><strong>Общ брой пътници:</strong> ${selectedRequestForProcessing.totalPeople} души</div>
            <div class="info-row"><strong>Деца до 7г.:</strong> ${selectedRequestForProcessing.childrenUnder7}</div>
            <div class="info-row"><strong>Пътници с намаление:</strong> ${selectedRequestForProcessing.peopleWithDiscount}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Изчисление на цена</div>
            <table class="price-table">
              <tbody>
                ${priceCalculation.priceBreakdown.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.amount.toFixed(2)} лв.</td>
                  </tr>
                `).join('')}
                <tr class="total-price">
                  <td>Обща сума</td>
                  <td>${priceCalculation.totalPrice.toFixed(2)} лв.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="qr-code">
            <div id="qr-code-container"></div>
            <div style="margin-top: 10px">Номер на заявка: ${selectedRequestForProcessing.requestNumber}</div>
          </div>
        </div>
      `;
      document.body.appendChild(printContent);

      // Create QR code using React
      const qrContainer = printContent.querySelector('#qr-code-container');
      if (qrContainer) {
        const root = ReactDOM.createRoot(qrContainer);
        root.render(
          <QRCode
            value={selectedRequestForProcessing.id}
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 150 150`}
          />
        );
      }

      // Print
      window.print();

      // Cleanup
      document.body.removeChild(printContent);
      document.head.removeChild(style);
    }
  };

  const handleResendDocument = () => {
    // TODO: Implement resend functionality
    console.log('Resending document for request:', selectedRequestForDocument?.id);
  };

  const calculatePrice = (request: GroupTravelRequest): PriceCalculation => {
    const basePrice = 10 * request.totalPeople; // Базова цена от 10 лв. на човек
    const groupDiscount = request.groupType === 'school' || request.groupType === 'kindergarten' ? 0.3 : 0;
    const childrenDiscount = request.childrenUnder7 * (10 * 0.5); // 50% отстъпка за деца
    const discountCardDiscount = request.peopleWithDiscount * (10 * 0.2); // 20% отстъпка за картини за намаление

    const priceBreakdown = [
      { description: 'Базова цена', amount: basePrice },
      { description: 'Отстъпка за група', amount: -basePrice * groupDiscount },
      { description: 'Отстъпка за деца до 7г.', amount: -childrenDiscount },
      { description: 'Отстъпка за картини за намаление', amount: -discountCardDiscount }
    ];

    const totalPrice = basePrice - (basePrice * groupDiscount) - childrenDiscount - discountCardDiscount;

    return {
      basePrice,
      groupDiscount,
      childrenDiscount,
      discountCardDiscount,
      totalPrice,
      priceBreakdown
    };
  };

  const handleProcessRequest = (request: GroupTravelRequest) => {
    setSelectedRequestForProcessing(request);
    setProcessingDialogOpen(true);
    setProcessingStep('details');
  };

  const handleCheckAvailability = async () => {
    if (!selectedRequestForProcessing) return;
    
    setProcessingStep('checking');
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      const specialCases = ['Елена Димитрова', 'Елена'];
      const isSpecialCase = specialCases.some(name => 
        selectedRequestForProcessing.contactPerson.toLowerCase().includes(name.toLowerCase())
      );

      if (isSpecialCase) {
        setAvailableTrains([]);
        setProcessingStep('unavailable');
        return;
      }

      const mockTrains: TrainAvailability[] = [
        {
          trainNumber: '1234',
          departureTime: '08:00',
          arrivalTime: '10:30',
          availableSeats: 45,
          price: 1200,
          route: 'София - Пловдив',
          type: 'Бърз'
        },
        {
          trainNumber: '5678',
          departureTime: '10:15',
          arrivalTime: '12:45',
          availableSeats: 30,
          price: 1100,
          route: 'София - Пловдив',
          type: 'Пътнически'
        }
      ];
      
      setAvailableTrains(mockTrains);
      setProcessingStep(mockTrains.some(train => train.availableSeats >= selectedRequestForProcessing.totalPeople) ? 'available' : 'unavailable');
    }, 2000);
  };

  const handleTrainSelection = (train: TrainAvailability) => {
    setSelectedTrain(train);
    if (selectedRequestForProcessing) {
      const priceCalc = calculatePrice(selectedRequestForProcessing);
      setPriceCalculation(priceCalc);
      setProcessingStep('price_confirmation');
    }
  };

  const handleConfirmReservation = async () => {
    if (!selectedRequestForProcessing || !selectedTrain || !priceCalculation) return;

    // TODO: Replace with actual API call to block seats
    setTimeout(() => {
      const updatedRequest: GroupTravelRequest = {
        ...selectedRequestForProcessing,
        status: 'approved',
        updatedAt: new Date().toISOString()
      };
      
      dispatch(updateRequest(updatedRequest));
      setProcessingStep('confirmation_sent');
    }, 1000);
  };

  const handleSendConfirmation = () => {
    if (confirmationMethods.includes('email')) {
      // TODO: Implement email sending
      console.log('Sending confirmation email...');
    }
    if (confirmationMethods.includes('print')) {
      handlePrintProcessing();
    }
    setProcessingDialogOpen(false);
    setSelectedRequestForProcessing(null);
  };

  const handleRejectReservation = async () => {
    if (!selectedRequestForProcessing) return;

    const updatedRequest: GroupTravelRequest = {
      ...selectedRequestForProcessing,
      status: 'rejected',
      notes: `Отказана заявка. Причина: ${rejectionReason}`,
      updatedAt: new Date().toISOString()
    };
    
    dispatch(updateRequest(updatedRequest));
    setProcessingDialogOpen(false);
    setSelectedRequestForProcessing(null);
    setRejectionReason('');
  };

  const handleIssueTicket = (request: GroupTravelRequest) => {
    setSelectedRequestForTicket(request);
    setTicketDialogOpen(true);
    setTicketStep('details');
    handleMenuClose();
  };

  const handlePaymentConfirmation = () => {
    if (!selectedRequestForTicket) return;

    const updatedRequest: GroupTravelRequest = {
      ...selectedRequestForTicket,
      status: 'paid',
      updatedAt: new Date().toISOString()
    };
    
    dispatch(updateRequest(updatedRequest));
    setTicketStep('ticket_generation');
  };

  const handleGenerateTicket = () => {
    if (!selectedRequestForTicket) return;

    const updatedRequest: GroupTravelRequest = {
      ...selectedRequestForTicket,
      status: 'ticket_issued',
      updatedAt: new Date().toISOString()
    };
    
    dispatch(updateRequest(updatedRequest));
    setTicketStep('ticket_sent');
  };

  const handleSendTicketConfirmation = () => {
    if (!selectedRequestForTicket) return;

    // Update the request status
    dispatch(updateRequest({
      ...selectedRequestForTicket,
      status: 'ticket_issued'
    }));

    // Close the dialog and reset state
    setTicketDialogOpen(false);
    setSelectedRequestForTicket(null);
    setPaymentDetails({
      method: 'cash',
      amount: 0,
      date: new Date().toISOString()
    });

    if (confirmationMethods.includes('email')) {
      // TODO: Implement email sending
      console.log('Sending ticket confirmation email...');
    }
    if (confirmationMethods.includes('print')) {
      handlePrintTicket();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Групови пътувания
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleFiltersToggle}
              startIcon={filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              endIcon={<FilterIcon />}
            >
              {filtersExpanded ? 'Скрий филтрите' : 'Покажи филтрите'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Нова заявка
            </Button>
          </Box>
        </Box>

        {/* Филтри */}
        <Collapse in={filtersExpanded} timeout={300}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Филтри
              </Typography>
              <IconButton 
                onClick={handleFiltersToggle}
                size="small"
                sx={{ 
                  transition: 'transform 0.3s',
                  transform: filtersExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <ExpandLessIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Първи ред - Номер на заявка и Име на групата */}
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Основна информация
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Номер на заявка"
                    value={filters.requestNumber}
                    onChange={(e) => setFilters(prev => ({ ...prev, requestNumber: e.target.value }))}
                    sx={{ backgroundColor: 'white' }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Име на групата"
                    value={filters.groupName}
                    onChange={(e) => setFilters(prev => ({ ...prev, groupName: e.target.value }))}
                    sx={{ backgroundColor: 'white' }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Контактно лице"
                    value={filters.contactPerson}
                    onChange={(e) => setFilters(prev => ({ ...prev, contactPerson: e.target.value }))}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Box>
              </Box>

              {/* Втори ред - Дата и Статус */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                    <DatePicker
                      label="От дата"
                      value={filters.startDate}
                      onChange={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                      slotProps={{ 
                        textField: { 
                          size: 'small', 
                          fullWidth: true,
                          sx: { backgroundColor: 'white' }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                    <DatePicker
                      label="До дата"
                      value={filters.endDate}
                      onChange={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                      slotProps={{ 
                        textField: { 
                          size: 'small', 
                          fullWidth: true,
                          sx: { backgroundColor: 'white' }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    label="Статус"
                  >
                    <MenuItem value="">Всички</MenuItem>
                    <MenuItem value="pending">Чакащи</MenuItem>
                    <MenuItem value="approved">Одобрени</MenuItem>
                    <MenuItem value="rejected">Отхвърлени</MenuItem>
                    <MenuItem value="paid">Платени</MenuItem>
                    <MenuItem value="ticket_issued">Издадени билети</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Втори ред - Маршрут */}
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Маршрут
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                  <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                    <InputLabel>Начална гара</InputLabel>
                    <Select
                      value={filters.departureStation}
                      onChange={(e) => setFilters(prev => ({ ...prev, departureStation: e.target.value }))}
                      label="Начална гара"
                    >
                      <MenuItem value="">Всички</MenuItem>
                      {stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                    <InputLabel>Крайна гара</InputLabel>
                    <Select
                      value={filters.arrivalStation}
                      onChange={(e) => setFilters(prev => ({ ...prev, arrivalStation: e.target.value }))}
                      label="Крайна гара"
                    >
                      <MenuItem value="">Всички</MenuItem>
                      {stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Трети ред - Тип група */}
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Тип група
                </Typography>
                <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                  <InputLabel>Изберете тип група</InputLabel>
                  <Select
                    value={filters.groupType}
                    onChange={(e) => setFilters(prev => ({ ...prev, groupType: e.target.value }))}
                    label="Изберете тип група"
                  >
                    <MenuItem value="">Всички</MenuItem>
                    {groupTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Бутони за действие */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => setFilters(initialFilterState)}
                  startIcon={<ClearIcon />}
                  sx={{ minWidth: 150 }}
                >
                  Изчисти филтрите
                </Button>
              </Box>
            </Box>
          </Paper>
        </Collapse>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер</TableCell>
                <TableCell>Име на групата</TableCell>
                <TableCell>Контактно лице</TableCell>
                <TableCell>Брой хора</TableCell>
                <TableCell>Дата на тръгване</TableCell>
                <TableCell>Маршрут</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.requestNumber}</TableCell>
                  <TableCell>{request.groupName}</TableCell>
                  <TableCell>{request.contactPerson}</TableCell>
                  <TableCell>{request.totalPeople}</TableCell>
                  <TableCell>
                    {new Date(request.departureDate!).toLocaleDateString('bg-BG')}
                  </TableCell>
                  <TableCell>
                    {getStationName(request.departureStation, stations)} → {getStationName(request.arrivalStation, stations)}
                  </TableCell>
                  <TableCell>{getGroupTypeLabel(request.groupType)}</TableCell>
                  <TableCell>
                    <Tooltip title={getStatusTooltip(request.status)}>
                      <Chip
                        label={getStatusLabel(request.status)}
                        color={getStatusColor(request.status)}
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, request.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 180 }
        }}
      >
        {selectedRequestId && !['approved', 'paid', 'ticket_issued'].includes(requests.find(r => r.id === selectedRequestId)?.status || '') && (
          <MenuItem onClick={() => {
            const request = requests.find(r => r.id === selectedRequestId);
            if (request) {
              handleShowDocument(request);
            }
          }}>
            <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
            Покажи документ
          </MenuItem>
        )}
        {selectedRequestId && requests.find(r => r.id === selectedRequestId)?.status === 'pending' && (
          <MenuItem onClick={() => {
            const request = requests.find(r => r.id === selectedRequestId);
            if (request) {
              handleProcessRequest(request);
            }
          }}>
            <TrainIcon fontSize="small" sx={{ mr: 1 }} />
            Обработка
          </MenuItem>
        )}
        {selectedRequestId && requests.find(r => r.id === selectedRequestId)?.status === 'approved' && (
          <MenuItem onClick={() => {
            const request = requests.find(r => r.id === selectedRequestId);
            if (request) {
              handleIssueTicket(request);
            }
          }}>
            <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
            Издаване на групов билет
          </MenuItem>
        )}
        {selectedRequestId && !['approved', 'paid', 'ticket_issued'].includes(requests.find(r => r.id === selectedRequestId)?.status || '') && (
          <MenuItem onClick={() => {
            handleEdit(selectedRequestId!);
            handleMenuClose();
          }}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Редактирай
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            handleDeleteClick(selectedRequestId!);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Изтрий
        </MenuItem>
      </Menu>

      {/* Document Dialog */}
      <Dialog
        open={documentDialogOpen}
        onClose={handleCloseDocument}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ position: 'relative' }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
            Заявка за групов билет
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDocument}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRequestForDocument && (
            <Box sx={{ p: 3 }}>
              <Paper sx={{ p: 4, position: 'relative' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {selectedRequestForDocument.groupName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Заявка №{selectedRequestForDocument.id}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <QRCode 
                      value={selectedRequestForDocument.id}
                      size={100}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 100 100`}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Contact Information */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Информация за контакт
                  </Typography>
                  <Typography variant="body2">
                    Име: {selectedRequestForDocument.contactPerson}
                  </Typography>
                  <Typography variant="body2">
                    Email: {selectedRequestForDocument.contactEmail}
                  </Typography>
                  <Typography variant="body2">
                    Телефон: {selectedRequestForDocument.contactPhone}
                  </Typography>
                </Box>

                {/* Journey Details */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Детайли за пътуването
                  </Typography>
                  <Typography variant="body2">
                    Маршрут: {getStationName(selectedRequestForDocument.departureStation, stations)} → {getStationName(selectedRequestForDocument.arrivalStation, stations)}
                  </Typography>
                  <Typography variant="body2">
                    Дата: {new Date(selectedRequestForDocument.departureDate!).toLocaleDateString('bg-BG')}
                  </Typography>
                  <Typography variant="body2">
                    Час: {new Date(selectedRequestForDocument.departureTime!).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>

                {/* Group Details */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Информация за групата
                  </Typography>
                  <Typography variant="body2">
                    Тип: {getGroupTypeLabel(selectedRequestForDocument.groupType)}
                  </Typography>
                  <Typography variant="body2">
                    Общ брой: {selectedRequestForDocument.totalPeople}
                  </Typography>
                  <Typography variant="body2">
                    Деца до 7г.: {selectedRequestForDocument.childrenUnder7}
                  </Typography>
                  <Typography variant="body2">
                    Пътници с намаление: {selectedRequestForDocument.peopleWithDiscount}
                  </Typography>
                </Box>

                {/* Notes */}
                {selectedRequestForDocument.notes && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Забележки
                    </Typography>
                    <Typography variant="body2">
                      {selectedRequestForDocument.notes}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrintDocument}
            startIcon={<PrintIcon />}
          >
            Принтирай
          </Button>
          <Button
            variant="contained"
            onClick={handleResendDocument}
            startIcon={<SendIcon />}
          >
            Изпрати повторно
          </Button>
        </DialogActions>
      </Dialog>

      {/* Processing Dialog */}
      <Dialog
        open={processingDialogOpen}
        onClose={() => setProcessingDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ position: 'relative' }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
            Обработка на заявка
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setProcessingDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRequestForProcessing && (
            <Box sx={{ p: 3 }}>
              {processingStep === 'details' && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Детайли за заявката
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Основна информация</Typography>
                      <Typography>Група: {selectedRequestForProcessing.groupName}</Typography>
                      <Typography>Контакт: {selectedRequestForProcessing.contactPerson}</Typography>
                      <Typography>Брой хора: {selectedRequestForProcessing.totalPeople}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Пътуване</Typography>
                      <Typography>
                        Маршрут: {getStationName(selectedRequestForProcessing.departureStation, stations)} → {getStationName(selectedRequestForProcessing.arrivalStation, stations)}
                      </Typography>
                      <Typography>
                        Дата: {new Date(selectedRequestForProcessing.departureDate!).toLocaleDateString('bg-BG')}
                      </Typography>
                      <Typography>
                        Час: {new Date(selectedRequestForProcessing.departureTime!).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={handleCheckAvailability}
                      startIcon={<TrainIcon />}
                    >
                      Разпредели места
                    </Button>
                  </Box>
                </Box>
              )}

              {processingStep === 'checking' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
                  <CircularProgress />
                  <Typography>
                    Проверка на наличност...
                  </Typography>
                </Box>
              )}

              {processingStep === 'available' && (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Намерени са подходящи влакове с достатъчно места!
                  </Alert>
                  
                  <Typography variant="h6" gutterBottom>
                    Достъпни влакове
                  </Typography>
                  
                  <Stack spacing={2}>
                    {availableTrains.map((train) => (
                      <Paper 
                        key={train.trainNumber} 
                        sx={{ 
                          p: 2,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                        onClick={() => handleTrainSelection(train)}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1">
                              Влак {train.trainNumber} ({train.type})
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {train.route}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {train.departureTime} - {train.arrivalTime}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle1">
                              {train.availableSeats} свободни места
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Цена: {train.price} лв.
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {processingStep === 'price_confirmation' && priceCalculation && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Изчисление на цена
                  </Typography>
                  
                  <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                      <TableBody>
                        {priceCalculation.priceBreakdown.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell align="right">{item.amount.toFixed(2)} лв.</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell><strong>Обща сума</strong></TableCell>
                          <TableCell align="right"><strong>{priceCalculation.totalPrice.toFixed(2)} лв.</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleConfirmReservation}
                      startIcon={<CheckCircleIcon />}
                    >
                      Потвърди резервация
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setProcessingStep('available')}
                    >
                      Назад
                    </Button>
                  </Box>
                </Box>
              )}

              {processingStep === 'confirmation_sent' && (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Резервацията е потвърдена успешно!
                  </Alert>

                  <Typography variant="h6" gutterBottom>
                    Изпращане на потвърждение
                  </Typography>

                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmationMethods.includes('email')}
                          onChange={(e) => {
                            setConfirmationMethods(prev => e.target.checked
                              ? [...prev, 'email']
                              : prev.filter(m => m !== 'email')
                            );
                          }}
                        />
                      }
                      label="Изпрати по имейл"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmationMethods.includes('print')}
                          onChange={(e) => {
                            setConfirmationMethods(prev => e.target.checked
                              ? [...prev, 'print']
                              : prev.filter(m => m !== 'print')
                            );
                          }}
                        />
                      }
                      label="Принтирай"
                    />
                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={handleSendConfirmation}
                      startIcon={<SendIcon />}
                    >
                      Изпрати
                    </Button>
                  </Box>
                </Box>
              )}

              {processingStep === 'unavailable' && (
                <Box>
                  <Alert severity="error" sx={{ mb: 3 }}>
                    Няма достатъчно места за избраните дати и маршрути
                  </Alert>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Причина за отказ
                    </Typography>
                    <TextField
                      multiline
                      rows={4}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Въведете причина за отказ на заявката..."
                    />
                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleRejectReservation}
                      startIcon={<CancelIcon />}
                    >
                      Откажи заявка
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setProcessingStep('details')}
                    >
                      Провери отново
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Ticket Issuance Dialog */}
      <Dialog
        open={ticketDialogOpen}
        onClose={() => setTicketDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ position: 'relative' }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
            Издаване на групов билет
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setTicketDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRequestForTicket && (
            <Box sx={{ p: 3 }}>
              {ticketStep === 'details' && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Детайли за резервацията
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Основна информация</Typography>
                      <Typography>Група: {selectedRequestForTicket.groupName}</Typography>
                      <Typography>Контакт: {selectedRequestForTicket.contactPerson}</Typography>
                      <Typography>Брой хора: {selectedRequestForTicket.totalPeople}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Пътуване</Typography>
                      <Typography>
                        Маршрут: {getStationName(selectedRequestForTicket.departureStation, stations)} → {getStationName(selectedRequestForTicket.arrivalStation, stations)}
                      </Typography>
                      <Typography>
                        Дата: {new Date(selectedRequestForTicket.departureDate!).toLocaleDateString('bg-BG')}
                      </Typography>
                      <Typography>
                        Час: {new Date(selectedRequestForTicket.departureTime!).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => setTicketStep('payment')}
                      startIcon={<PaymentIcon />}
                    >
                      Продължи към плащане
                    </Button>
                  </Box>
                </Box>
              )}

              {ticketStep === 'payment' && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Плащане
                  </Typography>
                  
                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Метод на плащане
                    </Typography>
                    <RadioGroup
                      value={paymentDetails.method}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, method: e.target.value as PaymentDetails['method'] }))}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="В брой"
                      />
                      <FormControlLabel
                        value="pos"
                        control={<Radio />}
                        label="ПОС терминал"
                      />
                      <FormControlLabel
                        value="bank_transfer"
                        control={<Radio />}
                        label="Банков превод"
                      />
                    </RadioGroup>
                  </FormControl>

                  {paymentDetails.method === 'bank_transfer' && (
                    <TextField
                      fullWidth
                      label="Номер на превод"
                      value={paymentDetails.confirmationNumber || ''}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, confirmationNumber: e.target.value }))}
                      sx={{ mb: 3 }}
                    />
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handlePaymentConfirmation}
                      startIcon={<CheckCircleIcon />}
                    >
                      Потвърди плащането
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setTicketStep('details')}
                    >
                      Назад
                    </Button>
                  </Box>
                </Box>
              )}

              {ticketStep === 'ticket_generation' && (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Плащането е потвърдено успешно!
                  </Alert>

                  <Typography variant="h6" gutterBottom>
                    Генериране на групов билет
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleGenerateTicket}
                      startIcon={<DescriptionIcon />}
                    >
                      Генерирай билет
                    </Button>
                  </Box>
                </Box>
              )}

              {ticketStep === 'ticket_sent' && (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Груповият билет е генериран успешно!
                  </Alert>

                  <Typography variant="h6" gutterBottom>
                    Изпращане на билета
                  </Typography>

                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmationMethods.includes('email')}
                          onChange={(e) => {
                            setConfirmationMethods(prev => e.target.checked
                              ? [...prev, 'email']
                              : prev.filter(m => m !== 'email')
                            );
                          }}
                        />
                      }
                      label="Изпрати по имейл"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmationMethods.includes('print')}
                          onChange={(e) => {
                            setConfirmationMethods(prev => e.target.checked
                              ? [...prev, 'print']
                              : prev.filter(m => m !== 'print')
                            );
                          }}
                        />
                      }
                      label="Принтирай"
                    />
                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={handleSendTicketConfirmation}
                      startIcon={<SendIcon />}
                    >
                      Изпрати
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете тази заявка? Това действие не може да бъде отменено.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Отказ</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroupTravelList; 