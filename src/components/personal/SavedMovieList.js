import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSavedMoviesFetch, deleteSavedMovieFetch } from 'reducers/location';
/* import location from 'reducers/location'; */
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, CardMedia, Typography } from '@mui/material';

export const SavedMovieList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const savedMoviesCollection = useSelector((store) => store.location.savedmovies);
  const userId = useSelector((store) => store.user.userId);

  useEffect(() => {
    dispatch(getSavedMoviesFetch(accessToken));
  }, [accessToken, dispatch, savedMoviesCollection.length]);

  const handleClearMovie = (_id) => {
    dispatch(deleteSavedMovieFetch(userId, accessToken, _id, 'movie'));
  };

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
            onClick={() => handleClearMovie(savedMovie._id)}>
            <ClearIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </div>
      )) : (
        <p>Sorry no saved movies found</p>
      )}
    </div>
  );
}