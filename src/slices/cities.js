import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather, fetchMyWeather } from './weather';
import { lsGet, lsSet } from '../utils';

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    list: lsGet('cities-list') || [],
    my: {},
  },
  reducers: {
    add: (state, action) => {
      const cities = action.payload
        .split(',')
        .map(c => ({
          uuid: uuidv4(),
          name: c.trim(),
        }));
      state.list = state.list.concat(cities);
      lsSet('cities-list', state.list);
    },
    remove: (state, action) => {
      state.list = state.list.filter(c => c.uuid !== action.payload);
      lsSet('cities-list', state.list);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if(action.meta.arg) {
          const targetIndex = state.list.findIndex(c => c.uuid === action.meta.arg);
          if(targetIndex >= 0 && action.payload) {
            state.list[targetIndex].fetchedData = true;
            state.list[targetIndex].hasError = false;
            state.list[targetIndex].weather = action.payload?.weather[0]?.main || null;
            state.list[targetIndex].timezone = action.payload?.timezone;
            state.list[targetIndex].name = action.payload?.name;
            state.list[targetIndex].temp = action.payload?.main?.temp || null;
            lsSet('cities-list', state.list);
          }
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        if(action.meta.arg) {
          const targetIndex = state.list.findIndex(c => c.uuid === action.meta.arg);
          state.list[targetIndex].fetchedData = true;
          state.list[targetIndex].hasError = true;
        }
      })
      .addCase(fetchMyWeather.fulfilled, (state, action) => {
        if(action.payload) {
          state.my.hasError = false;
          state.my.weather = action.payload?.weather[0]?.main || null;
          state.my.timezone = action.payload?.timezone;
          state.my.name = action.payload?.name;
          state.my.temp = action.payload?.main?.temp || null;
        }
      })
      .addCase(fetchMyWeather.rejected, (state, action) => {
        state.my.hasError = true;
      });
  },
});

export const { add, remove } = citiesSlice.actions;

export default citiesSlice.reducer;