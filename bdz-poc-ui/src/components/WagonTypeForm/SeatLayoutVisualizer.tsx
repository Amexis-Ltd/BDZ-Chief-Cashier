import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface SeatLayoutVisualizerProps {
  rows: number;
  seatsPerRow: number;
  layout: string;
}

const SeatLayoutVisualizer: React.FC<SeatLayoutVisualizerProps> = ({
  rows,
  seatsPerRow
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Визуализация на схемата
      </Typography>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => (
              <Box
                key={seatIndex}
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                }}
              >
                {seatIndex + 1}
              </Box>
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default SeatLayoutVisualizer; 