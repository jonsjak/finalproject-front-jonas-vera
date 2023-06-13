import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userName: null,
    userId: null,
    accessToken: null,
    error: null
  },
  reducers: {
    setUser: (store, action) => {
      const { userName, userId, accessToken, error } = action.payload;
      store.userName = userName;
      store.userId = userId;
      store.accessToken = accessToken;
      store.error = error;
    },
    signOut: (store) => {
      store.accessToken = null
    }
  }
});

export default user;

// Add: Logout reducer