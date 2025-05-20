import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

interface SubscriptionCard {
  id: string;
  cardNumber: string;
  holderName: string;
  type: string;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'cancelled';
}

const ViewSubscriptionCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<SubscriptionCard | null>(null);

  useEffect(() => {
    // Fetch card data from your backend
    // This is mock data for now
    setCard({
      id: id || '1',
      cardNumber: 'SC-001',
      holderName: 'Иван Иванов',
      type: 'Месечен',
      validFrom: '2024-03-01',
      validTo: '2024-03-31',
      status: 'active'
    });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!card) {
    return <Typography>Зареждане...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Абонаментна карта
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

            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Абонаментна карта
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
                    Тип на картата
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {card.type}
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

                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
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
                    {card.status === 'active' ? 'Активна' :
                     card.status === 'expired' ? 'Изтекла' : 'Анулирана'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Издадена на: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ViewSubscriptionCardPage; 