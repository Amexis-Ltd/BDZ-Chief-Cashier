import React, { useState } from 'react';
import { Box, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox, Stack, Chip } from '@mui/material';

interface SeatLayoutPreviewProps {
  rows: number;
  seatsPerRow: number;
  class: 'First' | 'Second' | 'Third';
  onSeatOptionsChange?: (seatOptions: { [key: number]: string[] }) => void;
  compartments?: number;
}

interface SeatOptions {
  [key: number]: string[];
}

const SeatLayoutPreview: React.FC<SeatLayoutPreviewProps> = ({
  rows,
  seatsPerRow,
  class: wagonClass,
  onSeatOptionsChange,
  compartments = 0,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [seatOptions, setSeatOptions] = useState<SeatOptions>({});
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  const getSeatColor = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      return '#bbdefb'; // Светло синьо за избрани места
    }
    const hasOptions = seatOptions[seatNumber]?.length > 0;
    if (hasOptions) {
      return '#ffecb3'; // Жълтеникаво за места с опции
    }
    switch (wagonClass) {
      case 'First':
        return '#e3f2fd'; // Светло синьо
      case 'Second':
        return '#f3e5f5'; // Светло лилаво
      case 'Third':
        return '#e8f5e9'; // Светло зелено
      default:
        return '#f5f5f5';
    }
  };

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleOptionChange = (option: string) => {
    setCurrentOptions(prev => {
      const newOptions = prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option];
      return newOptions;
    });
  };

  const handleSaveOptions = () => {
    if (selectedSeats.length > 0) {
      const newSeatOptions = { ...seatOptions };
      selectedSeats.forEach(seatNumber => {
        newSeatOptions[seatNumber] = currentOptions;
      });
      setSeatOptions(newSeatOptions);
      onSeatOptionsChange?.(newSeatOptions);
    }
    setDialogOpen(false);
  };

  const handleOpenOptions = () => {
    if (selectedSeats.length > 0) {
      // Намираме общите опции за всички избрани места
      const commonOptions = selectedSeats.reduce((common, seatNumber) => {
        const seatOpts = seatOptions[seatNumber] || [];
        return common.filter(opt => seatOpts.includes(opt));
      }, currentOptions);
      setCurrentOptions(commonOptions);
      setDialogOpen(true);
    }
  };

  const availableOptions = [
    'До прозорец',
    'До коридор',
    'С маса',
    'С контакт',
    'С WiFi',
    'С кондиционер',
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {selectedSeats.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              Избрани места:
            </Typography>
            {selectedSeats.map(seat => (
              <Chip
                key={seat}
                label={seat}
                onDelete={() => setSelectedSeats(prev => prev.filter(s => s !== seat))}
                size="small"
              />
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={handleOpenOptions}
              sx={{ ml: 'auto' }}
            >
              Задай опции
            </Button>
          </>
        )}
      </Box>

      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#f5f5f5',
          maxWidth: '100%',
          overflowX: 'auto',
          borderRadius: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: '#424242',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          },
        }}
      >
        {/* Пътнически коридор */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '60px',
            transform: 'translateX(-50%)',
            background: '#e0e0e0',
            zIndex: 0,
          }}
        />

        {compartments > 0 ? (
          // Показване на купета
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Array.from({ length: Math.ceil(compartments / 2) }).map((_, rowIndex) => (
              <Box key={rowIndex} sx={{ display: 'flex', gap: 4 }}>
                {/* Първо купе */}
                <Box sx={{ 
                  flex: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: '#fafafa',
                  position: 'relative'
                }}>
                  <Typography variant="caption" sx={{ 
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#fafafa',
                    px: 1,
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                  }}>
                    Купе {rowIndex * 2 + 1}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    {/* Лява страна */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[0, 1, 2].map((seatOffset) => {
                        const seatNumber = rowIndex * 12 + seatOffset + 1;
                        return (
                          <Box
                            key={seatNumber}
                            onClick={() => handleSeatClick(seatNumber)}
                            sx={{
                              width: '100%',
                              height: 40,
                              backgroundColor: getSeatColor(seatNumber),
                              border: '2px solid #ccc',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: '#fff',
                                borderColor: '#666',
                                transform: 'scale(1.05)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              },
                            }}
                          >
                            {seatNumber}
                          </Box>
                        );
                      })}
                    </Box>
                    {/* Дясна страна */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[3, 4, 5].map((seatOffset) => {
                        const seatNumber = rowIndex * 12 + seatOffset + 1;
                        return (
                          <Box
                            key={seatNumber}
                            onClick={() => handleSeatClick(seatNumber)}
                            sx={{
                              width: '100%',
                              height: 40,
                              backgroundColor: getSeatColor(seatNumber),
                              border: '2px solid #ccc',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: '#fff',
                                borderColor: '#666',
                                transform: 'scale(1.05)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              },
                            }}
                          >
                            {seatNumber}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>

                {/* Второ купе (ако има) */}
                {rowIndex * 2 + 2 <= compartments && (
                  <Box sx={{ 
                    flex: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: '#fafafa',
                    position: 'relative'
                  }}>
                    <Typography variant="caption" sx={{ 
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      backgroundColor: '#fafafa',
                      px: 1,
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}>
                      Купе {rowIndex * 2 + 2}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      {/* Лява страна */}
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {[0, 1, 2].map((seatOffset) => {
                          const seatNumber = rowIndex * 12 + seatOffset + 7;
                          return (
                            <Box
                              key={seatNumber}
                              onClick={() => handleSeatClick(seatNumber)}
                              sx={{
                                width: '100%',
                                height: 40,
                                backgroundColor: getSeatColor(seatNumber),
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: '#fff',
                                  borderColor: '#666',
                                  transform: 'scale(1.05)',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                },
                              }}
                            >
                              {seatNumber}
                            </Box>
                          );
                        })}
                      </Box>
                      {/* Дясна страна */}
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {[3, 4, 5].map((seatOffset) => {
                          const seatNumber = rowIndex * 12 + seatOffset + 7;
                          return (
                            <Box
                              key={seatNumber}
                              onClick={() => handleSeatClick(seatNumber)}
                              sx={{
                                width: '100%',
                                height: 40,
                                backgroundColor: getSeatColor(seatNumber),
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: '#fff',
                                  borderColor: '#666',
                                  transform: 'scale(1.05)',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                },
                              }}
                            >
                              {seatNumber}
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          // Показване на стандартна схема без купета
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            alignItems: 'center',
            width: '100%'
          }}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <Box key={rowIndex} sx={{ 
                display: 'flex', 
                gap: 2,
                justifyContent: 'center',
                width: '100%'
              }}>
                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                  const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                  const isSelected = selectedSeats.includes(seatNumber);
                  const currentSeatOptions = seatOptions[seatNumber] || [];

                  return (
                    <Box
                      key={seatIndex}
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid',
                        borderColor: isSelected ? 'primary.main' : 'grey.300',
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: isSelected ? 'primary.light' : 'background.paper',
                        '&:hover': {
                          bgcolor: isSelected ? 'primary.light' : 'grey.100',
                        },
                        position: 'relative',
                      }}
                      onClick={() => handleSeatClick(seatNumber)}
                    >
                      {seatNumber}
                      {currentSeatOptions.length > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                          }}
                        >
                          {currentSeatOptions.length}
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Опции за {selectedSeats.length} място{selectedSeats.length > 1 ? 'та' : ''}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            {availableOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={currentOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отказ</Button>
          <Button onClick={handleSaveOptions} variant="contained">
            Запази
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SeatLayoutPreview; 