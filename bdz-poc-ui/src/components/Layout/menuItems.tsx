import React from 'react';
import { 
  DirectionsRailway, 
  Train, 
  ContentCopy, 
  LocationOn,
  Description,
  CardMembership,
  Badge,
  Receipt
} from '@mui/icons-material';

export const menuItems = [
  {
    text: 'Композиции',
    icon: <DirectionsRailway />,
    path: '/composing'
  },
  {
    text: 'Вагони',
    icon: <Train />,
    path: '/wagons'
  },
  {
    text: 'Номенклатури',
    icon: <ContentCopy />,
    subItems: [
      {
        text: 'Гари',
        path: '/nomenclatures/stations'
      },
      {
        text: 'Типове вагони',
        path: '/nomenclatures/wagon-types'
      }
    ]
  },
  {
    text: 'Документи',
    icon: <Description />,
    subItems: [
      {
        text: 'Карти за намаление',
        icon: <CardMembership />,
        path: '/documents/discount-cards'
      },
      {
        text: 'Служебни карти',
        icon: <Badge />,
        path: '/documents/service-cards'
      },
      {
        text: 'Превозни документи',
        icon: <Receipt />,
        path: '/documents/travel-documents'
      }
    ]
  }
]; 