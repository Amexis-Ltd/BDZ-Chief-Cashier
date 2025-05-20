import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  TextField,
} from '@mui/material';
import { Route as RouteIcon, Chair as ChairIcon, EventSeat as SeatIcon, Block as BlockIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface WagonSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  wagon: {
    id: number;
    route?: {
      type: string;
      station: string;
      targetTrain?: string;
    };
    composition?: {
      startDate: string;
      endDate: string;
      trainNumber: string;
      startStation: string;
      endStation: string;
    };
  };
  onRouteChange: (routeData: {
    type: string;
    station: string;
    targetTrain?: string;
  }) => void;
}

// Mock data
const routeTypes = [
  { value: 'detach', label: 'Откачване от гара' },
  { value: 'transfer', label: 'Прехвърляне към друг влак' },
  { value: 'attach', label: 'Прикачване от друга композиция' },
];

const stations = [
  { id: 1, name: 'София' },
  { id: 2, name: 'Пловдив' },
  { id: 3, name: 'Варна' },
  { id: 4, name: 'Бургас' },
  { id: 5, name: 'Русе' },
  { id: 6, name: 'Стара Загора' },
  { id: 7, name: 'Плевен' },
  { id: 8, name: 'Велико Търново' },
];

interface Seat {
  id: number;
  number: string;
  isBlocked: boolean;
  blockingReason?: string;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  for (let i = 1; i <= 54; i++) {
    seats.push({
      id: i,
      number: i.toString(),
      isBlocked: false,
    });
  }
  return seats;
};

const WagonSettingsDialog: React.FC<WagonSettingsDialogProps> = ({
  open,
  onClose,
  wagon,
  onRouteChange,
}) => {
  const trains = useSelector((state: RootState) => state.trains.trains);

  console.log('WagonSettingsDialog rendered with wagon:', wagon);
  console.log('Train number from wagon:', wagon.composition?.trainNumber);
  console.log('Route from wagon:', wagon.route);

  const [activeTab, setActiveTab] = useState(0);
  const [routeType, setRouteType] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [targetTrain, setTargetTrain] = useState('');
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [blockingReason, setBlockingReason] = useState('');
  const [startStation, setStartStation] = useState('');

  // Инициализиране на всички стойности при отваряне на диалога
  useEffect(() => {
    console.log('useEffect triggered with open:', open);
    console.log('Current wagon data:', wagon);
    
    if (open && wagon) {
      // Инициализиране на маршрутните данни
      const newRouteType = wagon.route?.type || '';
      const newSelectedStation = wagon.route?.station || '';
      const newTargetTrain = wagon.route?.targetTrain || '';
      
      console.log('Setting route data:', {
        type: newRouteType,
        station: newSelectedStation,
        targetTrain: newTargetTrain
      });
      
      setRouteType(newRouteType);
      setSelectedStation(newSelectedStation);
      setTargetTrain(newTargetTrain);

      // Инициализиране на гарите от композицията
      if (wagon.composition) {
        console.log('Setting stations from composition:', {
          start: wagon.composition.startStation,
          end: wagon.composition.endStation
        });
        
        setStartStation(wagon.composition.startStation);
      }
    } else {
      // Изчистване на стойностите при затваряне на диалога
      setRouteType('');
      setSelectedStation('');
      setTargetTrain('');
      setStartStation('');
    }
  }, [open, wagon]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleRouteTypeChange = (event: SelectChangeEvent) => {
    const newType = event.target.value;
    setRouteType(newType);
    setSelectedStation('');
    setTargetTrain('');
  };

  const handleStationChange = (event: SelectChangeEvent) => {
    const newStation = event.target.value;
    setSelectedStation(newStation);
    setTargetTrain('');
  };

  const handleTargetTrainChange = (event: SelectChangeEvent) => {
    const newTrain = event.target.value;
    setTargetTrain(newTrain);
  };

  const handleSeatClick = (seatId: number) => {
    setSeats(seats.map(seat => 
      seat.id === seatId 
        ? { 
            ...seat, 
            isBlocked: !seat.isBlocked,
            blockingReason: !seat.isBlocked ? blockingReason : undefined
          }
        : seat
    ));
  };

  const renderSeatLayout = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Схема на местата
        </Typography>
        
        {/* Купета */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {Array.from({ length: 9 }, (_, compartmentIndex) => {
            if (compartmentIndex % 2 === 0) {
              return (
                <Box key={compartmentIndex} sx={{ display: 'flex', gap: 1 }}>
                  {/* Първо купе */}
                  <Box sx={{ 
                    flex: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    p: 1,
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}>
                    <Box sx={{ 
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      backgroundColor: '#fafafa',
                      px: 1,
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Купе {compartmentIndex + 1}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      mt: 1,
                      p: 1,
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1
                    }}>
                      {/* Лява страна */}
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.5,
                        flex: 1,
                        borderRight: '1px dashed #e0e0e0',
                        pr: 1
                      }}>
                        {[0, 1, 2].map((seatOffset) => {
                          const seatId = compartmentIndex * 6 + seatOffset + 1;
                          const seat = seats.find(s => s.id === seatId);
                          return (
                            <Paper
                              key={seatId}
                              onClick={() => handleSeatClick(seatId)}
                              elevation={0}
                              sx={{
                                p: 0.5,
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: seat?.isBlocked ? '#ffebee' : '#e8f5e9',
                                color: seat?.isBlocked ? '#d32f2f' : '#2e7d32',
                                '&:hover': {
                                  backgroundColor: seat?.isBlocked ? '#ffcdd2' : '#c8e6c9',
                                  transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                                position: 'relative',
                                width: '100%',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.5,
                                borderRadius: 1
                              }}
                            >
                              {seat?.isBlocked ? <BlockIcon sx={{ fontSize: 16 }} /> : <SeatIcon sx={{ fontSize: 16 }} />}
                              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                {seatId}
                              </Typography>
                              {seat?.isBlocked && seat?.blockingReason && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                    fontSize: '0.5rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4
                                  }}
                                >
                                  {seat.blockingReason}
                                </Typography>
                              )}
                            </Paper>
                          );
                        })}
                      </Box>

                      {/* Дясна страна */}
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.5,
                        flex: 1,
                        pl: 1
                      }}>
                        {[3, 4, 5].map((seatOffset) => {
                          const seatId = compartmentIndex * 6 + seatOffset + 1;
                          const seat = seats.find(s => s.id === seatId);
                          return (
                            <Paper
                              key={seatId}
                              onClick={() => handleSeatClick(seatId)}
                              elevation={0}
                              sx={{
                                p: 0.5,
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: seat?.isBlocked ? '#ffebee' : '#e8f5e9',
                                color: seat?.isBlocked ? '#d32f2f' : '#2e7d32',
                                '&:hover': {
                                  backgroundColor: seat?.isBlocked ? '#ffcdd2' : '#c8e6c9',
                                  transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                                position: 'relative',
                                width: '100%',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.5,
                                borderRadius: 1
                              }}
                            >
                              {seat?.isBlocked ? <BlockIcon sx={{ fontSize: 16 }} /> : <SeatIcon sx={{ fontSize: 16 }} />}
                              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                {seatId}
                              </Typography>
                              {seat?.isBlocked && seat?.blockingReason && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                    fontSize: '0.5rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4
                                  }}
                                >
                                  {seat.blockingReason}
                                </Typography>
                              )}
                            </Paper>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>

                  {/* Второ купе */}
                  {compartmentIndex + 1 < 9 ? (
                    <Box sx={{ 
                      flex: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 1,
                      backgroundColor: '#fafafa',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}>
                      <Box sx={{ 
                        position: 'absolute',
                        top: -10,
                        left: 10,
                        backgroundColor: '#fafafa',
                        px: 1,
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                      }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Купе {compartmentIndex + 2}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        mt: 1,
                        p: 1,
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        borderRadius: 1
                      }}>
                        {/* Лява страна */}
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.5,
                          flex: 1,
                          borderRight: '1px dashed #e0e0e0',
                          pr: 1
                        }}>
                          {[0, 1, 2].map((seatOffset) => {
                            const seatId = (compartmentIndex + 1) * 6 + seatOffset + 1;
                            const seat = seats.find(s => s.id === seatId);
                            return (
                              <Paper
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                elevation={0}
                                sx={{
                                  p: 0.5,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: seat?.isBlocked ? '#ffebee' : '#e8f5e9',
                                  color: seat?.isBlocked ? '#d32f2f' : '#2e7d32',
                                  '&:hover': {
                                    backgroundColor: seat?.isBlocked ? '#ffcdd2' : '#c8e6c9',
                                    transform: 'translateY(-1px)',
                                  },
                                  transition: 'all 0.2s ease-in-out',
                                  position: 'relative',
                                  width: '100%',
                                  height: 40,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 0.5,
                                  borderRadius: 1
                                }}
                              >
                                {seat?.isBlocked ? <BlockIcon sx={{ fontSize: 16 }} /> : <SeatIcon sx={{ fontSize: 16 }} />}
                                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                  {seatId}
                                </Typography>
                                {seat?.isBlocked && seat?.blockingReason && (
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      position: 'absolute',
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                      fontSize: '0.5rem',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      borderBottomLeftRadius: 4,
                                      borderBottomRightRadius: 4
                                    }}
                                  >
                                    {seat.blockingReason}
                                  </Typography>
                                )}
                              </Paper>
                            );
                          })}
                        </Box>

                        {/* Дясна страна */}
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.5,
                          flex: 1,
                          pl: 1
                        }}>
                          {[3, 4, 5].map((seatOffset) => {
                            const seatId = (compartmentIndex + 1) * 6 + seatOffset + 1;
                            const seat = seats.find(s => s.id === seatId);
                            return (
                              <Paper
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                elevation={0}
                                sx={{
                                  p: 0.5,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  backgroundColor: seat?.isBlocked ? '#ffebee' : '#e8f5e9',
                                  color: seat?.isBlocked ? '#d32f2f' : '#2e7d32',
                                  '&:hover': {
                                    backgroundColor: seat?.isBlocked ? '#ffcdd2' : '#c8e6c9',
                                    transform: 'translateY(-1px)',
                                  },
                                  transition: 'all 0.2s ease-in-out',
                                  position: 'relative',
                                  width: '100%',
                                  height: 40,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 0.5,
                                  borderRadius: 1
                                }}
                              >
                                {seat?.isBlocked ? <BlockIcon sx={{ fontSize: 16 }} /> : <SeatIcon sx={{ fontSize: 16 }} />}
                                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                  {seatId}
                                </Typography>
                                {seat?.isBlocked && seat?.blockingReason && (
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      position: 'absolute',
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                      fontSize: '0.5rem',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      borderBottomLeftRadius: 4,
                                      borderBottomRightRadius: 4
                                    }}
                                  >
                                    {seat.blockingReason}
                                  </Typography>
                                )}
                              </Paper>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ flex: 1 }} />
                  )}
                </Box>
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#e8f5e9', border: '1px solid #2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SeatIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
            </Box>
            <Typography variant="body2">Свободни</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#ffebee', border: '1px solid #d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BlockIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
            </Box>
            <Typography variant="body2">Блокирани/служебни</Typography>
          </Box>
        </Box>
        <TextField
          fullWidth
          label="Причина за блокиране"
          value={blockingReason}
          onChange={(e) => setBlockingReason(e.target.value)}
          multiline
          rows={2}
        />
      </Box>
    );
  };

  const renderRouteInfo = () => {
    if (!routeType) return null;

      return (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="subtitle2" color="primary">Частичен маршрут</Typography>
          <Typography variant="body2">
            Начална гара: {startStation}
          </Typography>
          {selectedStation && (
            <Typography variant="body2">
              Крайна гара: {selectedStation}
            </Typography>
          )}
        </Box>
      );
      };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Настройки на вагона</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab icon={<RouteIcon />} label="Маршрути" />
            <Tab icon={<ChairIcon />} label="Места" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Тип на маршрута</InputLabel>
                <Select
                  value={routeType}
                  onChange={handleRouteTypeChange}
                  label="Тип на маршрута"
                >
                  {routeTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(routeType === 'detach' || routeType === 'transfer' || routeType === 'attach') && (
                <FormControl fullWidth>
                  <InputLabel>Гара</InputLabel>
                  <Select
                    value={selectedStation}
                    onChange={handleStationChange}
                    label="Гара"
                  >
                    {stations.map((station) => (
                      <MenuItem key={station.id} value={station.name}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {(routeType === 'transfer' || routeType === 'attach') && (
                <FormControl fullWidth>
                  <InputLabel>{routeType === 'attach' ? 'От Влак' : 'Целеви влак'}</InputLabel>
                  <Select
                    value={targetTrain}
                    label={routeType === 'attach' ? 'От Влак' : 'Целеви влак'}
                    onChange={handleTargetTrainChange}
                  >
                    {trains.map((train) => (
                      <MenuItem key={train.id} value={train.number}>
                        {train.number} ({train.startStation} - {train.endStation})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {renderRouteInfo()}
          </Box>
        )}

        {activeTab === 1 && renderSeatLayout()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отказ</Button>
        <Button 
          onClick={() => {
            onRouteChange({
              type: routeType,
              station: selectedStation,
              targetTrain: targetTrain,
            });
            onClose();
          }}
          variant="contained"
          color="primary"
          disabled={!routeType || (routeType === 'detach' && !selectedStation) || (routeType === 'transfer' && (!selectedStation || !targetTrain))}
        >
          Запази
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WagonSettingsDialog; 