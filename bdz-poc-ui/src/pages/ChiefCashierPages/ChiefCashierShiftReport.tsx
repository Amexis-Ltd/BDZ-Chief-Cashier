import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShiftReport, mockShiftReports } from '../../models/ShiftReport';

const ChiefCashierShiftReport: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [reports, setReports] = useState<ShiftReport[]>(mockShiftReports);

  const stations = Array.from(new Set(mockShiftReports.map(report => report.station)));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleStationChange = (event: any) => {
    setSelectedStation(event.target.value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN'
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return format(date, 'dd.MM.yyyy HH:mm', { locale: bg });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Сменни отчети
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
              <DatePicker
                label="Дата"
                value={selectedDate}
                onChange={handleDateChange}
                format="dd.MM.yyyy"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Гара</InputLabel>
              <Select
                value={selectedStation}
                label="Гара"
                onChange={handleStationChange}
              >
                <MenuItem value="">Всички</MenuItem>
                {stations.map((station) => (
                  <MenuItem key={station} value={station}>
                    {station}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: '56px' }}
            >
              Филтрирай
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Касиер</TableCell>
              <TableCell>Офис</TableCell>
              <TableCell>Гара</TableCell>
              <TableCell>Номер на каса</TableCell>
              <TableCell>Начало на смяна</TableCell>
              <TableCell>Край на смяна</TableCell>
              <TableCell>Старт депозит</TableCell>
              <TableCell>Прикл. с депозит</TableCell>
              <TableCell>Система прикл. с депозит</TableCell>
              <TableCell>Баланс</TableCell>
              <TableCell>Приет</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.cashier}</TableCell>
                <TableCell>{report.office}</TableCell>
                <TableCell>{report.station}</TableCell>
                <TableCell>{report.cashRegisterNumber}</TableCell>
                <TableCell>{formatDateTime(report.shiftStart)}</TableCell>
                <TableCell>{formatDateTime(report.shiftEnd)}</TableCell>
                <TableCell>{formatCurrency(report.startDeposit)}</TableCell>
                <TableCell>{formatCurrency(report.endDeposit)}</TableCell>
                <TableCell>{formatCurrency(report.systemEndDeposit)}</TableCell>
                <TableCell>{formatCurrency(report.balance)}</TableCell>
                <TableCell>
                  <Chip
                    label={report.isAccepted ? 'Да' : 'Не'}
                    color={report.isAccepted ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChiefCashierShiftReport; 