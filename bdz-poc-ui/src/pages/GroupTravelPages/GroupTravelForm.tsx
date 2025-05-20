import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  SelectChangeEvent,
  Divider,
  FormControlLabel,
  Switch,
  Container,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addRequest, updateRequest, GroupTravelRequest } from '../../store/slices/groupTravelSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { bg } from 'date-fns/locale';

type GroupTravelFormData = Omit<GroupTravelRequest, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'departureDate' | 'departureTime' | 'returnDate' | 'returnTime'> & {
  departureDate: Date | null;
  departureTime: Date | null;
  returnDate: Date | null;
  returnTime: Date | null;
};

const initialFormData: GroupTravelFormData = {
  requestNumber: '',
  groupName: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  groupType: '',
  totalPeople: 0,
  childrenUnder7: 0,
  peopleWithDiscount: 0,
  departureDate: null,
  departureTime: null,
  departureStation: '',
  arrivalStation: '',
  hasTransfers: false,
  hasReturnJourney: false,
  returnDate: null,
  returnTime: null,
  returnDepartureStation: '',
  returnArrivalStation: '',
  returnHasTransfers: false,
  notes: '',
};

const groupTypes = [
  { id: 'school', name: 'Училище' },
  { id: 'kindergarten', name: 'Детска градина' },
  { id: 'sports', name: 'Спортен клуб' },
  { id: 'cultural', name: 'Културна институция' },
  { id: 'company', name: 'Фирма' },
  { id: 'other', name: 'Друго' }
];

const GroupTravelForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const stations = useAppSelector((state) => state.stations.stations);
  const existingRequest = useAppSelector((state) => 
    state.groupTravel.requests.find(r => r.id === id)
  );

  const [formData, setFormData] = useState<GroupTravelFormData>(
    isEditMode && existingRequest
      ? {
          ...existingRequest,
          departureDate: existingRequest.departureDate ? new Date(existingRequest.departureDate) : null,
          departureTime: existingRequest.departureTime ? new Date(existingRequest.departureTime) : null,
          returnDate: existingRequest.returnDate ? new Date(existingRequest.returnDate) : null,
          returnTime: existingRequest.returnTime ? new Date(existingRequest.returnTime) : null,
        }
      : initialFormData
  );
  const [errors, setErrors] = useState<Partial<Record<keyof GroupTravelFormData, string>>>({});

  const handleInputChange = (field: keyof GroupTravelFormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }> | SelectChangeEvent
  ) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleDateChange = (field: 'departureDate' | 'returnDate') => (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleTimeChange = (field: 'departureTime' | 'returnTime') => (time: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: time,
    }));
  };

  const handleSwitchChange = (field: keyof GroupTravelFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GroupTravelFormData, string>> = {};

    // Required fields validation
    if (!formData.groupName?.trim()) {
      newErrors.groupName = 'Името на групата е задължително';
    }
    if (!formData.contactPerson?.trim()) {
      newErrors.contactPerson = 'Името на контактното лице е задължително';
    }
    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = 'Имейлът е задължителен';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Невалиден имейл формат';
    }
    if (!formData.contactPhone?.trim()) {
      newErrors.contactPhone = 'Телефонният номер е задължителен';
    }
    if (!formData.groupType) {
      newErrors.groupType = 'Типът на групата е задължителен';
    }
    if (!formData.totalPeople || formData.totalPeople <= 0) {
      newErrors.totalPeople = 'Общият брой хора трябва да е по-голям от 0';
    }
    if (formData.childrenUnder7 < 0) {
      newErrors.childrenUnder7 = 'Броят на децата до 7 години трябва да е по-голям или равен на 0';
    }
    if (formData.peopleWithDiscount < 0) {
      newErrors.peopleWithDiscount = 'Броят на пътниците с намаление трябва да е по-голям или равен на 0';
    }

    // Journey validation
    if (!formData.departureDate) {
      newErrors.departureDate = 'Датата на тръгване е задължителна';
    }
    if (!formData.departureTime) {
      newErrors.departureTime = 'Часът на тръгване е задължителен';
    }
    if (!formData.departureStation) {
      newErrors.departureStation = 'Гарата на тръгване е задължителна';
    }
    if (!formData.arrivalStation) {
      newErrors.arrivalStation = 'Гарата на пристигане е задължителна';
    }

    // Return journey validation (only if hasReturnJourney is true)
    if (formData.hasReturnJourney) {
      if (!formData.returnDate) {
        newErrors.returnDate = 'Датата на връщане е задължителна';
      }
      if (!formData.returnTime) {
        newErrors.returnTime = 'Часът на връщане е задължителен';
      }
      if (!formData.returnDepartureStation) {
        newErrors.returnDepartureStation = 'Гарата на тръгване за връщане е задължителна';
      }
      if (!formData.returnArrivalStation) {
        newErrors.returnArrivalStation = 'Гарата на пристигане за връщане е задължителна';
      }
    }

    // Date validation
    if (formData.departureDate && formData.returnDate && formData.departureDate > formData.returnDate) {
      newErrors.returnDate = 'Датата на връщане трябва да е след датата на тръгване';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data before validation:', formData);
    const isValid = validateForm();
    console.log('Form validation result:', isValid);
    console.log('Validation errors:', errors);
    
    if (isValid) {
      const requestData: GroupTravelRequest = {
        ...formData,
        id: isEditMode ? id! : crypto.randomUUID(),
        status: isEditMode ? existingRequest?.status || 'pending' : 'pending',
        createdAt: isEditMode ? existingRequest?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Convert Date objects to ISO strings
        departureDate: formData.departureDate ? formData.departureDate.toISOString() : null,
        departureTime: formData.departureTime ? formData.departureTime.toISOString() : null,
        returnDate: formData.returnDate ? formData.returnDate.toISOString() : null,
        returnTime: formData.returnTime ? formData.returnTime.toISOString() : null,
      };

      if (isEditMode) {
        dispatch(updateRequest(requestData));
      } else {
        dispatch(addRequest(requestData));
      }
      navigate('/group-travel');
    }
  };

  const handleCancel = () => {
    navigate('/group-travel');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Редактиране на групова заявка' : 'Нова групова заявка'}
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: 'grid', gap: 3 }}>
              {/* Contact Information Section */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Информация за водача/отговорника
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Име на отговорника"
                    value={formData.contactPerson}
                    onChange={handleInputChange('contactPerson')}
                    error={Boolean(errors.contactPerson)}
                    helperText={errors.contactPerson}
                  />
                  <TextField
                    fullWidth
                    label="Имейл"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange('contactEmail')}
                    error={Boolean(errors.contactEmail)}
                    helperText={errors.contactEmail}
                  />
                  <TextField
                    fullWidth
                    label="Телефон"
                    value={formData.contactPhone}
                    onChange={handleInputChange('contactPhone')}
                    error={Boolean(errors.contactPhone)}
                    helperText={errors.contactPhone}
                  />
                </Box>
              </Box>

              {/* Group Information Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Данни за групата
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Име на групата"
                    value={formData.groupName}
                    onChange={handleInputChange('groupName')}
                    error={Boolean(errors.groupName)}
                    helperText={errors.groupName}
                  />
                  <FormControl fullWidth error={Boolean(errors.groupType)}>
                    <InputLabel>Тип на групата</InputLabel>
                    <Select
                      value={formData.groupType}
                      onChange={handleInputChange('groupType')}
                      label="Тип на групата"
                    >
                      {groupTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.groupType && (
                      <FormHelperText>{errors.groupType}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Общ брой хора"
                    type="number"
                    value={formData.totalPeople}
                    onChange={handleInputChange('totalPeople')}
                    error={Boolean(errors.totalPeople)}
                    helperText={errors.totalPeople}
                  />
                  <TextField
                    fullWidth
                    label="Брой деца до 7г."
                    type="number"
                    value={formData.childrenUnder7}
                    onChange={handleInputChange('childrenUnder7')}
                    error={Boolean(errors.childrenUnder7)}
                    helperText={errors.childrenUnder7}
                  />
                  <TextField
                    fullWidth
                    label="Брой пътници с намаление"
                    type="number"
                    value={formData.peopleWithDiscount}
                    onChange={handleInputChange('peopleWithDiscount')}
                    error={Boolean(errors.peopleWithDiscount)}
                    helperText={errors.peopleWithDiscount}
                  />
                </Box>
              </Box>

              {/* Journey Information Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Данни за пътуването
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                    <DatePicker
                      label="Дата на тръгване"
                      value={formData.departureDate}
                      onChange={handleDateChange('departureDate')}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(errors.departureDate),
                          helperText: errors.departureDate,
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                    <TimePicker
                      label="Час на тръгване"
                      value={formData.departureTime}
                      onChange={handleTimeChange('departureTime')}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(errors.departureTime),
                          helperText: errors.departureTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <FormControl fullWidth error={Boolean(errors.departureStation)}>
                    <InputLabel>Гара на тръгване</InputLabel>
                    <Select
                      value={formData.departureStation}
                      onChange={handleInputChange('departureStation')}
                      label="Гара на тръгване"
                    >
                      {stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.departureStation && (
                      <FormHelperText>{errors.departureStation}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(errors.arrivalStation)}>
                    <InputLabel>Гара на пристигане</InputLabel>
                    <Select
                      value={formData.arrivalStation}
                      onChange={handleInputChange('arrivalStation')}
                      label="Гара на пристигане"
                    >
                      {stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.arrivalStation && (
                      <FormHelperText>{errors.arrivalStation}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.hasTransfers}
                        onChange={handleSwitchChange('hasTransfers')}
                      />
                    }
                    label="Има прекачвания"
                  />
                </Box>
              </Box>

              {/* Return Journey Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Информация за обратно пътуване
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.hasReturnJourney}
                      onChange={handleSwitchChange('hasReturnJourney')}
                    />
                  }
                  label="Има обратно пътуване"
                />
                {formData.hasReturnJourney && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                      <DatePicker
                        label="Дата на връщане"
                        value={formData.returnDate}
                        onChange={handleDateChange('returnDate')}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: Boolean(errors.returnDate),
                            helperText: errors.returnDate,
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
                      <TimePicker
                        label="Час на връщане"
                        value={formData.returnTime}
                        onChange={handleTimeChange('returnTime')}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: Boolean(errors.returnTime),
                            helperText: errors.returnTime,
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <FormControl fullWidth error={Boolean(errors.returnDepartureStation)}>
                      <InputLabel>Гара на тръгване за връщане</InputLabel>
                      <Select
                        value={formData.returnDepartureStation}
                        onChange={handleInputChange('returnDepartureStation')}
                        label="Гара на тръгване за връщане"
                      >
                        {stations.map((station) => (
                          <MenuItem key={station.id} value={station.id}>
                            {station.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.returnDepartureStation && (
                        <FormHelperText>{errors.returnDepartureStation}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(errors.returnArrivalStation)}>
                      <InputLabel>Гара на пристигане за връщане</InputLabel>
                      <Select
                        value={formData.returnArrivalStation}
                        onChange={handleInputChange('returnArrivalStation')}
                        label="Гара на пристигане за връщане"
                      >
                        {stations.map((station) => (
                          <MenuItem key={station.id} value={station.id}>
                            {station.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.returnArrivalStation && (
                        <FormHelperText>{errors.returnArrivalStation}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.returnHasTransfers}
                          onChange={handleSwitchChange('returnHasTransfers')}
                        />
                      }
                      label="Има прекачвания при връщане"
                    />
                  </Box>
                )}
              </Box>

              {/* Additional Information Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Допълнителни изисквания и забележки
                </Typography>
                <TextField
                  fullWidth
                  label="Забележки"
                  multiline
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange('notes')}
                />
              </Box>

              {/* Form Actions */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={handleCancel} type="button">
                  Отказ
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {isEditMode ? 'Запази промените' : 'Създай заявка'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default GroupTravelForm; 