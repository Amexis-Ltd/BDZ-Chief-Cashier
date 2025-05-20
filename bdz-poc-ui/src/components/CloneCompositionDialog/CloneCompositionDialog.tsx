import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Train as TrainIcon, DirectionsRailway as LocomotiveIcon, EventSeat as WagonIcon } from '@mui/icons-material';

interface CloneCompositionDialogProps {
  open: boolean;
  onClose: () => void;
  composition: {
    trainNumber: string;
    locomotives: string[];
    wagons: Array<{
      wagonNumber: string;
      seatNumber: string;
      isActive: boolean;
    }>;
  };
  onClone: (startDate: Date, endDate: Date) => void;
}

const CloneCompositionDialog: React.FC<CloneCompositionDialogProps> = ({
  open,
  onClose,
  composition,
  onClone,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleClone = () => {
    if (startDate && endDate) {
      onClone(startDate, endDate);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Клониране на композиция</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Информация за влака */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TrainIcon color="primary" />
              <Typography variant="h6">Влак {composition.trainNumber}</Typography>
            </Box>

            {/* Локомотиви */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocomotiveIcon color="primary" />
                Локомотиви
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {composition.locomotives.map((locomotive, index) => (
                  <Paper key={index} sx={{ p: 1, backgroundColor: 'white', minWidth: '200px' }}>
                    {locomotive}
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Вагони */}
            <Box>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WagonIcon color="primary" />
                Вагони
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {composition.wagons.map((wagon, index) => (
                  <Paper 
                    key={index}
                    sx={{ 
                      p: 1, 
                      backgroundColor: wagon.isActive ? '#e8f5e9' : '#ffebee',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: '200px'
                    }}
                  >
                    <WagonIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {wagon.wagonNumber}
                      {wagon.seatNumber && ` (${wagon.seatNumber})`}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Избор на дати */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Начална дата"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                },
              }}
            />
            <DatePicker
              label="Крайна дата"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отказ</Button>
        <Button 
          onClick={handleClone}
          variant="contained"
          color="primary"
          disabled={!startDate || !endDate}
        >
          Клонирай
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloneCompositionDialog; 