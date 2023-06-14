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
    isLoading: true,
    activeMovie: null,
    savedmovies: []
  },
  reducers: {
    setStartMovies: (store, action) => {
      store.startmovies = action.payload
    },
    setMovies: (store, action) => {
      return {
        ...store,
        movies: action.payload,
      };
    },
    setStartMovieCoordinates: (store, action) => {
      store.startcoordinates.push(action.payload);
    },
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
    setActiveMovie: (store, action) => {
      store.activeMovie = action.payload;
    },
    saveMovie: (store, action) => {
      const { movieId, userId } = action.payload;
    
      const updatedMovies = store.movies.map((movie) => {
        if (movie._id === movieId) {
          const newLikedBy = [...movie.LikedBy, userId];
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
    
      const updatedActiveMovie = { ...store.activeMovie, LikedBy: [...store.activeMovie.LikedBy, userId] };
    
      store.movies = updatedMovies;
      store.activeMovie = updatedActiveMovie;
    },
    removeSavedMovie: (store, action) => {
      const userIdRemove = action.payload;
      const updatedMovies = store.movies.map((movie) => {
        if (movie === store.activeMovie) {
          const newLikedBy = movie.LikedBy.filter((id) => id !== userIdRemove);
          return { ...movie, LikedBy: newLikedBy };
        }
        return movie;
      });
    
      if (store.activeMovie) {
        const updatedActiveMovie = { ...store.activeMovie };
        updatedActiveMovie.LikedBy = updatedActiveMovie.LikedBy.filter(
          (id) => id !== userIdRemove
        );
        store.activeMovie = updatedActiveMovie;
      }
    
      store.movies = updatedMovies;
    },       
    setAllSavedMovies: (store, action) => {
      store.savedmovies = action.payload;
    },
    deleteSavedMovieFromList: (store, action) => {
      store.savedmovies.splice(action.payload, 1);
    },
    addMovie: (store, action) => {
      console.log('Payload:', action.payload);
      store.movies = [...store.movies, action.payload];
    },
    updateMovieCoordinates: (store, action) => {
      const { movieId, coordinates } = action.payload;

      // Find the movie in the state and update its coordinates
      const updatedMovies = store.movies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, coordinates };
        }
        return movie;
      });

      // Update the movieCoordinates array
      store.coordinates = updatedMovies.map((movie) => movie.coordinates);
    }
  }
});


// Thunk for fetching private movies
export const fetchPublicMovies = (movieStartCoordinates) => async (dispatch) => {
  dispatch(location.actions.setLoading(true))
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(`${process.env.REACT_APP_MOVIE_START_URL}`, options);
    const data = await response.json();

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

// Thunk for fetching private movies
export const fetchPrivateMovies = (accessToken) => async (dispatch) => {
  dispatch(location.actions.setLoading(true))
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
    console.log(accessToken)
    const response = await fetch(`${process.env.REACT_APP_MOVIE_URL}`, options);
    const data = await response.json();
    console.log(data.body.movieList)
    dispatch(location.actions.setMovies(data.body.movieList));
       for (const movie of data.body.movieList) {
      if (movie) {
        const [latitude, longitude] = movie?.coordinates;
        dispatch(location.actions.setMovieCoordinates([latitude, longitude]));
      } else {
        console.log('no movie location');
      }
    }
    setTimeout(() => dispatch(location.actions.setLoading(false)), 2000)
  } catch (error) {
    console.log(error);
  }
};

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
          console.log('banana', data.body.savedMovies)
        });
      })
  };
};

export const savedMovieFetch = (userId, accessToken, activeMovie) => {
  return (dispatch, getState) => {
    const updatedMovie = { ...activeMovie, LikedBy: [...activeMovie.LikedBy, userId] };

    setTimeout(() => {
      const updatedMovies = getState().location.movies.map((movie) => {
        if (movie._id === activeMovie._id) {
          return { ...movie, LikedBy: [...movie.LikedBy, userId] };
        }
        return movie;
      });

      const requestPayload = {
        activeMovie: updatedMovie,
        movies: updatedMovies
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
          batch(() => {
            dispatch(location.actions.saveMovie({ movieId: activeMovie._id, userId }));
            dispatch(getSavedMoviesFetch(accessToken));
          });
        });
    }, 2000);

  };
};

export const deleteSavedMovieFetch = (userId, accessToken, _id, source) => {
  return (dispatch, getState) => {


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
            dispatch(location.actions.removeSavedMovie({ userIdRemove: userId, _id }));

            if (source === 'activeMovie') {
              const updatedActiveMovie = { ...getState().location.activeMovie };
              updatedActiveMovie.LikedBy = updatedActiveMovie.LikedBy.filter(id => id !== userId);
              dispatch(location.actions.setActiveMovie(updatedActiveMovie));
            }

            dispatch(getSavedMoviesFetch(accessToken));
          });
        });
    };
  };



export default location;