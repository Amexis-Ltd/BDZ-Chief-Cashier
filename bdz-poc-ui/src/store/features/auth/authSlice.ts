import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../..';

// Define types for user roles and states
type UserRole = 'cashier' | 'customer' | null;

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean; // General logged in status (either role)
  isCashierLoggedIn: boolean; // Specific for cashier
  isCustomerLoggedIn: boolean; // Specific for customer
  username: string | null; // Could be cashier username or customer email/name
  role: UserRole;
}

// Load initial state from localStorage if available
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isLoggedIn: false,
        isCashierLoggedIn: false,
        isCustomerLoggedIn: false,
        username: null,
        role: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      isLoggedIn: false,
      isCashierLoggedIn: false,
      isCustomerLoggedIn: false,
      username: null,
      role: null,
    };
  }
};

// Save state to localStorage
const saveState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Handle errors silently
  }
};

// Define the initial state
const initialState: AuthState = loadState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Cashier Login
    cashierLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.isCashierLoggedIn = true;
      state.isCustomerLoggedIn = false; // Ensure customer is logged out
      state.username = action.payload; // Cashier username
      state.role = 'cashier';
      saveState(state);
    },
    // Customer Login
    customerLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.isCashierLoggedIn = false; // Ensure cashier is logged out
      state.isCustomerLoggedIn = true;
      state.username = action.payload; // Customer email/name
      state.role = 'customer';
      saveState(state);
    },
    // General Logout (handles both roles)
    logout: (state) => {
      state.isLoggedIn = false;
      state.isCashierLoggedIn = false;
      state.isCustomerLoggedIn = false;
      state.username = null;
      state.role = null;
      localStorage.removeItem('authState');
    },
  },
});

// Export the actions creators
export const {
  cashierLoginSuccess,
  customerLoginSuccess,
  logout,
} = authSlice.actions;

// Selector functions to get data from the state
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsCashierLoggedIn = (state: RootState) => state.auth.isCashierLoggedIn;
export const selectIsCustomerLoggedIn = (state: RootState) => state.auth.isCustomerLoggedIn;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectUserRole = (state: RootState) => state.auth.role;

// Export the reducer
export default authSlice.reducer; 