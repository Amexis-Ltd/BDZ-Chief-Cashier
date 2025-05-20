import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SubscriptionCardsPage from './pages/DocumentPages/Subscription/SubscriptionCardsPage';
import SubscriptionCardForm from './pages/DocumentPages/Subscription/SubscriptionCardForm';
import ViewSubscriptionCardPage from './pages/DocumentPages/Subscription/ViewSubscriptionCardPage';
import ServiceCardsPage from './pages/DocumentPages/ServiceCards/ServiceCardsPage';
import ServiceCardForm from './pages/DocumentPages/ServiceCards/ServiceCardForm';
import ViewServiceCardPage from './pages/DocumentPages/ServiceCards/ViewServiceCardPage';
import TravelDocumentsPage from './pages/DocumentPages/TravelDocuments/TravelDocumentsPage';
import TravelDocumentForm from './pages/DocumentPages/TravelDocuments/TravelDocumentForm';
import ViewTravelDocumentPage from './pages/DocumentPages/TravelDocuments/ViewTravelDocumentPage';
import TrainsPage from './pages/NomenclaturePages/TrainsPage';
import AddTrainPage from './pages/NomenclaturePages/AddTrainPage';
import StationsPage from './pages/NomenclaturePages/StationsPage';
import AddStationPage from './pages/NomenclaturePages/AddStationPage';
import EditStationPage from './pages/NomenclaturePages/EditStationPage';
import ZonesAndSubzonesPage from './pages/NomenclaturePages/ZonesAndSubzonesPage';
import WagonsPage from './pages/NomenclaturePages/Wagons';
import WagonTypesPage from './pages/NomenclaturePages/WagonTypesPage';
import AddEditWagonTypePage from './pages/NomenclaturePages/AddEditWagonTypePage';
import DocumentsPage from './pages/NomenclaturePages/DocumentsPage';
import AddEditDocumentPage from './pages/NomenclaturePages/AddEditDocumentPage';
import Composing from './pages/Composing';
import CompositionForm from './pages/CompositionForm';
import ClaimsPage from './pages/DocumentPages/Claims/ClaimsPage';
import ClaimFormPage from './pages/DocumentPages/Claims/ClaimFormPage';
import ClaimViewPage from './pages/DocumentPages/Claims/ClaimViewPage';
import GroupTravelList from './pages/GroupTravelPages/GroupTravelList';
import GroupTravelForm from './pages/GroupTravelPages/GroupTravelForm';
import CashModuleMain from './pages/CashModule/CashModuleMain';
import ReportsPage from './pages/Reports/ReportsPage';
import AddEditZoneAndSubzonesPage from './pages/NomenclaturePages/AddEditZoneAndSubzonesPage';
// Import tariff pages
import TariffPage from './pages/TariffPages/TariffPage';
import DynamicTariffPage from './pages/TariffPages/DynamicTariffPage';
import FixedTariffPage from './pages/TariffPages/FixedTariffPage';
import AddEditTariffPage from './pages/TariffPages/AddEditTariffPage';
import PricingPage from './pages/TariffPages/PricingPage';
import SpecialTariffsPage from './pages/TariffPages/SpecialTariffsPage';
import SubscriptionCardsManagementPage from './pages/TariffPages/SubscriptionCardsManagementPage';
import TariffAssignmentPage from './pages/TariffPages/TariffAssignmentPage';
import ContractPage from './pages/TariffPages/ContractPage';
import SpecialServicesPage from './pages/TariffPages/SpecialServicesPage';
import TariffVersionsPage from './pages/TariffPages/TariffVersionsPage';
import ChiefCashier from './pages/ChiefCashierPages/ChiefCashier';

const AppRoutes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Navigate to="/nomenclatures/trains" replace />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Chief Cashier route */}
          <Route
            path="/chief-cashier"
            element={
              <ProtectedRoute>
                <Layout>
                  <ChiefCashier />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Document routes */}
          <Route
            path="/documents/discount-cards"
            element={
              <ProtectedRoute>
                <Layout>
                  <SubscriptionCardsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/discount-cards/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <SubscriptionCardForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/discount-cards/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <SubscriptionCardForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/discount-cards/:id/view"
            element={
              <ProtectedRoute>
                <Layout>
                  <ViewSubscriptionCardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Service Cards routes */}
          <Route
            path="/documents/service-cards"
            element={
              <ProtectedRoute>
                <Layout>
                  <ServiceCardsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/service-cards/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <ServiceCardForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/service-cards/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ServiceCardForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/service-cards/:id/view"
            element={
              <ProtectedRoute>
                <Layout>
                  <ViewServiceCardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Travel Documents routes */}
          <Route
            path="/documents/travel-documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <TravelDocumentsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/travel-documents/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <TravelDocumentForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/travel-documents/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <TravelDocumentForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/travel-documents/:id/view"
            element={
              <ProtectedRoute>
                <Layout>
                  <ViewTravelDocumentPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Claims routes */}
          <Route
            path="/documents/claims"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClaimsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/claims/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClaimFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/claims/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClaimFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/claims/:id/view"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClaimViewPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Existing routes */}
          <Route
            path="/nomenclatures/trains"
            element={
              <ProtectedRoute>
                <Layout>
                  <TrainsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/trains/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddTrainPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/trains/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddTrainPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/stations"
            element={
              <ProtectedRoute>
                <Layout>
                  <StationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/stations/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddStationPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/stations/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <EditStationPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/zones-and-subzones"
            element={
              <ProtectedRoute>
                <Layout>
                  <ZonesAndSubzonesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/zones-and-subzones/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditZoneAndSubzonesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/zones-and-subzones/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditZoneAndSubzonesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/wagons"
            element={
              <ProtectedRoute>
                <Layout>
                  <WagonsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/wagon-types"
            element={
              <ProtectedRoute>
                <Layout>
                  <WagonTypesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/wagon-types/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditWagonTypePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/wagon-types/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditWagonTypePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <DocumentsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/documents/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditDocumentPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomenclatures/documents/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditDocumentPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/composing"
            element={
              <ProtectedRoute>
                <Layout>
                  <Composing />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/composing/form"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompositionForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/composing/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompositionForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/composing/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompositionForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-travel"
            element={
              <ProtectedRoute>
                <Layout>
                  <GroupTravelList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-travel/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <GroupTravelForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-travel/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <GroupTravelForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Cash Module Route */}
          <Route
            path="/cash-module"
            element={
              <ProtectedRoute>
                <Layout>
                  <CashModuleMain />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Reports Route */}
          <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} />

          {/* Tariff routes */}
          <Route
            path="/tariffs"
            element={
              <ProtectedRoute>
                <Layout>
                  <TariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/fixed"
            element={
              <ProtectedRoute>
                <Layout>
                  <FixedTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/dynamic"
            element={
              <ProtectedRoute>
                <Layout>
                  <DynamicTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/contract"
            element={
              <ProtectedRoute>
                <Layout>
                  <ContractPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/commercial"
            element={
              <ProtectedRoute>
                <Layout>
                  <FixedTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/pricing"
            element={
              <ProtectedRoute>
                <Layout>
                  <PricingPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/fixed/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/fixed/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/dynamic/add"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/dynamic/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEditTariffPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/special"
            element={
              <ProtectedRoute>
                <Layout>
                  <SpecialTariffsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/subscriptions"
            element={
              <ProtectedRoute>
                <Layout>
                  <SubscriptionCardsManagementPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/assign"
            element={
              <ProtectedRoute>
                <Layout>
                  <TariffAssignmentPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/special-services"
            element={
              <ProtectedRoute>
                <Layout>
                  <SpecialServicesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tariffs/versions"
            element={
              <ProtectedRoute>
                <Layout>
                  <TariffVersionsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AppRoutes; 