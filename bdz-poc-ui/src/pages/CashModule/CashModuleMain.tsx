import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeskIcon from '@mui/icons-material/Desk';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import CashiersTab from './tabs/CashiersTab';
import PointsOfSaleTab from './tabs/PointsOfSaleTab';
import CashDesksTab from './tabs/CashDesksTab';
import OrganizationalStructureTab from './tabs/OrganizationalStructureTab';
import PrinterCodesTab from './tabs/PrinterCodesTab';
import KlenExportTab from './tabs/KlenExportTab';

// Tab panel component for tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cash-module-tabpanel-${index}`}
      aria-labelledby={`cash-module-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `cash-module-tab-${index}`,
    'aria-controls': `cash-module-tabpanel-${index}`,
  };
}

const CashModuleMain: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Касов модул
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Управление на касиери, обекти, работни места, принтери и организационна структура
        </Typography>
      </Paper>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="cash module tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<PersonIcon />} label="Касиери" {...a11yProps(0)} />
            <Tab icon={<StoreIcon />} label="Обекти" {...a11yProps(1)} />
            <Tab icon={<DeskIcon />} label="Работни места" {...a11yProps(2)} />
            <Tab icon={<PrintIcon />} label="Принтер кодове" {...a11yProps(3)} />
            <Tab icon={<AccountTreeIcon />} label="Организационна структура" {...a11yProps(4)} />
            <Tab icon={<ImportExportIcon />} label="КЛЕН експорт" {...a11yProps(5)} />
          </Tabs>
        </Box>
        
        {/* Tab content */}
        <TabPanel value={tabValue} index={0}>
          <CashiersTab />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <PointsOfSaleTab />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <CashDesksTab />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <PrinterCodesTab />
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}> 
          <OrganizationalStructureTab />
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <KlenExportTab />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default CashModuleMain; 