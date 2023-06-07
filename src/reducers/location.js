/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const location = createSlice({
  name: 'location',
  initialState: {
    movies: null,
    coordinates: [],
    isLoading: true
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
    setShowMovieDetails: (state, action) => {
      // Find the selected movie by its _id
      const selectedMovie = state.movies.find((movie) => movie._id === action.payload);
    
      if (selectedMovie) {
        // Toggle the showMovieDetails property of the selected movie
        const updatedMovies = state.movies.map((movie) => {
          if (movie._id === action.payload) {
            return {
              ...movie,
              showMovieDetails: !movie.showMovieDetails, // Toggle the value
            };
          }
          return movie;
        });
    
        return {
          ...state,
          movies: updatedMovies,
        };
      }
    
      return state; // Return the current state if the movie is not found
    }
  }
});

export default location;