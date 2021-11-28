import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest, getLocation } from '../utils';

const API_KEY = '629d00f310e36c167108785d7a69aed8';

export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (actionPayload, { getState }) => {
    const { list } = getState().cities;
    if(list?.length) {
      const targetCity = list.find(c => c.uuid === actionPayload);
      return await getRequest('https://api.openweathermap.org/data/2.5/weather', {
        appid: API_KEY,
        q: targetCity.name,
      });
    }
  },
);

export const fetchMyWeather = createAsyncThunk(
  'weather-my/fetch',
  async () => {
    const coords = await getLocation();
    if(coords?.latitude && coords?.longitude) {
      return await getRequest('https://api.openweathermap.org/data/2.5/weather', {
        appid: API_KEY,
        lat: coords.latitude,
        lon: coords.longitude,
      });
    }
  },
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    pendings: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        if(action.meta.arg) {
          state.pendings[action.meta.arg] = true;
        }
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if(action.meta.arg) {
          state.pendings[action.meta.arg] = false;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        if(action.meta.arg) {
          state.pendings[action.meta.arg] = false;
        }
      })
      .addCase(fetchMyWeather.pending, (state, action) => {
        state.pendings.my = true;
      })
      .addCase(fetchMyWeather.fulfilled, (state, action) => {
        state.pendings.my = false;
      })
      .addCase(fetchMyWeather.rejected, (state, action) => {
        state.pendings.my = false;
      });
  },
});

export default weatherSlice.reducer;