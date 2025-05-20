import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { RootState } from '../../../store';
import { Claim } from '../../../store/slices/claimsSlice';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Чакаща' },
  { value: 'in_progress', label: 'В процес' },
  { value: 'resolved', label: 'Разрешена' },
  { value: 'rejected', label: 'Отхвърлена' },
];

const ClaimViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const claims = useSelector((state: RootState) => state.claims.claims);
  const claim = claims.find((c: Claim) => c.id === id);

  if (!claim) {
    return (
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography>Рекламацията не е намерена</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Преглед на рекламация
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/documents/claims')}
                sx={{
                  borderColor: '#006837',
                  color: '#006837',
                  '&:hover': {
                    borderColor: '#004d29',
                    backgroundColor: 'rgba(0, 104, 55, 0.04)',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Назад
              </Button>
            </Stack>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Номер на рекламация
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {claim.claimNumber}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Клиент
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {claim.clientName}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Тип
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {claim.type}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Дата
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(claim.date).toLocaleDateString()}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Статус
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {STATUS_OPTIONS.find(status => status.value === claim.status)?.label || claim.status}
                </Typography>
              </Box>

              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Описание
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {claim.description}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/documents/claims/edit/${claim.id}`)}
                sx={{
                  backgroundColor: '#006837',
                  '&:hover': {
                    backgroundColor: '#004d29',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Редактирай
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ClaimViewPage; 