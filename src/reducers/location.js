/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const location = createSlice({
  name: 'location',
  initialState: {
    movies: null,
    coordinates: [],
    isLoading: true,
    activeMovie: null,
    savedmovies: []
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
    },
    saveActiveMovie: (store, action) => {
      const newLikedBy = [...store.activeMovie.LikedBy, action.payload];
      store.activeMovie = { ...store.activeMovie, LikedBy: newLikedBy };
    },
    saveMovie: (store, action) => {
      const movieId = action.payload.movieId;
      const userId = action.payload.userId;
      
      const updatedMovies = store.movies.map((movie) => {
        if (movie.id === movieId) {
          const newLikedBy = [...movie.LikedBy, userId];
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
    
      store.movies = updatedMovies;
    },
    clearActiveMovie: (store, action) => {
      const userIdRemove = action.payload;
      const newLikedBy = store.activeMovie.LikedBy.filter((id) => id !== userIdRemove);
      store.activeMovie = { ...store.activeMovie, LikedBy: newLikedBy };
    },
    clearSavedMovie: (store, action) => {
      const userIdRemove = action.payload;
      const updatedMovies = store.movies.map(movie => {
        if (movie === store.activeMovie) {
          const newLikedBy = movie.LikedBy.filter(id => id !== userIdRemove);
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
      store.movies = updatedMovies;
    },
    setAllSavedMovies: (store, action) => {
      return {
        ...store,
        savedmovies: action.payload
      };
    },
    deleteSavedMovieFromList: (store, action) => {
      store.savedmovies.splice(action.payload, 1);
    },
    
    }
});

export default location;