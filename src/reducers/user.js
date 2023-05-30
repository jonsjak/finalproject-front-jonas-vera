import { createSlice } from '@reduxjs/toolkit';

export const user = () => createSlice({
  name: 'user',
  initialState: {
    userData: {
      user: 'Arne',
      age: 12
    }
  },
  reducers: {

  }
});