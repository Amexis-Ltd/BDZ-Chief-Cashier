import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, DirectionsRailway as TrainIcon, ElectricBolt as LocomotiveIcon, ContentCopy as CloneIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateComposition, addComposition, generateDailyRecords } from '../store/features/composition/compositionSlice';
import type { Wagon } from '../store/features/composition/compositionSlice';
import WagonSettingsDialog from '../components/WagonSettingsDialog/WagonSettingsDialog';
import CloneCompositionDialog from '../components/CloneCompositionDialog/CloneCompositionDialog';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { bg } from 'date-fns/locale';

const Composing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const compositions = useAppSelector((state) => state.composition.compositions);
  const [selectedTrain, setSelectedTrain] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | ''>('');
  const [selectedWagon, setSelectedWagon] = useState<{ id: number; compositionId: number } | null>(null);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
  const [selectedComposition, setSelectedComposition] = useState<number | null>(null);

  const handleEdit = (dailyRecordId: string) => {
    navigate(`/composing/edit/${dailyRecordId}`);
  };

  const handleDelete = (dailyRecordId: string) => {
    // Намираме композицията и записа, които съдържат този дневен запис
    const composition = compositions.find(c => 
      c.records.some(r => r.dailyRecords.some(dr => dr.id === dailyRecordId))
    );
    
    if (composition) {
      const record = composition.records.find(r => 
        r.dailyRecords.some(dr => dr.id === dailyRecordId)
      );
      
      if (record) {
        // Премахваме дневния запис
        const updatedDailyRecords = record.dailyRecords.filter(dr => dr.id !== dailyRecordId);
        
        // Обновяваме записа с премахнатия дневен запис
        const updatedRecords = composition.records.map(r => 
          r.id === record.id ? { ...r, dailyRecords: updatedDailyRecords } : r
        );
        
        // Обновяваме композицията
        dispatch(updateComposition({
          ...composition,
          records: updatedRecords
        }));
      }
    }
  };

  const handleStatusChange = (dailyRecordId: string, newStatus: boolean) => {
    // Намираме композицията и записа, които съдържат този дневен запис
    const composition = compositions.find(c => 
      c.records.some(r => r.dailyRecords.some(dr => dr.id === dailyRecordId))
    );
    
    if (composition) {
      const record = composition.records.find(r => 
        r.dailyRecords.some(dr => dr.id === dailyRecordId)
      );
      
      if (record) {
        // Обновяваме статуса на дневния запис
        const updatedDailyRecords = record.dailyRecords.map(dr => 
          dr.id === dailyRecordId ? { ...dr, isActive: newStatus } : dr
        );
        
        // Обновяваме записа с променения статус
        const updatedRecords = composition.records.map(r => 
          r.id === record.id ? { ...r, dailyRecords: updatedDailyRecords } : r
        );
        
        // Обновяваме композицията
      dispatch(updateComposition({
        ...composition,
          records: updatedRecords
        }));
      }
    }
  };

  const handleWagonClick = (wagonId: number, compositionId: number) => {
    setSelectedWagon({ id: wagonId, compositionId });
    setSettingsDialogOpen(true);
  };

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false);
    setSelectedWagon(null);
  };

  const handleRouteChange = (routeData: {
    type: string;
    station: string;
    targetTrain?: string;
  }) => {
    if (selectedWagon) {
      const composition = compositions.find(c => c.id === selectedWagon.compositionId);
      if (composition) {
        const record = composition.records[0];
        if (record) {
          const updatedWagons = record.wagons.map(wagon => 
            wagon.id === selectedWagon.id 
              ? { ...wagon, route: routeData }
              : wagon
          );
          dispatch(updateComposition({
            ...composition,
            records: [
              {
                ...record,
                wagons: updatedWagons
              },
              ...composition.records.slice(1)
            ]
          }));
    }
      }
    }
  };

  const formatLocomotives = (locomotives: string[]) => {
    return locomotives.map(locomotive => (
      <Box
        key={locomotive}
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          backgroundColor: '#e3f2fd',
          padding: '4px 8px',
          borderRadius: '4px',
          mr: 1
        }}
      >
        <LocomotiveIcon fontSize="small" color="primary" />
        <Typography variant="body2">
          {locomotive}
        </Typography>
      </Box>
    ));
  };

  const formatWagons = (wagons: Wagon[], compositionId: number) => {
    return wagons.map(wagon => (
      <Box
        key={wagon.id}
        component="span"
        onClick={() => handleWagonClick(wagon.id, compositionId)}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          backgroundColor: wagon.isActive ? '#e8f5e9' : '#ffebee',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: wagon.isActive ? '#c8e6c9' : '#ffcdd2',
          },
          mr: 1
        }}
      >
        <TrainIcon fontSize="small" color={wagon.isActive ? "success" : "error"} />
        <Typography variant="body2">
          {wagon.wagonNumber}
        </Typography>
      </Box>
    ));
  };

  const getPeriodsForTrain = (trainNumber: string) => {
    const trainCompositions = compositions.filter(c => c.trainNumber === trainNumber);
    console.log('Train compositions:', trainCompositions); // за дебъгване
    
    return trainCompositions.flatMap(c => {
      console.log('Records for composition:', c.records); // за дебъгване
      return c.records.map(record => ({
        id: record.id,
        period: `${record.startDate} - ${record.endDate}`,
        route: `${c.startStation} - ${c.endStation}`
      }));
    });
  };

  const filteredRecords = compositions
    .filter(composition => 
      (!selectedTrain || composition.trainNumber === selectedTrain) &&
      (!selectedPeriod || composition.records.some(r => r.id === selectedPeriod))
    )
    .flatMap(composition => {
      const selectedRecord = composition.records.find(r => r.id === selectedPeriod);
      if (selectedRecord) {
        return selectedRecord.dailyRecords.map(dailyRecord => ({
          id: dailyRecord.id,
          trainNumber: composition.trainNumber,
          date: dailyRecord.date,
          locomotives: dailyRecord.locomotives || [],
          wagons: dailyRecord.wagons,
          isActive: dailyRecord.isActive,
          startStation: composition.startStation,
          endStation: composition.endStation,
          compositionId: composition.id
        }));
      }
      return [];
    });

  const handleClone = (compositionId: number) => {
    setSelectedComposition(compositionId);
    setCloneDialogOpen(true);
  };

  const handleCloneDialogClose = () => {
    setCloneDialogOpen(false);
    setSelectedComposition(null);
  };

  const handleCloneSubmit = (startDate: Date, endDate: Date) => {
    if (selectedComposition) {
      const composition = compositions.find(c => c.id === selectedComposition);
      if (composition) {
        const newId = Math.max(0, ...compositions.map(c => c.id)) + 1;
        const lastRecord = composition.records[composition.records.length - 1];
        if (lastRecord) {
          const compositionData = {
            trainNumber: composition.trainNumber,
            startStation: composition.startStation,
            endStation: composition.endStation,
            records: [{
              id: `${newId}-1`,
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0],
              isActive: true,
              locomotives: lastRecord.locomotives,
              wagons: lastRecord.wagons,
              dailyRecords: []
            }]
          };
          dispatch(addComposition(compositionData));
          dispatch(generateDailyRecords(newId));
        }
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Композиции
            </Typography>
            <Divider sx={{ flex: 1 }} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/composing/form')}
            >
              Добави композиция
            </Button>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Влак</InputLabel>
                <Select
                  value={selectedTrain}
                  label="Влак"
                  onChange={(e) => {
                    setSelectedTrain(e.target.value);
                    setSelectedPeriod('');
                  }}
                >
                  {compositions.map(composition => (
                    <MenuItem key={composition.trainNumber} value={composition.trainNumber}>
                      {composition.trainNumber} ({composition.startStation} - {composition.endStation})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Период</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Период"
                  onChange={(e) => setSelectedPeriod(e.target.value as string)}
                  disabled={!selectedTrain}
                >
                  {selectedTrain && getPeriodsForTrain(selectedTrain).map(period => (
                    <MenuItem key={period.id} value={period.id}>
                      {period.period} ({period.route})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <DatePicker
                label="Начална дата"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
            <Box>
              <DatePicker
                label="Крайна дата"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
          </Box>

          {selectedTrain && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Локомотиви</TableCell>
                <TableCell>Вагони</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {filteredRecords.map((dailyRecord) => (
                    <TableRow key={dailyRecord.id}>
                      <TableCell>{dailyRecord.date}</TableCell>
                      <TableCell>
                        {formatLocomotives(dailyRecord.locomotives || [])}
                      </TableCell>
                  <TableCell>
                        {formatWagons(dailyRecord.wagons, dailyRecord.compositionId)}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                              checked={dailyRecord.isActive}
                              onChange={(e) => handleStatusChange(dailyRecord.id, e.target.checked)}
                              color="primary"
                      />
                      }
                          label={dailyRecord.isActive ? 'Активен' : 'Неактивен'}
                    />
                  </TableCell>
                  <TableCell>
                      <IconButton
                          onClick={() => handleClone(dailyRecord.compositionId)}
                        size="small"
                        sx={{ 
                            mr: 1,
                          '&:hover': { 
                              backgroundColor: 'rgba(0, 104, 55, 0.1)',
                            },
                        }}
                        >
                          <CloneIcon fontSize="small" sx={{ color: '#006837' }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(dailyRecord.id)}
                          color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                          onClick={() => handleDelete(dailyRecord.id)}
                          color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          )}
        </Paper>
      </Container>

        {selectedWagon && (
          (() => {
            const composition = compositions.find(c => c.id === selectedWagon.compositionId);
            if (!composition) return null;

            const record = composition.records.find(r => 
              r.dailyRecords.some(dr => dr.wagons.some(w => w.id === selectedWagon.id))
            );
            if (!record) return null;

            const dailyRecord = record.dailyRecords.find(dr => 
              dr.wagons.some(w => w.id === selectedWagon.id)
            );
            if (!dailyRecord) return null;

            const wagon = dailyRecord.wagons.find(w => w.id === selectedWagon.id);
            if (!wagon) return null;

            return (
              <WagonSettingsDialog
                open={settingsDialogOpen}
                onClose={handleSettingsDialogClose}
                wagon={{
                  ...wagon,
                  composition: {
                    trainNumber: composition.trainNumber,
                    startDate: record.startDate,
                    endDate: record.endDate,
                    startStation: composition.startStation,
                    endStation: composition.endStation
                  }
                }}
                onRouteChange={handleRouteChange}
              />
            );
          })()
        )}

        <CloneCompositionDialog
          open={cloneDialogOpen}
          onClose={handleCloneDialogClose}
          composition={selectedComposition ? {
            trainNumber: compositions.find(c => c.id === selectedComposition)?.trainNumber || '',
            locomotives: compositions.find(c => c.id === selectedComposition)?.records[0]?.locomotives || [],
            wagons: compositions.find(c => c.id === selectedComposition)?.records[0]?.wagons.map(w => ({
              wagonNumber: w.wagonNumber,
              seatNumber: w.seatNumber,
              isActive: w.isActive
            })) || []
          } : {
            trainNumber: '',
            locomotives: [],
            wagons: []
          }}
          onClone={handleCloneSubmit}
        />
    </Box>
    </LocalizationProvider>
  );
};

export default Composing; 