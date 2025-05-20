import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Checkbox,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';

// Интерфейс за версия на тарифа
interface TariffVersion {
  id: number;
  versionNumber: string;
  createdAt: Date;
  createdBy: string;
  changeReason: string;
  changes: TariffChange[];
  isActive: boolean;
}

// Интерфейс за промяна в тарифа
interface TariffChange {
  id: number;
  entityType: 'rule' | 'discount' | 'service' | 'promotion';
  entityId: number;
  entityName: string;
  changeType: 'create' | 'update' | 'delete';
  changedFields: string[];
  oldValues: Record<string, any>;
  newValues: Record<string, any>;
}

// Примерни данни за версии на тарифи
const mockTariffVersions: TariffVersion[] = [
  {
    id: 1,
    versionNumber: '1.0.0',
    createdAt: new Date(2023, 0, 15),
    createdBy: 'Иван Петров',
    changeReason: 'Първоначална версия на тарифите',
    changes: [],
    isActive: false
  },
  {
    id: 2,
    versionNumber: '1.1.0',
    createdAt: new Date(2023, 3, 10),
    createdBy: 'Мария Иванова',
    changeReason: 'Актуализация на междуселищни тарифи',
    changes: [
      {
        id: 1,
        entityType: 'rule',
        entityId: 3,
        entityName: 'Междуселищни - до 50 км',
        changeType: 'update',
        changedFields: ['basePrice'],
        oldValues: { basePrice: 0.12 },
        newValues: { basePrice: 0.15 }
      },
      {
        id: 2,
        entityType: 'rule',
        entityId: 4,
        entityName: 'Междуселищни - 50-100 км',
        changeType: 'update',
        changedFields: ['basePrice'],
        oldValues: { basePrice: 0.10 },
        newValues: { basePrice: 0.12 }
      }
    ],
    isActive: false
  },
  {
    id: 3,
    versionNumber: '1.2.0',
    createdAt: new Date(2023, 5, 1),
    createdBy: 'Георги Димитров',
    changeReason: 'Добавяне на нови видове намаления',
    changes: [
      {
        id: 3,
        entityType: 'discount',
        entityId: 7,
        entityName: 'Групово (над 10 човека)',
        changeType: 'create',
        changedFields: ['name', 'percent'],
        oldValues: {},
        newValues: { name: 'Групово (над 10 човека)', percent: 30 }
      },
      {
        id: 4,
        entityType: 'discount',
        entityId: 8,
        entityName: 'Ранно закупуване (14+ дни)',
        changeType: 'create',
        changedFields: ['name', 'percent'],
        oldValues: {},
        newValues: { name: 'Ранно закупуване (14+ дни)', percent: 15 }
      }
    ],
    isActive: false
  },
  {
    id: 4,
    versionNumber: '2.0.0',
    createdAt: new Date(2023, 7, 15),
    createdBy: 'Петър Стоянов',
    changeReason: 'Въвеждане на промоционални тарифи',
    changes: [
      {
        id: 5,
        entityType: 'promotion',
        entityId: 1,
        entityName: 'Лятна промоция',
        changeType: 'create',
        changedFields: ['name', 'discountPercent', 'type'],
        oldValues: {},
        newValues: { name: 'Лятна промоция', discountPercent: 20, type: 'seasonal' }
      },
      {
        id: 6,
        entityType: 'promotion',
        entityId: 3,
        entityName: 'Намаление за Родопския регион',
        changeType: 'create',
        changedFields: ['name', 'discountPercent', 'type', 'regions'],
        oldValues: {},
        newValues: { 
          name: 'Намаление за Родопския регион', 
          discountPercent: 30, 
          type: 'regional',
          regions: ['Смолян', 'Пловдив', 'Пазарджик', 'Кърджали']
        }
      }
    ],
    isActive: false
  },
  {
    id: 5,
    versionNumber: '2.1.0',
    createdAt: new Date(2023, 9, 20),
    createdBy: 'Мария Иванова',
    changeReason: 'Актуализация на допълнителни услуги',
    changes: [
      {
        id: 7,
        entityType: 'service',
        entityId: 2,
        entityName: 'Голям багаж',
        changeType: 'update',
        changedFields: ['price'],
        oldValues: { price: 4.00 },
        newValues: { price: 5.00 }
      },
      {
        id: 8,
        entityType: 'service',
        entityId: 5,
        entityName: 'Промяна на резервация',
        changeType: 'create',
        changedFields: ['name', 'price', 'description'],
        oldValues: {},
        newValues: { 
          name: 'Промяна на резервация', 
          price: 1.50, 
          description: 'Такса за промяна на съществуваща резервация' 
        }
      }
    ],
    isActive: true
  }
];

// Функция за превеждане на имената на полетата на български
const translateFieldName = (field: string): string => {
  const translations: Record<string, string> = {
    'name': 'Име',
    'basePrice': 'Базова цена',
    'zoneType': 'Тип зона',
    'notes': 'Описание',
    'percent': 'Процент намаление',
    'price': 'Цена',
    'description': 'Описание',
    'discountPercent': 'Процент отстъпка',
    'startDate': 'Начална дата',
    'endDate': 'Крайна дата',
    'isActive': 'Активен статус',
    'type': 'Тип',
    'regions': 'Региони'
  };

  return translations[field] || field;
};

const TariffVersionsPage: React.FC = () => {
  // Състояние за управление на версиите на тарифи
  const [tariffVersions, setTariffVersions] = useState(mockTariffVersions);
  const [selectedVersions, setSelectedVersions] = useState<number[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [versionToRestore, setVersionToRestore] = useState<TariffVersion | null>(null);
  
  // Състояние за създаване на нова версия
  const [newVersionDialogOpen, setNewVersionDialogOpen] = useState(false);
  const [newVersionData, setNewVersionData] = useState({
    versionNumber: '',
    changeReason: ''
  });

  // Обработчици за управление на версиите
  const handleVersionSelect = (versionId: number) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else {
        // В режим на сравнение позволяваме само две версии
        if (compareMode && prev.length >= 2) {
          return [prev[1], versionId];
        }
        return [...prev, versionId];
      }
    });
  };
  
  const handleCompareClick = () => {
    if (selectedVersions.length !== 2) {
      // Ако не са избрани точно 2 версии, избираме последните две
      const sortedVersions = [...tariffVersions].sort((a, b) => b.id - a.id);
      if (sortedVersions.length >= 2) {
        setSelectedVersions([sortedVersions[0].id, sortedVersions[1].id]);
      }
    }
    setCompareMode(true);
  };
  
  const handleCloseCompare = () => {
    setCompareMode(false);
  };
  
  const handleRestoreVersionClick = (version: TariffVersion) => {
    setVersionToRestore(version);
    setShowConfirmDialog(true);
  };
  
  const handleConfirmRestore = () => {
    if (versionToRestore) {
      // Тук би имало логика за възстановяване на данните от избраната версия
      
      // Симулираме успешно възстановяване
      setTariffVersions(prev => prev.map(v => ({
        ...v,
        isActive: v.id === versionToRestore.id
      })));
      
      setShowConfirmDialog(false);
      setVersionToRestore(null);
    }
  };
  
  const handleCancelRestore = () => {
    setShowConfirmDialog(false);
    setVersionToRestore(null);
  };
  
  const handleOpenNewVersionDialog = () => {
    // Генерираме предложение за нов номер на версия
    const currentVersion = tariffVersions.find(v => v.isActive)?.versionNumber || '0.0.0';
    const [major, minor, _patch] = currentVersion.split('.').map(Number);
    const nextVersion = `${major}.${minor + 1}.0`;
    
    setNewVersionData({
      versionNumber: nextVersion,
      changeReason: ''
    });
    setNewVersionDialogOpen(true);
  };
  
  const handleCloseNewVersionDialog = () => {
    setNewVersionDialogOpen(false);
  };
  
  const handleNewVersionDataChange = (field: string, value: string) => {
    setNewVersionData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCreateNewVersion = () => {
    // Създаваме нова версия на тарифите
    const newVersion: TariffVersion = {
      id: Math.max(...tariffVersions.map(v => v.id)) + 1,
      versionNumber: newVersionData.versionNumber,
      createdAt: new Date(),
      createdBy: 'Текущ потребител', // В реален сценарий това би било името на текущия потребител
      changeReason: newVersionData.changeReason,
      changes: [], // Реално тук би имало информация за промените
      isActive: true
    };
    
    // Отбелязваме всички други версии като неактивни
    setTariffVersions(prev => [
      ...prev.map(v => ({ ...v, isActive: false })),
      newVersion
    ]);
    
    setNewVersionDialogOpen(false);
  };
  
  // Функция за форматиране на дата
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          История и версии на тарифите
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Управление и сравнение на различни версии на тарифните планове
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            История и версии на тарифите
          </Typography>
          <Box>
            {selectedVersions.length === 2 && !compareMode && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
                onClick={handleCompareClick}
              >
                Сравни избраните версии
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenNewVersionDialog}
            >
              Създай нова версия
            </Button>
          </Box>
        </Box>
        
        {compareMode ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Сравнение на версии</Typography>
              <Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    // Тук би се имплементирала функционалност за експорт на сравнението
                    alert('Функционалност за експорт на сравнението!');
                  }}
                >
                  Експортирай сравнението
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCloseCompare}
                >
                  Затвори сравнението
                </Button>
              </Box>
            </Box>
            
            {selectedVersions.length === 2 && (
              <>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {selectedVersions.map(versionId => {
                    const version = tariffVersions.find(v => v.id === versionId);
                    if (!version) return null;
                    
                    return (
                      <Grid item xs={12} sm={6} key={version.id}>
                        <Paper sx={{ p: 2, border: theme => `2px solid ${theme.palette.primary.main}`, height: '100%' }}>
                          <Typography variant="h6" gutterBottom>{version.versionNumber}</Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Създадена на:</strong> {formatDate(version.createdAt)}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Създадена от:</strong> {version.createdBy}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Причина за промяната:</strong> {version.changeReason}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Брой промени:</strong> {version.changes.length}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Статус:</strong> {version.isActive ? 'Активна' : 'Архивирана'}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
                
                {/* Филтри за сравнението */}
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>Филтри за сравнение</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="entity-type-filter-label">Тип елемент</InputLabel>
                        <Select
                          labelId="entity-type-filter-label"
                          id="entity-type-filter"
                          value={"all"}
                          label="Тип елемент"
                        >
                          <MenuItem value="all">Всички</MenuItem>
                          <MenuItem value="rule">Ценови правила</MenuItem>
                          <MenuItem value="discount">Видове намаления</MenuItem>
                          <MenuItem value="service">Допълнителни услуги</MenuItem>
                          <MenuItem value="promotion">Промоции</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="change-type-filter-label">Тип промяна</InputLabel>
                        <Select
                          labelId="change-type-filter-label"
                          id="change-type-filter"
                          value={"all"}
                          label="Тип промяна"
                        >
                          <MenuItem value="all">Всички</MenuItem>
                          <MenuItem value="create">Създаване</MenuItem>
                          <MenuItem value="update">Обновяване</MenuItem>
                          <MenuItem value="delete">Изтриване</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Търсене по име"
                        placeholder="Въведете част от името на елемента"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                
                <Typography variant="h6" gutterBottom>Разлики между версиите</Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Елемент</TableCell>
                        <TableCell>Тип промяна</TableCell>
                        <TableCell>Променени полета</TableCell>
                        <TableCell>Сравнение на стойностите</TableCell>
                        <TableCell>Статус</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tariffVersions
                        .filter(v => selectedVersions.includes(v.id))
                        .flatMap(v => v.changes.map(change => ({...change, versionId: v.id})))
                        .sort((a, b) => {
                          // Намираме версиите на двете промени
                          const versionA = tariffVersions.find(v => v.id === a.versionId);
                          const versionB = tariffVersions.find(v => v.id === b.versionId);
                          
                          // Сортираме по дата на версия, после по тип промяна
                          if (versionA && versionB) {
                            const dateCompare = new Date(versionB.createdAt).getTime() - new Date(versionA.createdAt).getTime();
                            if (dateCompare !== 0) return dateCompare;
                          }
                          
                          // Сортираме по тип на промяна (създаване, обновяване, изтриване)
                          const typeOrder = { create: 1, update: 2, delete: 3 };
                          return typeOrder[a.changeType] - typeOrder[b.changeType];
                        })
                        .map(change => {
                          // Намираме версията, за да покажем в коя версия е направена промяната
                          const version = tariffVersions.find(v => v.id === change.versionId);
                          
                          return (
                            <TableRow 
                              key={`${change.id}-${change.versionId}`}
                              sx={{
                                backgroundColor: change.changeType === 'create' ? 'rgba(46, 125, 50, 0.08)' : 
                                               change.changeType === 'update' ? 'rgba(25, 118, 210, 0.08)' : 
                                               'rgba(211, 47, 47, 0.08)'
                              }}
                            >
                              <TableCell>
                                <Typography variant="body2" fontWeight="bold">{change.entityName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {change.entityType === 'rule' && 'Ценово правило'}
                                  {change.entityType === 'discount' && 'Вид намаление'}
                                  {change.entityType === 'service' && 'Допълнителна услуга'}
                                  {change.entityType === 'promotion' && 'Промоция'}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={
                                    change.changeType === 'create' ? 'Създаване' : 
                                    change.changeType === 'update' ? 'Обновяване' : 'Изтриване'
                                  } 
                                  color={
                                    change.changeType === 'create' ? 'success' : 
                                    change.changeType === 'update' ? 'info' : 'error'
                                  }
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                {change.changedFields.map(field => (
                                  <Chip 
                                    key={field} 
                                    label={translateFieldName(field)} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </TableCell>
                              <TableCell>
                                {change.changedFields.map(field => (
                                  <Paper key={field} sx={{ p: 1, mb: 1, backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="caption" fontWeight="bold" display="block">
                                      {translateFieldName(field)}:
                                    </Typography>
                                    
                                    {/* Визуални индикатори за разликите */}
                                    {change.changeType === 'update' && (
                                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ 
                                          p: 1, 
                                          backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                          textDecoration: 'line-through',
                                          borderRadius: 1,
                                          wordBreak: 'break-word'
                                        }}>
                                          {typeof change.oldValues[field] === 'object' 
                                            ? JSON.stringify(change.oldValues[field] || '-', null, 2) 
                                            : String(change.oldValues[field] || '-')}
                                        </Box>
                                        <Box sx={{ 
                                          p: 1, 
                                          backgroundColor: 'rgba(76, 175, 80, 0.08)',
                                          borderRadius: 1,
                                          wordBreak: 'break-word'
                                        }}>
                                          {typeof change.newValues[field] === 'object' 
                                            ? JSON.stringify(change.newValues[field] || '-', null, 2) 
                                            : String(change.newValues[field] || '-')}
                                        </Box>
                                      </Box>
                                    )}
                                    
                                    {/* За промени тип "създаване" показваме само новата стойност */}
                                    {change.changeType === 'create' && (
                                      <Box sx={{ 
                                        p: 1, 
                                        backgroundColor: 'rgba(76, 175, 80, 0.08)',
                                        borderRadius: 1,
                                        wordBreak: 'break-word'
                                      }}>
                                        {typeof change.newValues[field] === 'object' 
                                          ? JSON.stringify(change.newValues[field] || '-', null, 2) 
                                          : String(change.newValues[field] || '-')}
                                      </Box>
                                    )}
                                    
                                    {/* За промени тип "изтриване" показваме само старата стойност */}
                                    {change.changeType === 'delete' && (
                                      <Box sx={{ 
                                        p: 1, 
                                        backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                        textDecoration: 'line-through',
                                        borderRadius: 1,
                                        wordBreak: 'break-word'
                                      }}>
                                        {typeof change.oldValues[field] === 'object' 
                                          ? JSON.stringify(change.oldValues[field] || '-', null, 2) 
                                          : String(change.oldValues[field] || '-')}
                                      </Box>
                                    )}
                                  </Paper>
                                ))}
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  Версия: {version?.versionNumber}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(version?.createdAt || new Date())}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <span />
                  </TableCell>
                  <TableCell>Версия</TableCell>
                  <TableCell>Дата на създаване</TableCell>
                  <TableCell>Създадена от</TableCell>
                  <TableCell>Причина за промяната</TableCell>
                  <TableCell>Брой промени</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tariffVersions
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((version) => (
                  <TableRow key={version.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedVersions.includes(version.id)}
                        onChange={() => handleVersionSelect(version.id)}
                      />
                    </TableCell>
                    <TableCell>{version.versionNumber}</TableCell>
                    <TableCell>{formatDate(version.createdAt)}</TableCell>
                    <TableCell>{version.createdBy}</TableCell>
                    <TableCell>{version.changeReason}</TableCell>
                    <TableCell>{version.changes.length}</TableCell>
                    <TableCell>
                      {version.isActive ? (
                        <Chip label="Активна" color="success" size="small" />
                      ) : (
                        <Chip label="Архивирана" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {!version.isActive && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleRestoreVersionClick(version)}
                        >
                          Възстанови
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Диалог за потвърждение на възстановяване на версия */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelRestore}
      >
        <DialogTitle>Потвърдете възстановяването</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Сигурни ли сте, че искате да възстановите версия {versionToRestore?.versionNumber}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Това действие ще замени текущите активни тарифи с тези от избраната версия.
            Всички незаписани промени ще бъдат загубени.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRestore}>Отказ</Button>
          <Button variant="contained" color="primary" onClick={handleConfirmRestore}>
            Възстанови
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог за създаване на нова версия */}
      <Dialog
        open={newVersionDialogOpen}
        onClose={handleCloseNewVersionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Създаване на нова версия на тарифите</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1 }}>
            Създаването на нова версия ще запази текущото състояние на тарифите и ще го направи активно.
            Предишните версии ще бъдат архивирани и достъпни за преглед и сравнение.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Номер на версия"
                value={newVersionData.versionNumber}
                onChange={(e) => handleNewVersionDataChange('versionNumber', e.target.value)}
                helperText="Например: 1.2.0"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="Причина за промяната"
                value={newVersionData.changeReason}
                onChange={(e) => handleNewVersionDataChange('changeReason', e.target.value)}
                helperText="Опишете защо се прави тази промяна в тарифите"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewVersionDialog}>Отказ</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewVersion}
            disabled={!newVersionData.versionNumber || !newVersionData.changeReason}
          >
            Създай версия
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TariffVersionsPage; 