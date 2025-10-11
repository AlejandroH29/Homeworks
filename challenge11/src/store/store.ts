import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/AuthSlice.ts';
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
});