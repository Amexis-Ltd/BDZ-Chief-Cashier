import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import {
  Train as TrainIcon,
  DirectionsRailway as RailwayIcon,
  Map as MapIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  CardMembership as CardIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';

const menuItems = [
  {
    title: 'Номенклатури',
    items: [
      { text: 'Влакове', icon: <TrainIcon />, path: '/nomenclatures/trains' },
      { text: 'Гари', icon: <RailwayIcon />, path: '/nomenclatures/stations' },
      { text: 'Зони и подзони', icon: <MapIcon />, path: '/nomenclatures/zones-and-subzones' },
      { text: 'Типове вагони', icon: <CategoryIcon />, path: '/nomenclatures/wagon-types' },
      { text: 'Документи', icon: <DescriptionIcon />, path: '/nomenclatures/documents' },
    ],
  },
  {
    title: 'Документи',
    items: [
      { text: 'Абонаментни карти', icon: <CardIcon />, path: '/documents/subscription' },
      { text: 'Служебни карти', icon: <BadgeIcon />, path: '/documents/service-cards' },
    ],
  },
  {
    title: 'Съставяне',
    items: [
      { text: 'Съставяне на влак', icon: <TrainIcon />, path: '/composing' },
    ],
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        {menuItems.map((section, index) => (
          <React.Fragment key={section.title}>
            <List>
              <ListItem>
                <Typography variant="subtitle2" color="text.secondary">
                  {section.title}
                </Typography>
              </ListItem>
              {section.items.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 104, 55, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 104, 55, 0.12)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === item.path ? '#006837' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        color: location.pathname === item.path ? '#006837' : 'inherit',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {index < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default Sidebar; 