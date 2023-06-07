/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const location = createSlice({
  name: 'location',
  initialState: {
    movies: null,
    coordinates: [],
    isLoading: true,
    activeMovie: null
  },
  reducers: {
    setMovies: (store, action) => {
      store.movies = action.payload
    },
    setMovieCoordinates: (store, action) => {
      store.coordinates.push(action.payload);
    },
    setLoading: (store, action) => {
      store.isLoading = action.payload;
    },
    setActiveMovie: (store, action) => {
      store.activeMovie = action.payload;
      }
    }
  }
);

export default location;