import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { bg } from 'date-fns/locale'; // For Bulgarian date localization if needed
import { useAppSelector } from '../../../store/hooks'; // Adjust path if needed
import { selectCashDesks } from '../../../store/features/cashModule/cashModuleSlice'; // Adjust path and selector name if needed

const KlenExportTab: React.FC = () => {
  const [exportType, setExportType] = useState<'text' | 'structured'>('text');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [reportNumber, setReportNumber] = useState<string>('');
  const [showFileNameInput, setShowFileNameInput] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('klen_export.txt');
  const [reportReady, setReportReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCashDesk, setSelectedCashDesk] = useState<string>('');

  const cashDesks = useAppSelector(selectCashDesks); // Get cash desks from Redux store

  const handleExportTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExportType(event.target.value as 'text' | 'structured');
  };

  const handleExecute = () => {
    // Simulate parameter validation if needed
    console.log('Export Parameters:', {
      exportType,
      dateFrom,
      dateTo,
      receiptNumber,
      reportNumber,
    });
    setIsLoading(true);
    // Simulate a delay
    setTimeout(() => {
      setShowFileNameInput(true);
      setReportReady(false); // Reset report ready state
      setIsLoading(false);
    }, 1500); // 1.5 second delay
  };

  const handleSaveFile = () => {
    if (!fileName.trim()) {
      alert('Моля, въведете име на файл.');
      return;
    }
    setIsLoading(true);
    // Simulate file save
    console.log('Saving file as:', fileName);
    // Simulate a delay
    setTimeout(() => {
      setShowFileNameInput(false);
      setReportReady(true);
      setIsLoading(false);
      // alert('КЛЕН данните са записани успешно!'); // This will be replaced by the Alert component
    }, 2000); // 2 second delay
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Експорт на КЛЕН
        </Typography>
        <Typography paragraph color="textSecondary">
          Форма за параметризация на експорта на данни от фискалната памет (КЛЕН).
        </Typography>

        {reportReady && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Отчетът е готов и файлът "{fileName}" е генериран успешно!
          </Alert>
        )}

        {!showFileNameInput ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="cash-desk-select-label">Избор на каса</InputLabel>
                <Select
                  labelId="cash-desk-select-label"
                  id="cash-desk-select"
                  value={selectedCashDesk}
                  label="Избор на каса"
                  onChange={(e) => setSelectedCashDesk(e.target.value as string)}
                >
                  {cashDesks.map((desk) => (
                    <MenuItem key={desk.id} value={desk.id}>
                      {desk.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Тип на експорта</FormLabel>
                <RadioGroup
                  row
                  aria-label="export type"
                  name="exportType"
                  value={exportType}
                  onChange={handleExportTypeChange}
                >
                  <FormControlLabel value="text" control={<Radio />} label="Текстови" />
                  <FormControlLabel value="structured" control={<Radio />} label="Структуриран" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="От дата"
                value={dateFrom}
                onChange={(newValue) => setDateFrom(newValue)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="До дата"
                value={dateTo}
                onChange={(newValue) => setDateTo(newValue)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Филтър по номер на бележка"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Филтър по номер на отчет"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleExecute} disabled={isLoading}>
                Изпълни
              </Button>
              {isLoading && <CircularProgress size={24} sx={{ ml: 2, verticalAlign: 'middle' }} />}
            </Grid>
          </Grid>
        ) : (
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
              Избор на име на файл и директория за експорта
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Име на файл"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              helperText="Системата ще запише файл с КЛЕН данни. (Симулация)"
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="contained" color="success" onClick={handleSaveFile} disabled={isLoading}>
                Запис
              </Button>
              <Button variant="outlined" onClick={() => setShowFileNameInput(false)} disabled={isLoading}>
                Отказ
              </Button>
              {isLoading && <CircularProgress size={24} sx={{ ml: 1, verticalAlign: 'middle' }} />}
            </Box>
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default KlenExportTab; 