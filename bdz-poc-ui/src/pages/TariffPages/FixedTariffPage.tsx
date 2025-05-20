import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';

// Placeholder data for demonstration
const mockFixedTariffs = [
  { 
    id: 1, 
    name: 'Тарифа за превоз на пътници и ръчен багаж', 
    description: 'Тарифа за превоз на пътници и ръчен багаж по железопътния транспорт във вътрешно съобщение',
    pricePerKm: 0.10,
    serviceFee: 1.00,
    type: 'Договор с държавата',
    category: 'fixed',
    commercialType: null,
    validFrom: '01.01.2023',
    validTo: '31.12.2023',
    status: 'Активна'
  },
  { 
    id: 2, 
    name: 'Търговска тарифа - Специални превози', 
    description: 'Търговска тарифа за специални превози',
    pricePerKm: 0.25,
    serviceFee: 50.00,
    type: 'Търговска тарифа',
    category: 'fixed',
    commercialType: 'special',
    validFrom: '01.01.2023',
    validTo: '31.12.2023',
    status: 'Активна'
  },
  { 
    id: 3, 
    name: 'Търговска тарифа - Атракционни пътувания', 
    description: 'Търговска тарифа за атракционни пътувания',
    pricePerKm: 0.18,
    serviceFee: 25.00,
    type: 'Търговска тарифа',
    category: 'dynamic',
    commercialType: 'attraction',
    validFrom: '01.04.2023',
    validTo: '31.10.2023',
    status: 'Активна'
  },
  { 
    id: 4, 
    name: 'Търговска тарифа - Наем на подвижен състав', 
    description: 'Тарифа за отдаване на подвижния състав под наем',
    pricePerKm: null,
    serviceFee: 500.00,
    type: 'Търговска тарифа',
    category: 'fixed',
    commercialType: 'rental',
    validFrom: '01.01.2023',
    validTo: '31.12.2023',
    status: 'Активна'
  },
  { 
    id: 5, 
    name: 'Търговска тарифа - Снимачна дейност', 
    description: 'Тарифа за снимачна дейност с подвижен състав',
    pricePerKm: null,
    serviceFee: 800.00,
    type: 'Търговска тарифа',
    category: 'fixed',
    commercialType: 'filming',
    validFrom: '01.01.2023',
    validTo: '31.12.2023',
    status: 'Активна'
  },
];

const FixedTariffPage: React.FC = () => {
  const [tariffs, setTariffs] = useState(mockFixedTariffs);

  const handleDelete = (id: number) => {
    // В реална имплементация тук би имало API повикване
    setTariffs(tariffs.filter(tariff => tariff.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Всички тарифи
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Преглед и управление на всички тарифи в системата - договорни, търговски, фиксирани и динамични
          </Typography>
        </div>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            sx={{ mr: 2 }}
          >
            Експорт
          </Button>
          <Button 
            component={Link} 
            to="/tariffs/fixed/add" 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
          >
            Добави нова тарифа
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Име</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Подтип</TableCell>
                <TableCell>Цена/км</TableCell>
                <TableCell>Такса за услуга</TableCell>
                <TableCell>Валидна от</TableCell>
                <TableCell>Валидна до</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tariffs.map((tariff) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={tariff.id}>
                  <TableCell>{tariff.name}</TableCell>
                  <TableCell>{tariff.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={tariff.type} 
                      color={tariff.type === 'Договор с държавата' ? 'primary' : 'secondary'} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={tariff.category === 'fixed' ? 'Фиксирана' : 'Динамична'} 
                      color={tariff.category === 'fixed' ? 'success' : 'info'} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {tariff.commercialType ? (
                      <Chip 
                        label={
                          tariff.commercialType === 'special' ? 'Специален превоз' :
                          tariff.commercialType === 'attraction' ? 'Атракционно пътуване' :
                          tariff.commercialType === 'rental' ? 'Наем на състав' :
                          tariff.commercialType === 'filming' ? 'Снимачна дейност' : ''
                        } 
                        size="small"
                      />
                    ) : '-'}
                  </TableCell>
                  <TableCell>{tariff.pricePerKm ? `${tariff.pricePerKm.toFixed(2)} лв.` : '-'}</TableCell>
                  <TableCell>{tariff.serviceFee.toFixed(2)} лв.</TableCell>
                  <TableCell>{tariff.validFrom}</TableCell>
                  <TableCell>{tariff.validTo}</TableCell>
                  <TableCell>
                    <Chip 
                      label={tariff.status} 
                      color="success" 
                      size="small"
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      component={Link} 
                      to={`/tariffs/fixed/edit/${tariff.id}`} 
                      size="small" 
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="secondary"
                      onClick={() => handleDelete(tariff.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default FixedTariffPage; 