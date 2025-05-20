import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';

// Примерни данни за видове абонаментни карти
const subscriptionTypes = [
  {
    id: 1,
    name: "Ученическа",
    description: "За ученици и студенти",
    priceTable: "ученическа",
    validityOptions: ["седмична", "месечна", "тримесечна"],
    documentsRequired: ["ученическа карта"]
  },
  {
    id: 2,
    name: "Пенсионерска",
    description: "За пенсионери",
    priceTable: "пенсионерска",
    validityOptions: ["месечна", "тримесечна", "годишна"],
    documentsRequired: ["пенсионерска карта", "лична карта"]
  },
  {
    id: 3,
    name: "Стандартна",
    description: "За всички пътници",
    priceTable: "стандартна",
    validityOptions: ["еднодневна", "седмична", "месечна", "годишна"],
    documentsRequired: ["лична карта"]
  },
  {
    id: 4,
    name: "Корпоративна",
    description: "За фирми и организации",
    priceTable: "корпоративна",
    validityOptions: ["месечна", "годишна"],
    documentsRequired: ["фирмена идентификация"]
  },
  {
    id: 5,
    name: "Специална",
    description: "За хора с увреждания",
    priceTable: "специална",
    validityOptions: ["месечна", "годишна"],
    documentsRequired: ["ТЕЛК решение", "лична карта"]
  }
];

// Примерни данни за ценови таблици
const priceTables = {
  "ученическа": {
    "седмична": {
      "втора_клас": {
        "зона_1": 10,
        "зона_2": 15,
        "зона_3": 20,
        "всички_зони": 25
      },
      "първа_клас": {
        "зона_1": 15,
        "зона_2": 22.5,
        "зона_3": 30,
        "всички_зони": 37.5
      }
    },
    "месечна": {
      "втора_клас": {
        "зона_1": 30,
        "зона_2": 45,
        "зона_3": 60,
        "всички_зони": 75
      },
      "първа_клас": {
        "зона_1": 45,
        "зона_2": 67.5,
        "зона_3": 90,
        "всички_зони": 112.5
      }
    },
    "тримесечна": {
      "втора_клас": {
        "зона_1": 80,
        "зона_2": 120,
        "зона_3": 160,
        "всички_зони": 200
      },
      "първа_клас": {
        "зона_1": 120,
        "зона_2": 180,
        "зона_3": 240,
        "всички_зони": 300
      }
    }
  },
  "стандартна": {
    "еднодневна": {
      "втора_клас": {
        "зона_1": 5,
        "зона_2": 8,
        "зона_3": 12,
        "всички_зони": 15
      },
      "първа_клас": {
        "зона_1": 7.5,
        "зона_2": 12,
        "зона_3": 18,
        "всички_зони": 22.5
      }
    },
    "седмична": {
      "втора_клас": {
        "зона_1": 25,
        "зона_2": 35,
        "зона_3": 45,
        "всички_зони": 60
      },
      "първа_клас": {
        "зона_1": 37.5,
        "зона_2": 52.5,
        "зона_3": 67.5,
        "всички_зони": 90
      }
    },
    "месечна": {
      "втора_клас": {
        "зона_1": 90,
        "зона_2": 120,
        "зона_3": 150,
        "всички_зони": 200
      },
      "първа_клас": {
        "зона_1": 135,
        "зона_2": 180,
        "зона_3": 225,
        "всички_зони": 300
      }
    },
    "годишна": {
      "втора_клас": {
        "зона_1": 900,
        "зона_2": 1200,
        "зона_3": 1500,
        "всички_зони": 2000
      },
      "първа_клас": {
        "зона_1": 1350,
        "зона_2": 1800,
        "зона_3": 2250,
        "всички_зони": 3000
      }
    }
  },
  "пенсионерска": {
    "месечна": {
      "втора_клас": {
        "зона_1": 65,
        "зона_2": 85,
        "зона_3": 105,
        "всички_зони": 140
      },
      "първа_клас": {
        "зона_1": 100,
        "зона_2": 130,
        "зона_3": 160,
        "всички_зони": 210
      }
    },
    "тримесечна": {
      "втора_клас": {
        "зона_1": 160,
        "зона_2": 210,
        "зона_3": 260,
        "всички_зони": 350
      },
      "първа_клас": {
        "зона_1": 240,
        "зона_2": 315,
        "зона_3": 390,
        "всички_зони": 525
      }
    },
    "годишна": {
      "втора_клас": {
        "зона_1": 550,
        "зона_2": 750,
        "зона_3": 950,
        "всички_зони": 1300
      },
      "първа_клас": {
        "зона_1": 825,
        "зона_2": 1125,
        "зона_3": 1425,
        "всички_зони": 1950
      }
    }
  },
  "корпоративна": {
    "месечна": {
      "втора_клас": {
        "зона_1": 100,
        "зона_2": 140,
        "зона_3": 180,
        "всички_зони": 240
      },
      "първа_клас": {
        "зона_1": 150,
        "зона_2": 210,
        "зона_3": 270,
        "всички_зони": 360
      }
    },
    "годишна": {
      "втора_клас": {
        "зона_1": 1000,
        "зона_2": 1400,
        "зона_3": 1800,
        "всички_зони": 2400
      },
      "първа_клас": {
        "зона_1": 1500,
        "зона_2": 2100,
        "зона_3": 2700,
        "всички_зони": 3600
      }
    }
  },
  "специална": {
    "месечна": {
      "втора_клас": {
        "зона_1": 45,
        "зона_2": 60,
        "зона_3": 75,
        "всички_зони": 100
      },
      "първа_клас": {
        "зона_1": 70,
        "зона_2": 90,
        "зона_3": 115,
        "всички_зони": 150
      }
    },
    "годишна": {
      "втора_клас": {
        "зона_1": 450,
        "зона_2": 600,
        "зона_3": 750,
        "всички_зони": 1000
      },
      "първа_клас": {
        "зона_1": 700,
        "зона_2": 900,
        "зона_3": 1150,
        "всички_зони": 1500
      }
    }
  }
};

// Дефинирайте интерфейс за ценовата таблица
interface PriceTable {
  [cardType: string]: {
    [validityPeriod: string]: {
      [travelClass: string]: {
        [zone: string]: number;
      };
    };
  };
}

// Компонент за таб панел
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subscription-tabpanel-${index}`}
      aria-labelledby={`subscription-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SubscriptionCardsManagementPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [calcCardType, setCalcCardType] = useState('');
  const [calcValidityPeriod, setCalcValidityPeriod] = useState('');
  const [calcTravelClass, setCalcTravelClass] = useState('втора_клас');
  const [calcZones, setCalcZones] = useState('зона_1');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  
  // Стейтове за диалог на карта
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [newCardData, setNewCardData] = useState({
    name: '',
    description: '',
    priceTable: '',
    validityOptions: [] as string[],
    documentsRequired: [] as string[]
  });
  const [tempValidityOption, setTempValidityOption] = useState('');
  const [tempDocumentRequired, setTempDocumentRequired] = useState('');
  const [cardTypes, setCardTypes] = useState(subscriptionTypes);
  
  // Стейт за редактиране
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  
  // Стейт за изтриване
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);
  
  // Стейтове за редактиране на ценова таблица
  const [openEditPriceTableDialog, setOpenEditPriceTableDialog] = useState(false);
  const [editingPriceTable, setEditingPriceTable] = useState('');
  const [editingValidityPeriod, setEditingValidityPeriod] = useState('');
  const [priceTableData, setPriceTableData] = useState<{
    [key: string]: {
      [key: string]: number
    }
  }>({});
  const [priceTablesState, setPriceTablesState] = useState<PriceTable>(priceTables);
  
  // Стейтове за издаване на карта
  const [openIssueCardDialog, setOpenIssueCardDialog] = useState(false);
  const [personData, setPersonData] = useState({
    firstName: '',
    lastName: '',
    egn: '',
    idCard: '',
    address: '',
    phone: '',
    email: '',
    startDate: new Date().toISOString().split('T')[0], // днешна дата
    documentType: '',
    documentNumber: '',
    documentExpiry: '',
    notes: ''
  });
  const [issueSuccess, setIssueSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCalculatePrice = () => {
    if (calcCardType && calcValidityPeriod && calcTravelClass && calcZones) {
      const selectedTable = priceTablesState[calcCardType as keyof typeof priceTablesState];
      if (selectedTable) {
        const validityTable = selectedTable[calcValidityPeriod as keyof typeof selectedTable];
        if (validityTable) {
          const classTable = validityTable[calcTravelClass as keyof typeof validityTable];
          if (classTable) {
            const price = classTable[calcZones as keyof typeof classTable];
            setCalculatedPrice(price);
          }
        }
      }
    }
  };

  const handleOpenNewCardDialog = () => {
    setIsEditing(false);
    setEditingCardId(null);
    setNewCardData({
      name: '',
      description: '',
      priceTable: '',
      validityOptions: [],
      documentsRequired: []
    });
    setOpenNewCardDialog(true);
  };

  const handleOpenEditCardDialog = (cardId: number) => {
    const cardToEdit = cardTypes.find(card => card.id === cardId);
    if (cardToEdit) {
      setIsEditing(true);
      setEditingCardId(cardId);
      setNewCardData({
        name: cardToEdit.name,
        description: cardToEdit.description,
        priceTable: cardToEdit.priceTable,
        validityOptions: [...cardToEdit.validityOptions],
        documentsRequired: [...cardToEdit.documentsRequired]
      });
      setOpenNewCardDialog(true);
    }
  };

  const handleCloseNewCardDialog = () => {
    setOpenNewCardDialog(false);
    setNewCardData({
      name: '',
      description: '',
      priceTable: '',
      validityOptions: [],
      documentsRequired: []
    });
    setTempValidityOption('');
    setTempDocumentRequired('');
    setIsEditing(false);
    setEditingCardId(null);
  };

  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddValidityOption = () => {
    if (tempValidityOption && !newCardData.validityOptions.includes(tempValidityOption)) {
      setNewCardData(prev => ({
        ...prev,
        validityOptions: [...prev.validityOptions, tempValidityOption]
      }));
      setTempValidityOption('');
    }
  };

  const handleRemoveValidityOption = (option: string) => {
    setNewCardData(prev => ({
      ...prev,
      validityOptions: prev.validityOptions.filter(item => item !== option)
    }));
  };

  const handleAddDocumentRequired = () => {
    if (tempDocumentRequired && !newCardData.documentsRequired.includes(tempDocumentRequired)) {
      setNewCardData(prev => ({
        ...prev,
        documentsRequired: [...prev.documentsRequired, tempDocumentRequired]
      }));
      setTempDocumentRequired('');
    }
  };

  const handleRemoveDocumentRequired = (document: string) => {
    setNewCardData(prev => ({
      ...prev,
      documentsRequired: prev.documentsRequired.filter(item => item !== document)
    }));
  };

  const handleAddNewCard = () => {
    if (newCardData.name && newCardData.description) {
      if (isEditing && editingCardId !== null) {
        // Редактиране на съществуваща карта
        setCardTypes(prev => prev.map(card => 
          card.id === editingCardId 
            ? { ...card, ...newCardData } 
            : card
        ));
      } else {
        // Добавяне на нова карта
        const newCard = {
          id: Math.max(...cardTypes.map(card => card.id)) + 1,
          ...newCardData
        };
        
        setCardTypes(prev => [...prev, newCard]);
      }
      handleCloseNewCardDialog();
    }
  };

  const handleOpenDeleteDialog = (cardId: number) => {
    setDeletingCardId(cardId);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingCardId(null);
  };
  
  const handleDeleteCard = () => {
    if (deletingCardId !== null) {
      setCardTypes(prev => prev.filter(card => card.id !== deletingCardId));
      handleCloseDeleteDialog();
    }
  };

  const handleOpenEditPriceTableDialog = () => {
    if (calcCardType) {
      let validityToUse = calcValidityPeriod;
      
      // Ако няма избран период, използвай първия наличен
      if (!validityToUse) {
        const cardPeriods = Object.keys(priceTablesState[calcCardType as keyof typeof priceTablesState] || {});
        if (cardPeriods.length > 0) {
          validityToUse = cardPeriods[0];
        } else {
          // Няма периоди за тази карта
          return;
        }
      }
      
      setEditingPriceTable(calcCardType);
      setEditingValidityPeriod(validityToUse);
      
      // Инициализиране на данните за редактиране
      const tableData: {
        [key: string]: {
          [key: string]: number
        }
      } = {};
      
      const validityTable = priceTablesState[calcCardType as keyof typeof priceTablesState][
        validityToUse as keyof typeof priceTablesState[typeof calcCardType]
      ];
      
      if (validityTable) {
        Object.keys(validityTable).forEach(travelClass => {
          tableData[travelClass] = {
            зона_1: (validityTable as any)[travelClass].зона_1,
            зона_2: (validityTable as any)[travelClass].зона_2,
            зона_3: (validityTable as any)[travelClass].зона_3,
            всички_зони: (validityTable as any)[travelClass].всички_зони
          };
        });
      }
      
      setPriceTableData(tableData);
      setOpenEditPriceTableDialog(true);
    }
  };
  
  const handleClosePriceTableDialog = () => {
    setOpenEditPriceTableDialog(false);
    setEditingPriceTable('');
    setEditingValidityPeriod('');
    setPriceTableData({});
  };
  
  const handlePriceChange = (travelClass: string, zone: string, value: string) => {
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      setPriceTableData(prev => ({
        ...prev,
        [travelClass]: {
          ...prev[travelClass],
          [zone]: numValue
        }
      }));
    }
  };
  
  const handleSavePriceTable = () => {
    if (editingPriceTable && editingValidityPeriod) {
      const updatedPriceTables = { ...priceTablesState };
      
      // Дълбоко копиране и обновяване
      const cardType = editingPriceTable as keyof typeof updatedPriceTables;
      const validityPeriod = editingValidityPeriod as keyof typeof updatedPriceTables[typeof cardType];
      
      if (updatedPriceTables[cardType] && updatedPriceTables[cardType][validityPeriod]) {
        Object.keys(priceTableData).forEach(travelClass => {
          (updatedPriceTables[cardType][validityPeriod] as any)[travelClass] = {
            зона_1: priceTableData[travelClass].зона_1,
            зона_2: priceTableData[travelClass].зона_2,
            зона_3: priceTableData[travelClass].зона_3,
            всички_зони: priceTableData[travelClass].всички_зони
          };
        });
      }
      
      setPriceTablesState(updatedPriceTables);
      handleClosePriceTableDialog();
    }
  };

  const handleOpenIssueCardDialog = () => {
    if (calculatedPrice !== null) {
      setOpenIssueCardDialog(true);
      setIssueSuccess(false);
      setCardNumber('');
    }
  };
  
  const handleCloseIssueCardDialog = () => {
    setOpenIssueCardDialog(false);
    if (!issueSuccess) {
      // Ако не е успешно издадена карта, нулираме данните
      setPersonData({
        firstName: '',
        lastName: '',
        egn: '',
        idCard: '',
        address: '',
        phone: '',
        email: '',
        startDate: new Date().toISOString().split('T')[0],
        documentType: '',
        documentNumber: '',
        documentExpiry: '',
        notes: ''
      });
    }
  };
  
  const handlePersonDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleIssueCard = () => {
    // Тук би имало API заявка за издаване на карта
    // За демо целите просто ще симулираме успешно издаване
    
    // Генериране на случаен номер на карта
    const randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const newCardNumber = `AC${randomNumber}`;
    
    setCardNumber(newCardNumber);
    setIssueSuccess(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Управление на абонаментни карти
      </Typography>
      
      <Typography variant="body1" paragraph>
        Управление на различни видове абонаментни карти и техните ценови таблици. Таблиците са организирани според вида на картата, срока на валидност, класа и зоните.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="subscription cards tabs">
          <Tab label="Видове абонаментни карти" id="tab-0" />
          <Tab label="Ценови таблици" id="tab-1" />
          <Tab label="Калкулатор" id="tab-2" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Видове абонаментни карти
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenNewCardDialog}
            >
              Добави нов вид
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell>Валидност</TableCell>
                  <TableCell>Изисквани документи</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>
                      {type.validityOptions.map((option) => (
                        <Chip 
                          key={option} 
                          label={option} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      {type.documentsRequired.map((doc) => (
                        <Chip 
                          key={doc} 
                          label={doc} 
                          size="small" 
                          color="info"
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenEditCardDialog(type.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleOpenDeleteDialog(type.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ценови таблици за абонаментни карти
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Вид абонаментна карта</InputLabel>
              <Select
                value={calcCardType}
                onChange={(e) => setCalcCardType(e.target.value)}
                label="Вид абонаментна карта"
              >
                <MenuItem value="">-- Изберете --</MenuItem>
                <MenuItem value="ученическа">Ученическа</MenuItem>
                <MenuItem value="стандартна">Стандартна</MenuItem>
                <MenuItem value="пенсионерска">Пенсионерска</MenuItem>
                <MenuItem value="корпоративна">Корпоративна</MenuItem>
                <MenuItem value="специална">Специална</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {calcCardType && priceTablesState[calcCardType as keyof typeof priceTablesState] && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Таблица за {calcCardType} карта
              </Typography>
              
              {Object.keys(priceTablesState[calcCardType as keyof typeof priceTablesState]).map((validityPeriod) => (
                <Box key={validityPeriod} sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Период: {validityPeriod}
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Клас</TableCell>
                          <TableCell>Зона 1</TableCell>
                          <TableCell>Зона 2</TableCell>
                          <TableCell>Зона 3</TableCell>
                          <TableCell>Всички зони</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(priceTablesState[calcCardType as keyof typeof priceTablesState][validityPeriod as keyof typeof priceTablesState[typeof calcCardType]]).map((travelClass) => (
                          <TableRow key={travelClass}>
                            <TableCell>{travelClass.replace('_', ' ')}</TableCell>
                            <TableCell>{priceTablesState[calcCardType as keyof typeof priceTablesState][validityPeriod as keyof typeof priceTablesState[typeof calcCardType]][travelClass as keyof typeof priceTablesState[typeof calcCardType][typeof validityPeriod]].зона_1} лв.</TableCell>
                            <TableCell>{priceTablesState[calcCardType as keyof typeof priceTablesState][validityPeriod as keyof typeof priceTablesState[typeof calcCardType]][travelClass as keyof typeof priceTablesState[typeof calcCardType][typeof validityPeriod]].зона_2} лв.</TableCell>
                            <TableCell>{priceTablesState[calcCardType as keyof typeof priceTablesState][validityPeriod as keyof typeof priceTablesState[typeof calcCardType]][travelClass as keyof typeof priceTablesState[typeof calcCardType][typeof validityPeriod]].зона_3} лв.</TableCell>
                            <TableCell>{priceTablesState[calcCardType as keyof typeof priceTablesState][validityPeriod as keyof typeof priceTablesState[typeof calcCardType]][travelClass as keyof typeof priceTablesState[typeof calcCardType][typeof validityPeriod]].всички_зони} лв.</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleOpenEditPriceTableDialog}
                  disabled={!calcCardType}
                >
                  Редактирай таблица
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Калкулатор за абонаментни карти
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Параметри
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Вид абонаментна карта</InputLabel>
                  <Select
                    value={calcCardType}
                    onChange={(e) => setCalcCardType(e.target.value)}
                    label="Вид абонаментна карта"
                  >
                    <MenuItem value="">-- Изберете --</MenuItem>
                    <MenuItem value="ученическа">Ученическа</MenuItem>
                    <MenuItem value="стандартна">Стандартна</MenuItem>
                    <MenuItem value="пенсионерска">Пенсионерска</MenuItem>
                    <MenuItem value="корпоративна">Корпоративна</MenuItem>
                    <MenuItem value="специална">Специална</MenuItem>
                  </Select>
                </FormControl>
                
                {calcCardType && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Период на валидност</InputLabel>
                    <Select
                      value={calcValidityPeriod}
                      onChange={(e) => setCalcValidityPeriod(e.target.value)}
                      label="Период на валидност"
                    >
                      <MenuItem value="">-- Изберете --</MenuItem>
                      {priceTablesState[calcCardType as keyof typeof priceTablesState] && 
                        Object.keys(priceTablesState[calcCardType as keyof typeof priceTablesState]).map((period) => (
                          <MenuItem key={period} value={period}>{period}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                )}
                
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Клас
                  </Typography>
                  <RadioGroup
                    row
                    value={calcTravelClass}
                    onChange={(e) => setCalcTravelClass(e.target.value)}
                  >
                    <FormControlLabel value="първа_клас" control={<Radio />} label="Първа класа" />
                    <FormControlLabel value="втора_клас" control={<Radio />} label="Втора класа" />
                  </RadioGroup>
                </FormControl>
                
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Обхват на ЖП мрежата
                  </Typography>
                  <RadioGroup
                    value={calcZones}
                    onChange={(e) => setCalcZones(e.target.value)}
                  >
                    <FormControlLabel value="зона_1" control={<Radio />} label="Зона 1 (до 50 км)" />
                    <FormControlLabel value="зона_2" control={<Radio />} label="Зона 2 (50-100 км)" />
                    <FormControlLabel value="зона_3" control={<Radio />} label="Зона 3 (100-150 км)" />
                    <FormControlLabel value="всички_зони" control={<Radio />} label="Всички зони (цялата мрежа)" />
                  </RadioGroup>
                </FormControl>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CalculateIcon />}
                  onClick={handleCalculatePrice}
                  disabled={!calcCardType || !calcValidityPeriod}
                  fullWidth
                >
                  Изчисли цена
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Резултат
                </Typography>
                
                {calculatedPrice !== null ? (
                  <>
                    <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                      {calculatedPrice.toFixed(2)} лв.
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {calcCardType} карта, {calcValidityPeriod} период, {calcTravelClass.replace('_', ' ')}, {calcZones.replace('_', ' ')}
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 3 }}
                      onClick={handleOpenIssueCardDialog}
                    >
                      Издай абонаментна карта
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Изберете параметри и натиснете "Изчисли цена", за да видите резултата
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Модален диалог за добавяне/редактиране на карта */}
      <Dialog 
        open={openNewCardDialog} 
        onClose={handleCloseNewCardDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isEditing ? 'Редактиране на абонаментна карта' : 'Добавяне на нов вид абонаментна карта'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Име на картата"
                value={newCardData.name}
                onChange={handleNewCardChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="priceTable"
                label="Ценова таблица"
                value={newCardData.priceTable}
                onChange={handleNewCardChange}
                helperText="Име на ценовата таблица (напр. ученическа, стандартна)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Описание"
                value={newCardData.description}
                onChange={handleNewCardChange}
                required
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Периоди на валидност
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  value={tempValidityOption}
                  onChange={(e) => setTempValidityOption(e.target.value)}
                  label="Период на валидност"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddValidityOption}
                  disabled={!tempValidityOption}
                >
                  Добави
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {newCardData.validityOptions.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onDelete={() => handleRemoveValidityOption(option)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
                {newCardData.validityOptions.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Няма добавени периоди на валидност
                  </Typography>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Изисквани документи
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  value={tempDocumentRequired}
                  onChange={(e) => setTempDocumentRequired(e.target.value)}
                  label="Изискван документ"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddDocumentRequired}
                  disabled={!tempDocumentRequired}
                >
                  Добави
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {newCardData.documentsRequired.map((doc) => (
                  <Chip
                    key={doc}
                    label={doc}
                    color="info"
                    onDelete={() => handleRemoveDocumentRequired(doc)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
                {newCardData.documentsRequired.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Няма добавени изисквани документи
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCardDialog}>Отказ</Button>
          <Button 
            onClick={handleAddNewCard} 
            variant="contained" 
            disabled={!newCardData.name || !newCardData.description}
          >
            {isEditing ? 'Запази промените' : 'Добави'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за потвърждение на изтриване */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <Typography>
            Сигурни ли сте, че искате да изтриете тази абонаментна карта?
            {deletingCardId && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {cardTypes.find(card => card.id === deletingCardId)?.name}
              </Typography>
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Това действие не може да бъде отменено.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Отказ</Button>
          <Button 
            onClick={handleDeleteCard} 
            variant="contained" 
            color="error"
          >
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за редактиране на ценова таблица */}
      <Dialog
        open={openEditPriceTableDialog}
        onClose={handleClosePriceTableDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Редактиране на ценова таблица
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, mt: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              {editingPriceTable} карта, период: {editingValidityPeriod}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Редактирайте цените за всяка зона и клас
            </Typography>
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Клас</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Зона 1 (лв.)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Зона 2 (лв.)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Зона 3 (лв.)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Всички зони (лв.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(priceTableData).map((travelClass) => (
                  <TableRow key={travelClass}>
                    <TableCell>{travelClass.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={priceTableData[travelClass].зона_1}
                        onChange={(e) => handlePriceChange(travelClass, 'зона_1', e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">лв.</InputAdornment>
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={priceTableData[travelClass].зона_2}
                        onChange={(e) => handlePriceChange(travelClass, 'зона_2', e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">лв.</InputAdornment>
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={priceTableData[travelClass].зона_3}
                        onChange={(e) => handlePriceChange(travelClass, 'зона_3', e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">лв.</InputAdornment>
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={priceTableData[travelClass].всички_зони}
                        onChange={(e) => handlePriceChange(travelClass, 'всички_зони', e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">лв.</InputAdornment>
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePriceTableDialog}>Отказ</Button>
          <Button 
            onClick={handleSavePriceTable} 
            variant="contained" 
            color="primary"
          >
            Запази промените
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Диалог за издаване на абонаментна карта */}
      <Dialog
        open={openIssueCardDialog}
        onClose={handleCloseIssueCardDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {issueSuccess ? 'Абонаментна карта издадена успешно' : 'Издаване на абонаментна карта'}
        </DialogTitle>
        <DialogContent>
          {!issueSuccess ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Данни за карта
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Тип: {calcCardType} | Период: {calcValidityPeriod} | Клас: {calcTravelClass.replace('_', ' ')} | Зона: {calcZones.replace('_', ' ')} | Цена: {calculatedPrice?.toFixed(2)} лв.
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Карта № <b>AC_______</b> (ще бъде определен автоматично)
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Име"
                  name="firstName"
                  value={personData.firstName}
                  onChange={handlePersonDataChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Фамилия"
                  name="lastName"
                  value={personData.lastName}
                  onChange={handlePersonDataChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ЕГН"
                  name="egn"
                  value={personData.egn}
                  onChange={handlePersonDataChange}
                  required
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Лична карта №"
                  name="idCard"
                  value={personData.idCard}
                  onChange={handlePersonDataChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Адрес"
                  name="address"
                  value={personData.address}
                  onChange={handlePersonDataChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  name="phone"
                  value={personData.phone}
                  onChange={handlePersonDataChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Имейл"
                  name="email"
                  type="email"
                  value={personData.email}
                  onChange={handlePersonDataChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Начална дата"
                  name="startDate"
                  type="date"
                  value={personData.startDate}
                  onChange={handlePersonDataChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Документ за намаление (ако е приложимо)
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Вид документ"
                  name="documentType"
                  value={personData.documentType}
                  onChange={handlePersonDataChange}
                  placeholder="Напр. ТЕЛК решение, ученическа карта..."
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Номер на документ"
                  name="documentNumber"
                  value={personData.documentNumber}
                  onChange={handlePersonDataChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Валиден до"
                  name="documentExpiry"
                  type="date"
                  value={personData.documentExpiry}
                  onChange={handlePersonDataChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Забележка"
                  name="notes"
                  value={personData.notes}
                  onChange={handlePersonDataChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                border: '1px solid', 
                borderColor: 'primary.main', 
                borderRadius: 1, 
                p: 4, 
                mb: 3,
                maxWidth: 500,
                mx: 'auto'
              }}>
                <Typography variant="h5" gutterBottom color="primary">
                  АБОНАМЕНТНА КАРТА
                </Typography>
                
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  № {cardNumber}
                </Typography>
                
                <Divider flexItem sx={{ mb: 2 }} />
                
                <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
                  {personData.firstName} {personData.lastName}
                </Typography>
                
                <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
                  ЕГН: {personData.egn} | Л.К. №: {personData.idCard}
                </Typography>
                
                <Box sx={{ width: '100%', my: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Тип карта:</Typography>
                      <Typography variant="body2">{calcCardType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Валидност:</Typography>
                      <Typography variant="body2">{calcValidityPeriod}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Клас:</Typography>
                      <Typography variant="body2">{calcTravelClass.replace('_', ' ')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Зона:</Typography>
                      <Typography variant="body2">{calcZones.replace('_', ' ')}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Divider flexItem sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2">
                    От: {personData.startDate}
                  </Typography>
                  <Typography variant="body2">
                    {calcValidityPeriod === 'месечна' && `До: ${new Date(new Date(personData.startDate).setMonth(new Date(personData.startDate).getMonth() + 1)).toISOString().split('T')[0]}`}
                    {calcValidityPeriod === 'тримесечна' && `До: ${new Date(new Date(personData.startDate).setMonth(new Date(personData.startDate).getMonth() + 3)).toISOString().split('T')[0]}`}
                    {calcValidityPeriod === 'годишна' && `До: ${new Date(new Date(personData.startDate).setFullYear(new Date(personData.startDate).getFullYear() + 1)).toISOString().split('T')[0]}`}
                    {calcValidityPeriod === 'седмична' && `До: ${new Date(new Date(personData.startDate).setDate(new Date(personData.startDate).getDate() + 7)).toISOString().split('T')[0]}`}
                    {calcValidityPeriod === 'еднодневна' && `До: ${new Date(new Date(personData.startDate).setDate(new Date(personData.startDate).getDate() + 1)).toISOString().split('T')[0]}`}
                  </Typography>
                </Box>
                
                <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
                  {calculatedPrice?.toFixed(2)} лв.
                </Typography>
              </Box>
              
              <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                Абонаментната карта е издадена успешно. Можете да я разпечатате или да я изпратите по имейл.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" color="primary" startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/><path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/></svg>}>
                  Принтирай
                </Button>
                <Button variant="outlined" color="primary" startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/></svg>}>
                  Изпрати по имейл
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIssueCardDialog}>
            {issueSuccess ? 'Затвори' : 'Отказ'}
          </Button>
          {!issueSuccess && (
            <Button 
              onClick={handleIssueCard} 
              variant="contained" 
              color="primary"
              disabled={!personData.firstName || !personData.lastName || !personData.egn || !personData.idCard || !personData.address || !personData.phone || !personData.startDate}
            >
              Издай карта
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
    </Container>
  );
};

export default SubscriptionCardsManagementPage; 