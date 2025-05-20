import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { RootState } from '../../../store';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активна' },
  { value: 'inactive', label: 'Неактивна' },
  { value: 'expired', label: 'Изтекла' },
  { value: 'suspended', label: 'Прекратена' },
];

const ViewServiceCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const card = useSelector((state: RootState) => 
    state.serviceCards.cards.find(c => c.id === id)
  );

  const handlePrint = () => {
    window.print();
  };

  if (!card) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Картата не е намерена
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">
              Служебна карта
            </Typography>
            <Divider sx={{ flex: 1 }} />
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                backgroundColor: '#006837',
                '&:hover': {
                  backgroundColor: '#004d29',
                },
                borderRadius: '4px',
                textTransform: 'none',
              }}
            >
              Печат
            </Button>
          </Stack>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Служебна карта
            </Typography>
            <Typography variant="h5" color="primary">
              {card.cardNumber}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Име на притежател
              </Typography>
              <Typography variant="body1" gutterBottom>
                {card.holderName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Служебен номер
              </Typography>
              <Typography variant="body1" gutterBottom>
                {card.employeeNumber}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Валидна от
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(card.validFrom).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Валидна до
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(card.validTo).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Статус
              </Typography>
              <Typography 
                variant="body1" 
                color={
                  card.status === 'active' ? 'success.main' :
                  card.status === 'expired' ? 'error.main' : 'warning.main'
                }
              >
                {STATUS_OPTIONS.find(status => status.value === card.status)?.label || card.status}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Издадена на: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewServiceCardPage; 