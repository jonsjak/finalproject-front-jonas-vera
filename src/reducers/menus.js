/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const menus = createSlice({
  name: 'menus',
  initialState: {
    filter: false,
    personal: false,
  },
  reducers: {
    toggleFilter: (store, action) => {
      store.filter = action.payload;
    },
    togglePersonalPage: (store, action) => {
      store.personal = action.payload;
      }
    }
  }
);

export default menus;