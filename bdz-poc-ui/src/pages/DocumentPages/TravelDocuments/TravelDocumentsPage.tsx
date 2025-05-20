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
import { deleteDocument } from '../../../store/slices/travelDocumentsSlice';
import { TravelDocument } from '../../../store/slices/travelDocumentsSlice';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активен' },
  { value: 'inactive', label: 'Неактивен' },
  { value: 'expired', label: 'Изтекъл' },
  { value: 'suspended', label: 'Прекратен' },
];

const TravelDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.travelDocuments.documents);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [documentToDelete, setDocumentToDelete] = React.useState<string | null>(null);

  // Филтри
  const [filters, setFilters] = React.useState({
    clientName: '',
    documentNumber: '',
    date: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesClient = doc.clientName.toLowerCase().includes(filters.clientName.toLowerCase());
    const matchesNumber = doc.documentNumber.toLowerCase().includes(filters.documentNumber.toLowerCase());
    const matchesDate = !filters.date || doc.date === filters.date;
    return matchesClient && matchesNumber && matchesDate;
  });

  const handleOpenForm = (doc?: TravelDocument) => {
    if (doc) {
      navigate(`/documents/travel-documents/edit/${doc.id}`);
    } else {
      navigate('/documents/travel-documents/add');
    }
  };

  const handleDelete = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      dispatch(deleteDocument(documentToDelete));
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const getDocumentNumber = (id: string) => {
    const doc = documents.find(d => d.id === id);
    return doc ? doc.documentNumber : '';
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 3, borderRadius: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                Превозни документи
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
                    label="Номер на документ"
                    name="documentNumber"
                    value={filters.documentNumber}
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
                    <TableCell>Номер на документ</TableCell>
                    <TableCell>Клиент</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.documentNumber}</TableCell>
                      <TableCell>{doc.clientName}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {STATUS_OPTIONS.find(status => status.value === doc.status)?.label || doc.status}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/documents/travel-documents/${doc.id}/view`)}
                          title="Преглед"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenForm(doc)}
                          title="Редактиране"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(doc.id)}
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
            Сигурни ли сте, че искате да изтриете документ "{getDocumentNumber(documentToDelete || '')}"?
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

export default TravelDocumentsPage; 