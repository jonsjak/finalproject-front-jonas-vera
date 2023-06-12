import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import location from 'reducers/location';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, CardMedia, Typography } from '@mui/material';

export const SavedMovieList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const savedMoviesCollection = useSelector((store) => store.location.savedmovies);
  const userId = useSelector((store) => store.user.userId);

  /*   useEffect(() => {
    if (!accessToken) {
      console.log('please login')
    }
  }, [accessToken]) */

  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line quote-props
            'Authorization': accessToken
          }
        };
        console.log('accessToken', accessToken)
        const response = await fetch('https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/savedmovies', options);
        const data = await response.json();
        console.log(response)
        dispatch(location.actions.setAllSavedMovies(data.body.savedMovies))
        console.log('data', data.body.savedMovies)
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedMovies()
  }, [accessToken, dispatch, savedMoviesCollection.length]);

  const handleOnClearClick = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': accessToken
        }
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${id}`, options);
      console.log(response);
      const data = await response.json();

      if (data.success) {
        dispatch(location.actions.clearSavedMovie(userId));
        dispatch(location.actions.deleteSavedMovieFromList(id));
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div>
      {savedMoviesCollection ? savedMoviesCollection.map((savedMovie) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'grey', marginTop: '15px' }}>
          <CardMedia
            component="img"
            height="80px"
            sx={{ objectFit: 'cover', width: '120px' }}
            image={savedMovie.movie_location_still}
            alt={`Image from ${savedMovie.title}`} />
          <Typography variant="body2" color="text.primary" paragraph>
            {savedMovie.title}
          </Typography>
          <IconButton
            aria-label="clear"
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => handleOnClearClick(savedMovie._id)}>
            <ClearIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </div>
      )) : (
        <p>Sorry no saved movies found</p>
      )}
    </div>
  );
}