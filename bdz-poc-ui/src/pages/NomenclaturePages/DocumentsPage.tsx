import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  Stack,
  Divider,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { RootState } from '../../store';

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const documents = useSelector((state: RootState) => state.documents.documents);

  const handleEdit = (id: string) => {
    navigate(`/nomenclatures/documents/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete document:', id);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Документи за намаление
            </Typography>
            <Divider sx={{ flex: 1 }} />
            <Button
              variant="contained"
              onClick={() => navigate('/nomenclatures/documents/add')}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
                borderRadius: '4px',
                textTransform: 'none',
              }}
            >
              Добави документ
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Име</TableCell>
                  <TableCell>Кратко име</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Дубликат</TableCell>
                  <TableCell>Клас</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Намаление</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>{document.shortName}</TableCell>
                    <TableCell>{document.price} лв.</TableCell>
                    <TableCell>
                      {document.allowDuplicate ? (
                        <Chip
                          label={`Да (${document.duplicatePrice} лв.)`}
                          color="info"
                          size="small"
                        />
                      ) : (
                        <Chip
                          label="Не"
                          color="default"
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>{document.class}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.discount}</TableCell>
                    <TableCell>
                      <Chip
                        label={document.isActive ? 'Активен' : 'Неактивен'}
                        color={document.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(document.id)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(document.id)}
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
      </Container>
    </Box>
  );
};

export default DocumentsPage; 