/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

const location = createSlice({
  name: 'location',
  initialState: {
    startmovies: [],
    movies: [],
    startcoordinates: [],
    coordinates: [],
    isLoading: false,
    activeMovie: null,
    savedmovies: []
  },
  reducers: {
    // Show public movies
    setStartMovies: (store, action) => {
      store.startmovies = action.payload
    },
    // Show private movies
    setMovies: (store, action) => {
      return {
        ...store,
        movies: action.payload,
      };
    },
    // Get coordinates for public movies
    setStartMovieCoordinates: (store, action) => {
      store.startcoordinates.push(action.payload);
    },
    // Get coordinates for private movies
    setMovieCoordinates: (store, action) => {
      const movieCoordinates = [...store.coordinates, action.payload];
      return {
        ...store,
        coordinates: movieCoordinates,
      };
    },
    setLoading: (store, action) => {
      store.isLoading = action.payload;
    },
    // Get movie which is selected from marker
    setActiveMovie: (store, action) => {
      store.activeMovie = action.payload;
    },
    // Add a userId to LikedBy property array in a movie
    // - both in activeMovie corresponding movie in movies
    saveMovie: (store, action) => {
      const { movieId, userId } = action.payload;
    
      const updatedMovies = store.movies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, LikedBy: [...movie.LikedBy, userId] };
        }
        return movie;
      });
    
      const activeMovieIndex = updatedMovies.findIndex((movie) => movie._id === store.activeMovie._id);
      const updatedActiveMovie = { ...store.activeMovie, LikedBy: [...store.activeMovie.LikedBy, userId] };
    
      return {
        ...store,
        movies: updatedMovies,
        activeMovie: activeMovieIndex !== -1 ? updatedActiveMovie : store.activeMovie
      };
    },
    // Remove a userId in LikedBy property array in a movie
    // - both in activeMovie corresponding movie in movies
    removeSavedMovie: (store, action) => {
      const userIdRemove = action.payload.userIdRemove;
      const _id = action.payload._id;

      const updatedMovies = store.movies.map((movie) => {
        if (movie._id === _id) {
          const newLikedBy = movie.LikedBy.filter((id) => id !== userIdRemove);
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
    
      const updatedSavedMovies = store.savedmovies.map((movie) => {
        if (movie._id === _id) {
          const newLikedBy = movie.LikedBy.filter((id) => id !== userIdRemove);
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
    
      if (store.activeMovie && store.activeMovie._id === _id) {
        const updatedActiveMovie = {
          ...store.activeMovie,
          LikedBy: store.activeMovie.LikedBy.filter((id) => id !== userIdRemove),
        };
        store.activeMovie = updatedActiveMovie;
      }
      store.movies = updatedMovies;
      store.savedmovies = updatedSavedMovies;
    },
    // Show all saved movies in the savedmovies array in store      
    setAllSavedMovies: (store, action) => {
      store.savedmovies = [...action.payload];
    },
    // Add new movie to the movies array
    addMovie: (store, action) => {
      store.movies = [...store.movies, action.payload];
    },
    // Update coordinates array in the store with the new movie's coordinates
    updateMovieCoordinates: (store, action) => {
      const { movieId, coordinates } = action.payload;

      const updatedMovies = store.movies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, coordinates };
        }
        return movie;
      });

      store.coordinates = updatedMovies.map((movie) => movie.coordinates);
    },
    // Work in progress - add a comment to the Comments property array in a movie
    addComment: (store, action) => {
      const { movieId, comment } = action.payload;

      const updatedSavedMovies = store.savedmovies.map((movie) => {
        if (movie._id === movieId) {
          const newComments = [...movie.Comments, comment];
          return { ...movie, Comments: newComments };
        }
        return movie;
      });

      let updatedActiveMovie = store.activeMovie;

      if (store.activeMovie && store.activeMovie._id === movieId) {
        updatedActiveMovie = {
          ...store.activeMovie,
          Comments: [...store.activeMovie.Comments, comment]
        };
      }
    
      return {
        ...store,
        savedmovies: updatedSavedMovies,
        activeMovie: updatedActiveMovie
      };
    },    
    setComments: (store, action) => {
      const { movieId, comments } = action.payload;
    
      const updatedSavedMovies = store.savedmovies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, Comments: comments };
        }
        return movie;
      });

      let updatedActiveMovie = store.activeMovie;

      if (store.activeMovie && store.activeMovie._id === movieId) {
        updatedActiveMovie = { ...store.activeMovie, Comments: comments };
      }

      return {
        ...store,
        savedmovies: updatedSavedMovies,
        activeMovie: updatedActiveMovie,
      };
    }
  }
});



// Thunk for fetching PUBLIC movies
export const fetchPublicMovies = (movieStartCoordinates) => async (dispatch) => {
  dispatch(location.actions.setLoading(true))
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //Fetching public movies
    const response = await fetch(`${process.env.REACT_APP_MOVIE_START_URL}`, options);
    const data = await response.json();
    //Dispatching data from fetch into startmovies array
    dispatch(location.actions.setStartMovies(data.body.movieList));
    for (const movie of data.body.movieList) {
      if (movie) {
        const [latitude, longitude] = movie?.coordinates;
        dispatch(location.actions.setStartMovieCoordinates([latitude, longitude]));
      } else {
        console.log('no movie location');
      }
    }
    setTimeout(() => dispatch(location.actions.setLoading(false)), 2000)
  } catch (error) {
    console.log(error);
  }
};

// Thunk for fetching PRIVATE movies
export const fetchPrivateMovies = (accessToken) => async (dispatch) => {
  dispatch(location.actions.setLoading(true))
  //Emptying public movies array in order for it to be replaces by private movies array
  dispatch(location.actions.setStartMovies([]))
  dispatch(location.actions.setStartMovieCoordinates([]));
  try {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      }
    };
    // fetching new private movies with accessToken
    const response = await fetch(`${process.env.REACT_APP_MOVIE_URL}`, options);
    const data = await response.json();
    dispatch(location.actions.setMovies(data.body.movieList));
       for (const movie of data.body.movieList) {
      if (movie) {
        const [latitude, longitude] = movie?.coordinates;
        dispatch(location.actions.setMovieCoordinates([latitude, longitude]));
      } else {
        console.log('no movie location');
      }
    }
    setTimeout(() => dispatch(location.actions.setLoading(false)), 700)
  } catch (error) {
    console.log(error);
  }
};

// Thunk for fetching saved movies in saved movies array in store
//All movies which has the user's id in the LikedBy property
export const getSavedMoviesFetch = (accessToken) => {
  return (dispatch) => {

    fetch('https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/savedmovies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(location.actions.setAllSavedMovies(data.body.savedMovies));
        });
      })
  };
};

// Thunk for saving a movie
//Updating a movie by adding the user's id into the LikedBy property
export const savedMovieFetch = (userId, accessToken, activeMovie) => {
  return (dispatch) => {
    const updatedMovie = { ...activeMovie, LikedBy: [...activeMovie.LikedBy, userId] };

    const requestPayload = {
      activeMovie: updatedMovie
    };

    fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${activeMovie._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(requestPayload)
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(location.actions.saveMovie({ movieId: activeMovie._id, userId }));
        dispatch(getSavedMoviesFetch(accessToken));
      })
      .catch((error) => {
        // Handle error if any
        console.error('Error updating movie:', error);
      });
  };
};

// Thunk for deleting a saved movie
//Deleting a user's id from the LikedBy property in a movie
export const deleteSavedMovieFetch = (userId, accessToken, _id) => {
  return (dispatch) => {
    fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(location.actions.removeSavedMovie({userIdRemove: userId, _id}));
          
          dispatch(getSavedMoviesFetch(accessToken));
        });
      })
      .catch((error) => {
        // Handle error if any
        console.error('Error deleting saved movie:', error);
      });
  };
};


export default location;
