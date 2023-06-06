import { createSlice } from '@reduxjs/toolkit';

const location = createSlice({
  name: 'location',
  initialState: {
    movies: null,
    coordinates: null
  },
  reducers: {
    setMovies: (store, action) => {
      store.movies = action.payload
    }
  }
});

export default location;