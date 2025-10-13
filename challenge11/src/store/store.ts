import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/AuthSlice.ts';
import firebaseReducer from './slices/firebaseSlice.js';

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    auth: authSlice.reducer
  },
});