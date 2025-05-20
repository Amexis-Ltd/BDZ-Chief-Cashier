import React, { ReactNode, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Paper,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Train as TrainIcon,
  LocationOn as LocationOnIcon,
  Map as MapIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  FormatListBulleted as FormatListBulletedIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectIsLoggedIn,
  selectIsCashierLoggedIn,
  selectIsCustomerLoggedIn,
  logout,
} from '../../store/features/auth/authSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMembership from '@mui/icons-material/CardMembership';
import Badge from '@mui/icons-material/Badge';
import Receipt from '@mui/icons-material/Receipt';
import ReportProblem from '@mui/icons-material/ReportProblem';
import CashIcon from '@mui/icons-material/AttachMoney'; // Added Cash icon
import GroupsIcon from '@mui/icons-material/Groups';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import HistoryIcon from '@mui/icons-material/History';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactElement;
  path?: string;
  action?: () => void;
  show?: 'always' | 'loggedOut' | 'loggedInCustomer' | 'loggedInCashier';
  subItems?: { label: string; icon: React.ReactElement; path: string }[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isCashierLoggedIn = useAppSelector(selectIsCashierLoggedIn);
  const isCustomerLoggedIn = useAppSelector(selectIsCustomerLoggedIn);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openNomenclatures, setOpenNomenclatures] = useState(false);
  const [openDocuments, setOpenDocuments] = useState(false);
  const [openTariffSubmenu, setOpenTariffSubmenu] = useState(false);
  const [openMainSubmenu, setOpenMainSubmenu] = useState(false);
  const [openChiefCashierSubmenu, setOpenChiefCashierSubmenu] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMainSubmenuClick = () => {
    setOpenMainSubmenu(!openMainSubmenu);
    if (openNomenclatures) setOpenNomenclatures(false);
    if (openDocuments) setOpenDocuments(false);
    if (openTariffSubmenu) setOpenTariffSubmenu(false);
    if (openChiefCashierSubmenu) setOpenChiefCashierSubmenu(false);
  };

  const handleNomenclaturesClick = () => {
    setOpenNomenclatures(!openNomenclatures);
    if (openMainSubmenu) setOpenMainSubmenu(false);
    if (openDocuments) setOpenDocuments(false);
    if (openTariffSubmenu) setOpenTariffSubmenu(false);
    if (openChiefCashierSubmenu) setOpenChiefCashierSubmenu(false);
  };

  const handleDocumentsClick = () => {
    setOpenDocuments(!openDocuments);
    if (openMainSubmenu) setOpenMainSubmenu(false);
    if (openNomenclatures) setOpenNomenclatures(false);
    if (openTariffSubmenu) setOpenTariffSubmenu(false);
    if (openChiefCashierSubmenu) setOpenChiefCashierSubmenu(false);
  };
  
  const handleTariffSubmenuClick = () => {
    setOpenTariffSubmenu(!openTariffSubmenu);
    if (openMainSubmenu) setOpenMainSubmenu(false);
    if (openNomenclatures) setOpenNomenclatures(false);
    if (openDocuments) setOpenDocuments(false);
    if (openChiefCashierSubmenu) setOpenChiefCashierSubmenu(false);
  };

  const handleChiefCashierSubmenuClick = () => {
    setOpenChiefCashierSubmenu(!openChiefCashierSubmenu);
    if (openMainSubmenu) setOpenMainSubmenu(false);
    if (openNomenclatures) setOpenNomenclatures(false);
    if (openDocuments) setOpenDocuments(false);
    if (openTariffSubmenu) setOpenTariffSubmenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const navigationItems: NavItem[] = [
    {
      label: 'Основни',
      icon: <TrainIcon sx={{ mr: 1 }} />,
      show: 'always',
      subItems: [
        {
          label: 'Влакови композиции',
          icon: <TrainIcon />,
          path: '/composing'
        },
        {
          label: 'Групови пътувания',
          icon: <GroupsIcon />,
          path: '/group-travel'
        },
        {
          label: 'Справки',
          icon: <AssessmentIcon />,
          path: '/reports'
        }
      ]
    },
    {
      label: 'Главен касиер',
      icon: <CashIcon sx={{ mr: 1 }} />,
      show: 'always',
      subItems: [
        {
          label: 'Касова книга',
          icon: <CashIcon />,
          path: '/chief-cashier/cash-book'
        },
        {
          label: 'Сменни отчети',
          icon: <AssessmentIcon />,
          path: '/chief-cashier/shift-reports'
        },
        {
          label: 'Главна сметка КП 612',
          icon: <DescriptionIcon />,
          path: '/chief-cashier/ledger-account'
        },
        {
          label: 'Коригиращи ордери',
          icon: <DescriptionIcon />,
          path: '/chief-cashier/corrective-voucher'
        },
        {
          label: 'Управление на депозити и консумативи',
          icon: <DescriptionIcon />,
          path: '/chief-cashier/deposits-consumables'
        }
      ]
    },
    {
      label: 'Номенклатури',
      icon: <FormatListBulletedIcon sx={{ mr: 1 }} />,
      show: 'always',
      subItems: [
        {
          label: 'Влакове',
          icon: <TrainIcon />,
          path: '/nomenclatures/trains'
        },
        {
          label: 'Гари',
          icon: <LocationOnIcon />,
          path: '/nomenclatures/stations'
        },
        {
          label: 'Зони и подзони',
          icon: <MapIcon />,
          path: '/nomenclatures/zones-and-subzones'
        },
        {
          label: 'Документи за намаление',
          icon: <DescriptionIcon />,
          path: '/nomenclatures/documents'
        },
        {
          label: 'Типове вагони',
          icon: <TrainIcon />,
          path: '/nomenclatures/wagon-types'
        }
      ]
    },
    {
      label: 'Документи',
      icon: <DescriptionIcon sx={{ mr: 1 }} />,
      show: 'always',
      subItems: [
        {
          label: 'Карти за намаление',
          icon: <CardMembership />,
          path: '/documents/discount-cards'
        },
        {
          label: 'Служебни карти',
          icon: <Badge />,
          path: '/documents/service-cards'
        },
        {
          label: 'Превозни документи',
          icon: <Receipt />,
          path: '/documents/travel-documents'
        },
        {
          label: 'Рекламации',
          icon: <ReportProblem />,
          path: '/documents/claims'
        }
      ]
    },
    {
      label: 'Тарифиране',
      icon: <PriceChangeIcon sx={{ mr: 1 }} />,
      show: 'always',
      subItems: [
        {
          label: 'Тарифи по Договор',
          icon: <PriceChangeIcon />,
          path: '/tariffs/contract'
        },
        {
          label: 'Търговски тарифи',
          icon: <PriceChangeIcon />,
          path: '/tariffs/special-services'
        },
        {
          label: 'Ценообразуване',
          icon: <PriceChangeIcon />,
          path: '/tariffs/pricing'
        },
        {
          label: 'История и версии',
          icon: <HistoryIcon />,
          path: '/tariffs/versions'
        },
        {
          label: 'Специални тарифи',
          icon: <PriceChangeIcon />,
          path: '/tariffs/special'
        },
        {
          label: 'Абонаментни карти',
          icon: <CardMembership />,
          path: '/tariffs/subscriptions'
        },
        {
          label: 'Тарифни назначения',
          icon: <PriceChangeIcon />,
          path: '/tariffs/assign'
        }
      ]
    },
    
    {
      label: 'Касов модул',
      icon: <CashIcon sx={{ mr: 1 }} />,
      path: '/cash-module',
      show: 'always'
    },
    { 
      label: 'Изход', 
      action: handleLogout, 
      icon: <LogoutIcon sx={{ mr: 1 }} />, 
      show: 'always' 
    }
  ];

  const getFilteredNavItems = (): NavItem[] => {
    return navigationItems.filter(item => {
      if (!item.show) return false;
      if (item.show === 'always') return true;
      if (item.show === 'loggedInCustomer' && isCustomerLoggedIn) return true;
      if (item.show === 'loggedInCashier' && isCashierLoggedIn) return true;
      return false;
    });
  };

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  const renderDesktopButtons = () => {
    const items = getFilteredNavItems();
    return items.map((item) => {
      const itemKey = item.label + (item.path || '_action');
      
      if (item.subItems) {
        return (
          <Box key={itemKey} sx={{ position: 'relative' }}>
            <Button
              color="inherit"
              onClick={() => {
                if (item.label === 'Основни') handleMainSubmenuClick();
                else if (item.label === 'Номенклатури') handleNomenclaturesClick();
                else if (item.label === 'Документи') handleDocumentsClick();
                else if (item.label === 'Тарифиране') handleTariffSubmenuClick();
                else if (item.label === 'Главен касиер') handleChiefCashierSubmenuClick();
              }}
              startIcon={item.icon}
              endIcon={item.label === 'Основни' ? (openMainSubmenu ? <ExpandLess /> : <ExpandMore />) :
                      item.label === 'Номенклатури' ? (openNomenclatures ? <ExpandLess /> : <ExpandMore />) :
                      item.label === 'Документи' ? (openDocuments ? <ExpandLess /> : <ExpandMore />) :
                      item.label === 'Тарифиране' ? (openTariffSubmenu ? <ExpandLess /> : <ExpandMore />) :
                      item.label === 'Главен касиер' ? (openChiefCashierSubmenu ? <ExpandLess /> : <ExpandMore />) :
                      null}
            >
              {item.label}
            </Button>
            {(item.label === 'Основни' && openMainSubmenu) ||
             (item.label === 'Номенклатури' && openNomenclatures) ||
             (item.label === 'Документи' && openDocuments) ||
             (item.label === 'Тарифиране' && openTariffSubmenu) ||
             (item.label === 'Главен касиер' && openChiefCashierSubmenu) ? (
              <>
                <Box
                  onClick={() => {
                    if (item.label === 'Основни') handleMainSubmenuClick();
                    else if (item.label === 'Номенклатури') handleNomenclaturesClick();
                    else if (item.label === 'Документи') handleDocumentsClick();
                    else if (item.label === 'Тарифиране') handleTariffSubmenuClick();
                    else if (item.label === 'Главен касиер') handleChiefCashierSubmenuClick();
                  }}
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 998,
                  }}
                />
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    mt: 1,
                    minWidth: 250,
                    zIndex: 999,
                    boxShadow: 3,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.label}
                        component={Link}
                        to={subItem.path}
                        onClick={() => {
                          if (item.label === 'Основни') handleMainSubmenuClick();
                          else if (item.label === 'Номенклатури') handleNomenclaturesClick();
                          else if (item.label === 'Документи') handleDocumentsClick();
                          else if (item.label === 'Тарифиране') handleTariffSubmenuClick();
                          else if (item.label === 'Главен касиер') handleChiefCashierSubmenuClick();
                        }}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </>
            ) : null}
          </Box>
        );
      } else if (item.path) {
        return (
          <Button
            key={itemKey}
            color="inherit"
            component={Link}
            to={item.path}
            startIcon={item.icon}
          >
            {item.label}
          </Button>
        );
      } else {
        return (
          <Button
            key={itemKey}
            color="inherit"
            onClick={item.action}
            startIcon={item.icon}
          >
            {item.label}
          </Button>
        );
      }
    });
  };

  // Remove the submenu from mobile menu
  const renderMenuItemsMobile = () => {
    const items = getFilteredNavItems();
    let firstLoginItemRendered = false;

    return items.map((item, index) => {
      const itemKey = item.label + (item.path || '_action');
      const elements: React.ReactNode[] = [];

      if (!isCustomerLoggedIn && !isCashierLoggedIn && item.show === 'loggedOut' && !firstLoginItemRendered) {
        if (index > 0) {
             elements.push(<Divider key={`${itemKey}-divider`} sx={{ my: 0.5 }} />);
        }
        firstLoginItemRendered = true;
      }

      if (item.label === 'Номенклатури') {
        elements.push(
          <MenuItem key={itemKey} onClick={handleNomenclaturesClick}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
            {openNomenclatures ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        );
        if (openNomenclatures) {
          elements.push(
            <MenuItem
              key={`${itemKey}-trains`}
              component={Link}
              to="/nomenclatures/trains"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><TrainIcon /></ListItemIcon>
              <ListItemText primary="Влакове" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-wagon-types`}
              component={Link}
              to="/nomenclatures/wagon-types"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><TrainIcon /></ListItemIcon>
              <ListItemText primary="Типове вагони" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-stations`}
              component={Link}
              to="/nomenclatures/stations"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><LocationOnIcon /></ListItemIcon>
              <ListItemText primary="Гари" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-zones`}
              component={Link}
              to="/nomenclatures/zones-and-subzones"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><MapIcon /></ListItemIcon>
              <ListItemText primary="Зони и подзони" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-documents`}
              component={Link}
              to="/nomenclatures/documents"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Документи за намаление" />
            </MenuItem>
          );
        }
      } else if (item.label === 'Документи') {
        elements.push(
          <MenuItem key={itemKey} onClick={handleDocumentsClick}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
            {openDocuments ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        );
        if (openDocuments) {
          elements.push(
            <MenuItem
              key={`${itemKey}-discount-cards`}
              component={Link}
              to="/documents/discount-cards"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><CardMembership /></ListItemIcon>
              <ListItemText primary="Карти за намаление" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-service-cards`}
              component={Link}
              to="/documents/service-cards"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><Badge /></ListItemIcon>
              <ListItemText primary="Служебни карти" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-travel-documents`}
              component={Link}
              to="/documents/travel-documents"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><Receipt /></ListItemIcon>
              <ListItemText primary="Превозни документи" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-claims`}
              component={Link}
              to="/documents/claims"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><ReportProblem /></ListItemIcon>
              <ListItemText primary="Рекламации" />
            </MenuItem>
          );
        }
      } else if (item.label === 'Тарифиране') {
        elements.push(
          <MenuItem key={itemKey} onClick={handleTariffSubmenuClick}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
            {openTariffSubmenu ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        );
        if (openTariffSubmenu) {
          elements.push(
            <MenuItem
              key={`${itemKey}-contract`}
              component={Link}
              to="/tariffs/contract"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><PriceChangeIcon /></ListItemIcon>
              <ListItemText primary="Тарифи по Договор с държавата" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-special-services`}
              component={Link}
              to="/tariffs/special-services"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><PriceChangeIcon /></ListItemIcon>
              <ListItemText primary="Търговски тарифи" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-divider2`}
              sx={{ pl: 4, my: 0.5 }}
            >
              <Divider sx={{ width: '100%' }} />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-pricing`}
              component={Link}
              to="/tariffs/pricing"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><PriceChangeIcon /></ListItemIcon>
              <ListItemText primary="Ценообразуване" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-versions`}
              component={Link}
              to="/tariffs/versions"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><HistoryIcon /></ListItemIcon>
              <ListItemText primary="История и версии" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-special`}
              component={Link}
              to="/tariffs/special"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><PriceChangeIcon /></ListItemIcon>
              <ListItemText primary="Специални Тарифи и Изключения" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-subscriptions`}
              component={Link}
              to="/tariffs/subscriptions"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><CardMembership /></ListItemIcon>
              <ListItemText primary="Абонаментни карти" />
            </MenuItem>
          );
          elements.push(
            <MenuItem
              key={`${itemKey}-assign`}
              component={Link}
              to="/tariffs/assign"
              onClick={handleMenuClose}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><PriceChangeIcon /></ListItemIcon>
              <ListItemText primary="Тарифни назначения" />
            </MenuItem>
          );
        }
      } else if (item.path) {
        elements.push(
          <MenuItem
            key={itemKey}
            component={Link}
            to={item.path}
            onClick={handleMenuClose}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </MenuItem>
        );
      } else {
        elements.push(
          <MenuItem
            key={itemKey}
            onClick={() => {
              if (item.action) item.action();
              handleMenuClose();
            }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </MenuItem>
        );
      }

      return elements;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <TrainIcon sx={{ mr: 1 }} />
            БДЖ Пътнически превози
          </Typography>
          
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{ 'aria-labelledby': 'menu-button' }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {renderMenuItemsMobile()}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {renderDesktopButtons()}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 