import React from 'react';
import { Box, Typography } from '@mui/material';

const ChiefCashier: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Главен касиер
      </Typography>
    </Box>
  );
};

export default ChiefCashier; 