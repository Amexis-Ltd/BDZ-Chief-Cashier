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

// Данните за динамичните тарифи
const mockDynamicTariffs = [
  { 
    id: 1, 
    name: 'Сезонна динамична тарифа - Лято 2023', 
    description: 'Динамична тарифа за летен сезон с променящи се цени спрямо запълняемост',
    basePrice: 15.50,
    modifiers: 'Уикенд +10%, Пикови часове +15%, Запълняемост >80% +20%',
    type: 'Договор с държавата',
    category: 'dynamic',
    commercialType: null,
    startDate: '01.05.2023',
    endDate: '30.09.2023',
    status: 'Активна'
  },
  { 
    id: 2, 
    name: 'Бизнес пътувания - Работни дни', 
    description: 'Динамична тарифа за бизнес пътувания в работни дни',
    basePrice: 18.90,
    modifiers: 'Сутрешен пик +20%, Вечерен пик +15%, Запълняемост >70% +10%',
    type: 'Договор с държавата',
    category: 'dynamic',
    commercialType: null,
    startDate: '01.01.2023',
    endDate: '31.12.2023',
    status: 'Активна'
  },
  { 
    id: 3, 
    name: 'Празнична динамична тарифа', 
    description: 'Специална динамична тарифа за официални празници',
    basePrice: 22.30,
    modifiers: 'Ден преди празник +25%, По време на празник +30%, Запълняемост >60% +15%',
    type: 'Договор с държавата',
    category: 'dynamic',
    commercialType: null,
    startDate: '01.12.2023',
    endDate: '15.01.2024',
    status: 'Планирана'
  },
  { 
    id: 4, 
    name: 'Търговска тарифа - Атракционни пътувания', 
    description: 'Търговска динамична тарифа за атракционни пътувания',
    basePrice: 25.00,
    modifiers: 'Уикенд +20%, Празници +30%, Предварителна резервация -10%',
    type: 'Търговска тарифа',
    category: 'dynamic',
    commercialType: 'attraction',
    startDate: '01.04.2023',
    endDate: '31.10.2023',
    status: 'Активна'
  },
];

const DynamicTariffPage: React.FC = () => {
  const [tariffs, setTariffs] = useState(mockDynamicTariffs);

  const handleDelete = (id: number) => {
    // В реална имплементация тук би имало API повикване
    setTariffs(tariffs.filter(tariff => tariff.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Динамични тарифи
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Управление на тарифи с динамично ценообразуване според фактори като сезонност, запълняемост и търсене
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
            to="/tariffs/dynamic/add" 
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
                <TableCell>Базова цена</TableCell>
                <TableCell>Модификатори</TableCell>
                <TableCell>Начална дата</TableCell>
                <TableCell>Крайна дата</TableCell>
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
                  <TableCell>{tariff.basePrice.toFixed(2)} лв.</TableCell>
                  <TableCell>{tariff.modifiers}</TableCell>
                  <TableCell>{tariff.startDate}</TableCell>
                  <TableCell>{tariff.endDate}</TableCell>
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
                      to={`/tariffs/dynamic/edit/${tariff.id}`} 
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

export default DynamicTariffPage; 