import React, { ReactNode, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro';
import {
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { bg } from 'date-fns/locale';

interface ReportsLayoutProps {
  children: ReactNode;
  title: string;
  onExport?: (format: 'excel' | 'pdf') => void;
  onPrint?: () => void;
  onViewChange?: (view: 'table' | 'chart') => void;
  onFilter?: () => void;
  showViewToggle?: boolean;
}

const ReportsLayout: React.FC<ReportsLayoutProps> = ({
  children,
  title,
  onExport,
  onPrint,
  onViewChange,
  onFilter,
  showViewToggle = true,
}) => {
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    onExport?.(format);
    handleExportClose();
  };

  const handleViewChange = (view: 'table' | 'chart') => {
    setViewMode(view);
    onViewChange?.(view);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
      <Box sx={{ flexGrow: 1, minHeight: 0, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6">
                {title}
              </Typography>
              <Divider sx={{ flex: 1 }} />
              <Stack direction="row" spacing={1}>
                <DateRangePicker
                  value={dateRange}
                  onChange={(newValue: DateRange<Date>) => setDateRange(newValue)}
                  localeText={{ start: 'От', end: 'До' }}
                />
                {onFilter && (
                  <Tooltip title="Филтри">
                    <IconButton onClick={onFilter}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {showViewToggle && (
                  <>
                    <Tooltip title="Таблица">
                      <IconButton
                        color={viewMode === 'table' ? 'primary' : 'default'}
                        onClick={() => handleViewChange('table')}
                      >
                        <ViewListIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Графика">
                      <IconButton
                        color={viewMode === 'chart' ? 'primary' : 'default'}
                        onClick={() => handleViewChange('chart')}
                      >
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                <Button
                  variant="outlined"
                  startIcon={<FileDownloadIcon />}
                  onClick={handleExportClick}
                >
                  Експорт
                </Button>
                {onPrint && (
                  <Tooltip title="Печат">
                    <IconButton onClick={onPrint}>
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
            <Menu
              anchorEl={exportAnchorEl}
              open={Boolean(exportAnchorEl)}
              onClose={handleExportClose}
            >
              <MenuItem onClick={() => handleExport('excel')}>Excel</MenuItem>
              <MenuItem onClick={() => handleExport('pdf')}>PDF</MenuItem>
            </Menu>
            <Box sx={{ mt: 2 }}>
              {children}
            </Box>
          </Paper>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default ReportsLayout; 