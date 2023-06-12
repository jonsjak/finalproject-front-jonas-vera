/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const personalmovies = createSlice({
  name: 'personalmovies',
  initialState: {
    allmovies: []
  },
  reducers: {
    setAllMovies: (store, action) => { // All unlimited movies shown on map
      store.allmovies = action.payload; 
    }
  }
});

export default personalmovies;