import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add as AddIcon, Delete as DeleteIcon, Settings as SettingsIcon} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addComposition, updateComposition, generateDailyRecords } from '../store/features/composition/compositionSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SelectChangeEvent } from '@mui/material';
import WagonSettingsDialog from '../components/WagonSettingsDialog/WagonSettingsDialog';
import CloneCompositionDialog from '../components/CloneCompositionDialog/CloneCompositionDialog';

// Mock data for wagon numbers
const wagonNumbers = [
  { id: 1, number: '12345' },
  { id: 2, number: '12346' },
  { id: 3, number: '12347' },
  { id: 4, number: '12348' },
  { id: 5, number: '12349' },
];

// Mock data for locomotive numbers
const locomotiveNumbers = [
  { id: 1, number: 'Лок 1001' },
  { id: 2, number: 'Лок 1002' },
  { id: 3, number: 'Лок 1003' },
  { id: 4, number: 'Лок 1004' },
  { id: 5, number: 'Лок 1005' },
];

interface Wagon {
  id: number;
  seatNumber: string;
  wagonNumber: string;
  isActive: boolean;
  route?: {
    type: string;
    station: string;
    targetTrain?: string;
  };
}

interface SortableWagonProps {
  wagon: Wagon;
  index: number;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Wagon, value: any) => void;
  trainNumber: string;
  startDate: Date | null;
  endDate: Date | null;
  startStation: string;
  endStation: string;
}

const SortableWagon = ({ 
  wagon, 
  index, 
  onRemove, 
  onChange,
  trainNumber,
  startDate,
  endDate,
  startStation,
  endStation
}: SortableWagonProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: wagon.id });

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleSettingsClick = () => {
    setSettingsDialogOpen(true);
  };

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: isDragging ? '#f5f5f5' : 'white',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box 
          sx={{ 
            width: '10%',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
          {...attributes}
          {...listeners}
        >
          <Typography variant="body2" color="textSecondary">
            {index + 1}
          </Typography>
        </Box>
          <Box sx={{ width: '35%' }}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id={`wagon-number-label-${wagon.id}`}>Вагон</InputLabel>
            <Select
              labelId={`wagon-number-label-${wagon.id}`}
              value={wagon.wagonNumber}
              onChange={(e) => onChange(wagon.id, 'wagonNumber', e.target.value)}
              label="Вагон"
            >
              {wagonNumbers.map((wagonNumber) => (
                <MenuItem key={wagonNumber.id} value={wagonNumber.number}>
                  {wagonNumber.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
          <Box sx={{ width: '35%' }}>
          <TextField
            fullWidth
            size="small"
            label="Плацкартен номер"
            value={wagon.seatNumber}
            onChange={(e) => onChange(wagon.id, 'seatNumber', e.target.value)}
            variant="outlined"
          />
        </Box>
          <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={wagon.isActive}
                onChange={(e) => onChange(wagon.id, 'isActive', e.target.checked)}
                size="small"
              />
            }
            label="Активен"
          />
        </Box>
        <Box>
          <IconButton
              onClick={handleSettingsClick}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
              <SettingsIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            color="error"
            onClick={() => onRemove(wagon.id)}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(211, 47, 47, 0.04)'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>

      <WagonSettingsDialog
        open={settingsDialogOpen}
        onClose={handleSettingsDialogClose}
        wagon={{
          id: wagon.id,
          route: wagon.route,
          composition: {
            trainNumber,
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
            startStation: startStation,
            endStation: endStation
          }
        }}
        onRouteChange={(routeData) => {
          onChange(wagon.id, 'route', routeData);
          handleSettingsDialogClose();
        }}
      />
    </>
  );
};

const CompositionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  console.log('URL ID:', id);
  
  const composition = useAppSelector((state) => 
    isEditMode ? state.composition.compositions.find(c => 
      c.records.some(r => r.dailyRecords.some(dr => dr.id === id))
    ) : null
  );

  const record = composition?.records.find(r => 
    r.dailyRecords.some(dr => dr.id === id)
  );

  const dailyRecord = record?.dailyRecords.find(dr => dr.id === id);

  const compositions = useAppSelector((state) => state.composition.compositions);
  const trains = useSelector((state: RootState) => state.trains.trains);

  const [trainNumber, setTrainNumber] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recordDate, setRecordDate] = useState<Date | null>(null);
  const [locomotives, setLocomotives] = useState<string[]>([]);
  const [wagons, setWagons] = useState<Wagon[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [cloneDialogOpen, setCloneDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (composition && record && dailyRecord) {
      setTrainNumber(composition.trainNumber);
      setStartDate(parse(record.startDate, 'yyyy-MM-dd', new Date()));
      setEndDate(parse(record.endDate, 'yyyy-MM-dd', new Date()));
      setRecordDate(parse(dailyRecord.date, 'yyyy-MM-dd', new Date()));
      setLocomotives(dailyRecord.locomotives || []);
      setWagons(dailyRecord.wagons);
      setIsActive(dailyRecord.isActive);
      setStartStation(composition.startStation || '');
      setEndStation(composition.endStation || '');
    }
  }, [composition, record, dailyRecord]);

  const handleAddWagon = () => {
    const newWagon: Wagon = {
      id: Date.now(),
      seatNumber: '',
      wagonNumber: '',
      isActive: true,
      route: {
        type: '',
        station: '',
        targetTrain: '',
      },
    };
    setWagons([...wagons, newWagon]);
  };

  const handleRemoveWagon = (id: number) => {
    setWagons(wagons.filter(wagon => wagon.id !== id));
  };

  const handleWagonChange = (id: number, field: keyof Wagon, value: string | number | boolean) => {
    setWagons(wagons.map(wagon =>
      wagon.id === id ? { ...wagon, [field]: value } : wagon
    ));
  };

  const handleLocomotiveChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setLocomotives(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTrainNumberChange = (event: SelectChangeEvent<string>) => {
    const selectedTrain = trains.find(train => train.number === event.target.value);
    setTrainNumber(event.target.value);
    if (selectedTrain) {
      setStartStation(selectedTrain.startStation);
      setEndStation(selectedTrain.endStation);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && composition && record && dailyRecord) {
      // Редактиране на съществуващ дневен запис
      const updatedDailyRecords = record.dailyRecords.map(dr => 
        dr.id === id ? {
          ...dr,
          locomotives,
          wagons,
          isActive
        } : dr
      );
      
      const updatedRecords = composition.records.map(r => 
        r.id === record.id ? {
          ...r,
          dailyRecords: updatedDailyRecords
        } : r
      );
      
      dispatch(updateComposition({
        ...composition,
        records: updatedRecords
      }));
    } else {
      // Създаване на нова композиция
      const existingTrain = compositions.find(c => c.trainNumber === trainNumber);
      
      if (existingTrain) {
        // Ако влакът съществува, добавяме нов запис към съществуващата композиция
        const newRecord = {
          id: `${existingTrain.id}-${existingTrain.records.length + 1}`,
          startDate: format(startDate || new Date(), 'yyyy-MM-dd'),
          endDate: format(endDate || new Date(), 'yyyy-MM-dd'),
          isActive: true,
          locomotives,
          wagons,
          dailyRecords: []
        };
        
        dispatch(updateComposition({
          ...existingTrain,
          records: [...existingTrain.records, newRecord]
        }));
        
        // Генерираме дневни записи за новия запис
        dispatch(generateDailyRecords(existingTrain.id));
      } else {
        // Ако влакът не съществува, създаваме нова композиция
        const newId = Math.max(0, ...compositions.map(c => c.id)) + 1;
    const compositionData = {
          id: newId,
      trainNumber,
          locomotives,
      wagons,
          startDate: format(startDate || new Date(), 'yyyy-MM-dd'),
          endDate: format(endDate || new Date(), 'yyyy-MM-dd'),
      isActive,
          startStation,
          endStation,
          records: [{
            id: `${newId}-1`,
            startDate: format(startDate || new Date(), 'yyyy-MM-dd'),
            endDate: format(endDate || new Date(), 'yyyy-MM-dd'),
            isActive: true,
            locomotives,
            wagons,
            dailyRecords: []
          }]
        };
        
      dispatch(addComposition(compositionData));
        
        // Генерираме дневни записи за новата композиция
        dispatch(generateDailyRecords(newId));
      }
    }
    
    navigate('/composing');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setWagons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCloneDialogClose = () => {
    setCloneDialogOpen(false);
  };

  const handleClone = (startDate: Date, endDate: Date) => {
    // Създаване на нова композиция с клонирани данни
    const newId = Math.max(0, ...compositions.map(c => c.id)) + 1;
    const compositionData = {
      id: newId,
      trainNumber,
      locomotives,
      wagons,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      isActive: true,
      startStation,
      endStation,
      records: [{
        id: `${newId}-1`,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        isActive: true,
        locomotives,
        wagons,
        dailyRecords: []
      }]
    };
    
    dispatch(addComposition(compositionData));
    dispatch(generateDailyRecords(newId));
    navigate('/composing');
  };

  if (isEditMode && !composition) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography>Композицията не е намерена</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Train Number and Dates */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ width: '30%' }}>
                    <FormControl fullWidth size="small" variant="outlined">
                      <InputLabel id="train-number-label">Номер на влак</InputLabel>
                      <Select<string>
                        labelId="train-number-label"
                        value={trainNumber ? trainNumber : ""}
                        onChange={handleTrainNumberChange}
                        required
                        label="Номер на влак"
                        disabled={isEditMode}
                      >
                        <MenuItem value="" disabled>
                          <em>Изберете номер на влак</em>
                        </MenuItem>
                        {trains.map((train) => (
                          <MenuItem key={train.id} value={train.number}>
                            {train.number} ({train.startStation} - {train.endStation})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {!isEditMode ? (
                    <>
                  <Box sx={{ width: '35%' }}>
                    <DatePicker
                      label="Начална дата"
                      value={startDate}
                      onChange={(newValue: Date | null) => setStartDate(newValue)}
                          disabled={isEditMode}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          required: true,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ width: '35%' }}>
                    <DatePicker
                      label="Крайна дата"
                      value={endDate}
                      onChange={(newValue: Date | null) => setEndDate(newValue)}
                          disabled={isEditMode}
                      minDate={startDate || undefined}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          required: true,
                        },
                      }}
                    />
                  </Box>
                    </>
                  ) : (
                    <Box sx={{ width: '35%' }}>
                      <DatePicker
                        label="Дата"
                        value={recordDate}
                        onChange={(newValue: Date | null) => setRecordDate(newValue)}
                        disabled={true}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            required: true,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Locomotive */}
                <Box sx={{ width: '30%' }}>
                  <FormControl fullWidth size="small" variant="outlined">
                    <InputLabel id="locomotive-label">Локомотиви</InputLabel>
                    <Select
                      labelId="locomotive-label"
                      multiple
                      value={locomotives}
                      onChange={handleLocomotiveChange}
                      label="Локомотиви"
                    size="small"
                      renderValue={(selected) => (selected as string[]).join(', ')}
                    >
                      {locomotiveNumbers.map((locomotive) => (
                        <MenuItem key={locomotive.id} value={locomotive.number}>
                          {locomotive.number}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Wagons */}
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Вагони</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddWagon}
                      sx={{
                        backgroundColor: '#006837',
                        '&:hover': {
                          backgroundColor: '#004d29',
                        },
                        borderRadius: 0,
                        textTransform: 'none',
                      }}
                    >
                      Добави вагон
                    </Button>
                  </Box>

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={wagons.map(wagon => wagon.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {wagons.map((wagon, index) => (
                        <SortableWagon
                          key={wagon.id}
                          wagon={wagon}
                          index={index}
                          onRemove={handleRemoveWagon}
                          onChange={handleWagonChange}
                          trainNumber={trainNumber}
                          startDate={startDate}
                          endDate={endDate}
                          startStation={startStation}
                          endStation={endStation}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </Box>

                {/* Active Switch */}
                <Box sx={{ width: '100%' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                      />
                    }
                    label="Активна"
                  />
                </Box>

                {/* Submit Button */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#006837',
                      '&:hover': {
                        backgroundColor: '#004d29',
                      },
                      borderRadius: 0,
                      textTransform: 'none',
                    }}
                  >
                    {isEditMode ? 'Запази' : 'Създай'}
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>

      <CloneCompositionDialog
        open={cloneDialogOpen}
        onClose={handleCloneDialogClose}
        composition={{
          trainNumber,
          locomotives,
          wagons: wagons.map(wagon => ({
            wagonNumber: wagon.wagonNumber,
            seatNumber: wagon.seatNumber,
            isActive: wagon.isActive
          }))
        }}
        onClone={handleClone}
      />
    </Box>
  );
};

export default CompositionForm; 