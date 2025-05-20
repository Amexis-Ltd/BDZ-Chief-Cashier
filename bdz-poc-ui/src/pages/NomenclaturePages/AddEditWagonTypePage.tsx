import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, Container } from '@mui/material';
import WagonTypeForm from '../../components/WagonTypeForm/WagonTypeForm';
import { RootState } from '../../store';
import { updateWagonType, addWagonType, WagonType } from '../../store/slices/wagonsSlice';

const AddEditWagonTypePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const wagonType = useSelector((state: RootState) =>
    state.wagons?.wagonTypes?.find((type: WagonType) => type.id === id)
  );

  const handleSubmit = (data: WagonType) => {
    if (id) {
      dispatch(updateWagonType({ ...data, id }));
    } else {
      dispatch(addWagonType({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      }));
    }
    navigate('/nomenclatures/wagon-types');
  };

  const handleCancel = () => {
    navigate('/nomenclatures/wagon-types');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Редактиране на тип вагон' : 'Добавяне на тип вагон'}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <WagonTypeForm
            initialData={wagonType}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AddEditWagonTypePage; 