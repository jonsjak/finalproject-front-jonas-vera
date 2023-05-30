import { createSlice } from '@reduxjs/toolkit';

export const map = () => createSlice({
  name: 'map',
  initialState: {},
  reducers: {
    currentLocation: (state, action) => {
      console.log(action);
    }
  }
});