import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Alert } from '@mui/material';
import { Receipt as ReceiptIcon, TrendingUp as TrendingUpIcon, BarChart as BarChartIcon } from '@mui/icons-material';
import AccountingReports from './AccountingReports';
import MarketingReports from './MarketingReports';
import StatisticsReports from './StatisticsReports';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabItem {
  label: string;
  icon: React.ReactElement;
  component: React.ReactElement;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
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

const ReportsPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs: TabItem[] = [
    {
      label: 'Отчетност',
      icon: <ReceiptIcon />,
      component: <AccountingReports />
    },
    {
      label: 'Маркетинг',
      icon: <TrendingUpIcon />,
      component: <MarketingReports />
    },
    {
      label: 'Статистика',
      icon: <BarChartIcon />,
      component: <StatisticsReports />
    }
  ];

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: { xs: 1, sm: 2, md: 3 },
          backgroundColor: 'background.default',
          borderRadius: 2
        }}
      >
        <Alert severity="info" sx={{ mb: 2 }}>
          Важна забележка: Справките са примерни както като колони, така и като стойности.
        </Alert>
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                flexDirection: 'row',
                gap: 1,
                '& .MuiSvgIcon-root': {
                  marginBottom: '0 !important',
                  marginRight: 1
                }
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={value} index={index}>
              {tab.component}
            </TabPanel>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportsPage; 