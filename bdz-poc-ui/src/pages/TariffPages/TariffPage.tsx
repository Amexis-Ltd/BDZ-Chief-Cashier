import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TariffPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Управление на тарифи
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Създаване, преглед и управление на тарифи за превоз на пътници
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Видове тарифи по начин на формиране на цената
        </Typography>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <SpeedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Динамични тарифи
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Тарифи с динамично ценообразуване според фактори като сезонност, търсене, запълняемост и др.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link}
                  to="/tariffs/dynamic" 
                  size="small" 
                  color="primary"
                >
                  Преглед
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Фиксирани тарифи
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Тарифи с предварително определена фиксирана цена за конкретен маршрут, категория пътници или тип услуга.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link}
                  to="/tariffs/fixed" 
                  size="small" 
                  color="primary"
                >
                  Преглед
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Видове тарифи според обхват на услугата
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <TrainIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Договор с държавата
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Тарифи за превоз на пътници и ръчен багаж по железопътния транспорт във вътрешно съобщение, разработени съгласно Договора с държавата за обществена услуга.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link}
                  to="/tariffs/contract" 
                  size="small" 
                  color="primary"
                >
                  Преглед
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalActivityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Търговски тарифи
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Тарифи извън Договора с държавата, включително за специални превози, атракционни пътувания, отдаване на подвижния състав под наем и снимачна дейност. Определят се чрез договаряне.
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" color="text.primary" fontWeight="bold">
                    Видове:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    <Chip label="Специални превози" size="small" />
                    <Chip label="Атракционни пътувания" size="small" />
                    <Chip label="Наем на подвижен състав" size="small" />
                    <Chip label="Снимачна дейност" size="small" />
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link}
                  to="/tariffs/commercial" 
                  size="small" 
                  color="primary"
                >
                  Преглед
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TariffPage; 