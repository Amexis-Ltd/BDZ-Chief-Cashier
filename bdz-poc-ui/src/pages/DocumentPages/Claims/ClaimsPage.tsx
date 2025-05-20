import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  Stack,
  Divider,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RootState } from '../../../store';
import { deleteClaim } from '../../../store/slices/claimsSlice';
import { Claim } from '../../../store/slices/claimsSlice';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Чакаща' },
  { value: 'in_progress', label: 'В процес' },
  { value: 'resolved', label: 'Разрешена' },
  { value: 'rejected', label: 'Отхвърлена' },
];

const ClaimsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const claims = useSelector((state: RootState) => state.claims.claims);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [claimToDelete, setClaimToDelete] = React.useState<string | null>(null);

  // Филтри
  const [filters, setFilters] = React.useState({
    clientName: '',
    claimNumber: '',
    date: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredClaims = claims.filter((claim: Claim) => {
    const matchesClient = claim.clientName.toLowerCase().includes(filters.clientName.toLowerCase());
    const matchesNumber = claim.claimNumber.toLowerCase().includes(filters.claimNumber.toLowerCase());
    const matchesDate = !filters.date || claim.date === filters.date;
    return matchesClient && matchesNumber && matchesDate;
  });

  const handleOpenForm = (claim?: Claim) => {
    if (claim) {
      navigate(`/documents/claims/edit/${claim.id}`);
    } else {
      navigate('/documents/claims/add');
    }
  };

  const handleDelete = (id: string) => {
    setClaimToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (claimToDelete) {
      dispatch(deleteClaim(claimToDelete));
      setDeleteDialogOpen(false);
      setClaimToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setClaimToDelete(null);
  };

  const getClaimNumber = (id: string) => {
    const claim = claims.find((c: Claim) => c.id === id);
    return claim ? claim.claimNumber : '';
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Рекламации
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenForm()}
                sx={{
                  backgroundColor: '#006837',
                  '&:hover': {
                    backgroundColor: '#004d29',
                  },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
              >
                Добави
              </Button>
            </Stack>

            {/* Филтри */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Клиент"
                    name="clientName"
                    value={filters.clientName}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Номер на рекламация"
                    name="claimNumber"
                    value={filters.claimNumber}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Дата"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Stack>
            </Paper>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Номер на рекламация</TableCell>
                    <TableCell>Клиент</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClaims.map((claim: Claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.clientName}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {STATUS_OPTIONS.find(status => status.value === claim.status)?.label || claim.status}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/documents/claims/${claim.id}/view`)}
                          title="Преглед"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenForm(claim)}
                          title="Редактиране"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(claim.id)}
                          title="Изтриване"
                          sx={{ color: '#d32f2f' }}
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
        </Box>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете рекламация "{getClaimNumber(claimToDelete || '')}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Отказ
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClaimsPage; 