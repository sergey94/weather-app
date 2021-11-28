import { configureStore } from '@reduxjs/toolkit';
import weather from './slices/weather';
import cities from './slices/cities';

export const store = configureStore({
  reducer: {
    weather,
    cities,
  },
});