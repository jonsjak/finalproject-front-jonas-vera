/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const menus = createSlice({
  name: 'menus',
  initialState: {
    filter: false,
    personal: false,
    login: false,
    register: false,
    about: false,
    isMapClickable: false
  },
  reducers: {
    toggleFilter: (store, action) => {
      store.filter = action.payload;
    },
    togglePersonalPage: (store, action) => {
      store.personal = action.payload;
      },
    toggleLoginPage: (store, action) => {
      store.login = action.payload;
    },
    toggleRegisterPage: (store, action) => {
      store.register = action.payload;
    },
    toggleAboutPage: (store, action) => {
      store.about = action.payload;
    },
    toggleMapClicker: (store, action) => {
      store.isMapClickable = action.payload;
    },
    }
  }
);

export default menus;