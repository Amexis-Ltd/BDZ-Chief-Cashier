import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type TariffType = 'dynamic' | 'fixed';

const AddEditTariffPage: React.FC = () => {
  const { id, type } = useParams<{ id?: string, type: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const tariffType = type as TariffType;

  const [tariffData, setTariffData] = useState({
    name: '',
    description: '',
    basePrice: '0',
    modifiers: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    pricePerKm: '0',
    serviceFee: '0',
    type: 'Договор с държавата',
    category: 'fixed', // 'fixed' или 'dynamic'
    isActive: true
  });

  useEffect(() => {
    // Симулация на зареждане на данни при редактиране
    if (isEditing && id) {
      // Тук би имало API call за данните на тарифата с ID = id
      // Пример с мок данни
      if (tariffType === 'dynamic') {
        setTariffData({
          name: 'Сезонна тарифа - Лято 2023',
          description: 'Динамична тарифа за летен сезон',
          basePrice: '15.50',
          modifiers: 'Уикенд +10%, Пикови часове +15%',
          startDate: new Date(2023, 4, 1), // 1 май 2023
          endDate: new Date(2023, 8, 30), // 30 септември 2023
          pricePerKm: '0',
          serviceFee: '0',
          type: '',
          category: 'dynamic',
          isActive: true
        });
      } else {
        setTariffData({
          name: 'Обществена услуга - Бърз влак',
          description: 'Фиксирана тарифа по Договор с държавата',
          basePrice: '0',
          modifiers: '',
          startDate: new Date(2023, 0, 1), // 1 януари 2023
          endDate: new Date(2023, 11, 31), // 31 декември 2023
          pricePerKm: '0.10',
          serviceFee: '1.00',
          type: 'Договор с държавата',
          category: 'fixed',
          isActive: true
        });
      }
    }
  }, [isEditing, id, tariffType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTariffData({ ...tariffData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setTariffData({ ...tariffData, [name as string]: value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTariffData({ ...tariffData, isActive: e.target.checked });
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    setTariffData({ ...tariffData, [name]: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Данни за тарифата за запазване:', tariffData);
    // Тук би имало API повикване за запазване/обновяване на тарифата
    navigate(`/tariffs/${tariffType}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditing ? 'Редактиране на тарифа' : 'Добавяне на нова тарифа'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Име на тарифата"
                value={tariffData.name}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                label="Описание"
                value={tariffData.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="tariff-category-label">Категория тарифа</InputLabel>
                <Select
                  labelId="tariff-category-label"
                  name="category"
                  value={tariffData.category}
                  label="Категория тарифа"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="fixed">Фиксирана тарифа</MenuItem>
                  <MenuItem value="dynamic">Динамична тарифа</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {tariffType === 'dynamic' ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="basePrice"
                    label="Базова цена (лв.)"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={tariffData.basePrice}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    multiline
                    name="modifiers"
                    label="Ценови модификатори (напр. Уикенд +10%)"
                    value={tariffData.modifiers}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="tariff-type-label">Тип на тарифата</InputLabel>
                    <Select
                      labelId="tariff-type-label"
                      name="type"
                      value={tariffData.type}
                      label="Тип на тарифата"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Договор с държавата">Договор с държавата</MenuItem>
                      <MenuItem value="Търговска тарифа">Търговска тарифа</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="pricePerKm"
                    label="Цена на километър (лв.)"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={tariffData.pricePerKm}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="serviceFee"
                    label="Такса за услуга (лв.)"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={tariffData.serviceFee}
                    onChange={handleInputChange}
                  />
                </Grid>

                {tariffData.type === 'Търговска тарифа' && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="commercial-type-label">Вид търговска тарифа</InputLabel>
                      <Select
                        labelId="commercial-type-label"
                        name="commercialType"
                        label="Вид търговска тарифа"
                        onChange={handleSelectChange}
                        defaultValue="special"
                      >
                        <MenuItem value="special">Специални превози</MenuItem>
                        <MenuItem value="attraction">Атракционни пътувания</MenuItem>
                        <MenuItem value="rental">Наем на подвижен състав</MenuItem>
                        <MenuItem value="filming">Снимачна дейност</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </>
            )}

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Начална дата"
                value={tariffData.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{
                  textField: { fullWidth: true, name: 'startDate' }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Крайна дата"
                value={tariffData.endDate}
                onChange={handleDateChange('endDate')}
                slotProps={{
                  textField: { fullWidth: true, name: 'endDate' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={tariffData.isActive}
                    onChange={handleSwitchChange}
                    name="isActive"
                    color="primary"
                  />
                }
                label="Активна тарифа"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/tariffs/${tariffType}`)}
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isEditing ? 'Запази промените' : 'Добави тарифа'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEditTariffPage; 