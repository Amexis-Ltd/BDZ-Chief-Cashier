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
  { value: 'active', label: 'Активен' },
  { value: 'inactive', label: 'Неактивен' },
  { value: 'expired', label: 'Изтекъл' },
  { value: 'suspended', label: 'Прекратен' },
];

const TYPE_OPTIONS = [
  { value: 'ticket', label: 'Билет' },
  { value: 'reservation', label: 'Резервация' },
  { value: 'pass', label: 'Пропуск' },
];

const ViewTravelDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const document = useSelector((state: RootState) => 
    state.travelDocuments.documents.find(d => d.id === id)
  );

  const handlePrint = () => {
    window.print();
  };

  if (!document) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Документът не е намерен
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
              Превозен документ
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
              Превозен документ
            </Typography>
            <Typography variant="h5" color="primary">
              {document.documentNumber}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Име на клиент
              </Typography>
              <Typography variant="body1" gutterBottom>
                {document.clientName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Тип на документ
              </Typography>
              <Typography variant="body1" gutterBottom>
                {TYPE_OPTIONS.find(type => type.value === document.type)?.label || document.type}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Дата
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(document.date).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Статус
              </Typography>
              <Typography 
                variant="body1" 
                color={
                  document.status === 'active' ? 'success.main' :
                  document.status === 'expired' ? 'error.main' : 'warning.main'
                }
              >
                {STATUS_OPTIONS.find(status => status.value === document.status)?.label || document.status}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Издаден на: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewTravelDocumentPage; 