import React, { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  CircularProgress
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import DeskIcon from '@mui/icons-material/Desk';
import { useSelector } from 'react-redux';
import {
  selectPointsOfSale,
  selectCashDesks,
  selectCashiers,
  selectLoading,
  selectPrinterCodes
} from '../../../store/features/cashModule/cashModuleSlice';
import { PointOfSale, CashDesks, Cashier, PrinterCode } from '../../../types/cashModule';

interface OrganizationalItem {
  id: string;
  name: string;
  type: 'station' | 'pointOfSale' | 'cashDesk' | 'cashier' | 'printerCode';
  originalType?: string;
  childCashDesks?: OrganizationalItem[];
  childCashiers?: OrganizationalItem[];
  childPrinterCodes?: OrganizationalItem[];
}

const buildOrganizationalTree = (
  pointsOfSale: PointOfSale[],
  cashDesks: CashDesks[],
  cashiers: Cashier[],
  printerCodes: PrinterCode[]
): OrganizationalItem[] => {
  const tree: OrganizationalItem[] = pointsOfSale.map(pos => {
    const posItem: OrganizationalItem = {
      id: pos.id,
      name: `${pos.name} (${pos.type === 'station' ? 'Обект' : 'ПОС'})`,
      type: 'station',
      originalType: pos.type,
    };

    const cashDesksAtLocation = cashDesks.filter(ws => ws.locationId === pos.id);
    posItem.childCashDesks = cashDesksAtLocation.map(ws => {
      return {
        id: ws.id,
        name: `${ws.name}`,
        type: 'cashDesk',
      };
    });

    const cashiersAtLocation = cashiers.filter(c => c.locationId === pos.id);
    posItem.childCashiers = cashiersAtLocation.map(c => ({
      id: c.id,
      name: `${c.name} (ID: ${c.employeeId})`,
      type: 'cashier',
    }));

    const printerCodesForLocation = printerCodes.filter(pc => pc.locationId === pos.id);
    posItem.childPrinterCodes = printerCodesForLocation.map(pc => ({
      id: pc.id,
      name: `${pc.name} (Код: ${pc.number})`,
      type: 'printerCode',
    }));

    return posItem;
  });

  return tree;
};

const getIcon = (type: OrganizationalItem['type'], originalType?: string) => {
  switch (type) {
    case 'station': 
      return originalType === 'station' ? <StoreIcon /> : <StorefrontIcon />;
    case 'pointOfSale': return <StorefrontIcon />;
    case 'cashDesk': return <DeskIcon />;
    case 'cashier': return <PersonIcon />;
    case 'printerCode': return <PrintIcon />;
    default: return null;
  }
};

const OrganizationalNode: React.FC<{ node: OrganizationalItem; depth?: number }> = ({ node, depth = 0 }) => {
  const [stationOpen, setStationOpen] = useState(false);
  const [openCashDesks, setOpenCashDesks] = useState(false);
  const [openCashiers, setOpenCashiers] = useState(false);
  const [openPrinterCodes, setOpenPrinterCodes] = useState(false);

  const isStationNode = node.type === 'station';

  const hasCashDesks = node.childCashDesks && node.childCashDesks.length > 0;
  const hasCashiers = node.childCashiers && node.childCashiers.length > 0;
  const hasPrinterCodes = node.childPrinterCodes && node.childPrinterCodes.length > 0;

  const stationIsExpandable = isStationNode && (hasCashDesks || hasCashiers || hasPrinterCodes);

  const handleStationToggle = () => {
    if (stationIsExpandable) {
      setStationOpen(!stationOpen);
    }
  };

  return (
    <>
      <ListItemButton 
        onClick={isStationNode ? handleStationToggle : undefined} 
        sx={{ pl: 2 * (depth + 1) }}
      >
        <ListItemIcon>{getIcon(node.type, node.originalType)}</ListItemIcon>
        <ListItemText primary={node.name} />
        {stationIsExpandable ? (stationOpen ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>

      {isStationNode && (
        <Collapse in={stationOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* CashDesks Group */}
            {hasCashDesks && (
              <>
                <ListItemButton 
                  onClick={() => setOpenCashDesks(!openCashDesks)}
                  sx={{ pl: 2 * (depth + 2) }}
                >
                  <ListItemIcon><DeskIcon /></ListItemIcon>
                  <ListItemText primary="Работни места" />
                  {openCashDesks ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCashDesks} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {node.childCashDesks?.map((cashDeskNode) => (
                      <ListItemButton key={cashDeskNode.id} sx={{ pl: 2 * (depth + 3) }}>
                        <ListItemIcon>{getIcon(cashDeskNode.type, cashDeskNode.originalType)}</ListItemIcon>
                        <ListItemText primary={cashDeskNode.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}

            {/* Cashiers Group */}
            {hasCashiers && (
              <>
                <ListItemButton 
                  onClick={() => setOpenCashiers(!openCashiers)} 
                  sx={{ pl: 2 * (depth + 2) }}
                >
                  <ListItemIcon>{getIcon('cashier')}</ListItemIcon>
                  <ListItemText primary="Касиери" />
                  {openCashiers ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCashiers} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {node.childCashiers?.map((cashierNode) => (
                      <ListItemButton key={cashierNode.id} sx={{ pl: 2 * (depth + 3) }}>
                        <ListItemIcon>{getIcon(cashierNode.type, cashierNode.originalType)}</ListItemIcon>
                        <ListItemText primary={cashierNode.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}

            {/* Printer Codes Group */}
            {hasPrinterCodes && (
              <>
                <ListItemButton 
                  onClick={() => setOpenPrinterCodes(!openPrinterCodes)} 
                  sx={{ pl: 2 * (depth + 2) }}
                >
                  <ListItemIcon>{getIcon('printerCode')}</ListItemIcon>
                  <ListItemText primary="Принтер кодове" />
                  {openPrinterCodes ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPrinterCodes} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {node.childPrinterCodes?.map((pcNode) => (
                      <ListItemButton key={pcNode.id} sx={{ pl: 2 * (depth + 3) }}>
                        <ListItemIcon>{getIcon(pcNode.type, pcNode.originalType)}</ListItemIcon>
                        <ListItemText primary={pcNode.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </List>
        </Collapse>
      )}
    </>
  );
};

const OrganizationalStructureTab: React.FC = () => {
  const pointsOfSale = useSelector(selectPointsOfSale);
  const cashDesks = useSelector(selectCashDesks);
  const cashiers = useSelector(selectCashiers);
  const isLoading = useSelector(selectLoading);
  const printerCodes = useSelector(selectPrinterCodes);

  const organizationalTreeData = useMemo(() => {
    if (isLoading || !pointsOfSale || !cashDesks || !cashiers || !printerCodes) return [];
    return buildOrganizationalTree(pointsOfSale, cashDesks, cashiers, printerCodes);
  }, [pointsOfSale, cashDesks, cashiers, printerCodes, isLoading]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p:3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pointsOfSale || pointsOfSale.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Няма дефинирани обекти.</Typography>
        <Typography>Моля, първо добавете обекти, за да видите организационната структура.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p:2 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
        Организационна структура
      </Typography>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {organizationalTreeData.map((node) => (
          <OrganizationalNode key={node.id} node={node} />
        ))}
      </List>
    </Box>
  );
};

export default OrganizationalStructureTab; 