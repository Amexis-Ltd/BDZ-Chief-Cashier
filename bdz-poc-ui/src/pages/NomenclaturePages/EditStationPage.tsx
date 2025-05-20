import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  FormControlLabel,
  Switch,
  IconButton,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateStation } from '../../store/slices/stationsSlice';
import { Station } from '../../store/slices/stationsSlice';

const EditStationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const station = useAppSelector((state) => 
    state.stations.stations.find(s => s.id === id)
  );

  const [isActive, setIsActive] = useState(station?.isActive ?? true);
  const [deactivationReason, setDeactivationReason] = useState(station?.deactivationReason ?? '');

  const handleSave = () => {
    if (!station) return;
    
    const updatedStation: Station = {
      ...station,
      isActive,
      deactivationReason: isActive ? '' : deactivationReason,
    };
    
    dispatch(updateStation(updatedStation));
    navigate('/stations');
  };

  if (!station) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Station not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/stations')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1">
              Edit Station
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="Station Name"
                value={station.name}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Station Code"
                value={station.code}
                disabled
                sx={{ mb: 2 }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Station Type"
                value={station.type}
                disabled
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Active"
            />
          </Box>

          {!isActive && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Deactivation Reason"
                value={deactivationReason}
                onChange={(e) => setDeactivationReason(e.target.value)}
                multiline
                rows={3}
              />
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/stations')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditStationPage; 