import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MovieDetailCard, NoMoviesCard } from 'components/styles/Cards';
import { getSavedMoviesFetch, deleteSavedMovieFetch } from 'reducers/location';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, CardMedia, Typography } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import { SavedMoviesContainer } from 'components/styles/Containers';

export const SavedMovieList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const savedMoviesCollection = useSelector((store) => store.location.savedmovies);
  const userId = useSelector((store) => store.user.userId);

  // If a new movie is saved a new render will happen
  useEffect(() => {
    dispatch(getSavedMoviesFetch(accessToken));
  }, [accessToken, dispatch, savedMoviesCollection.length]);

  // Deleting a saved movie from the database and the redux store
  const handleClearMovie = (_id) => {
    dispatch(deleteSavedMovieFetch(userId, accessToken, _id, 'movie'));
  };

  return (
    <div>
      {savedMoviesCollection.length ? savedMoviesCollection.map((savedMovie) => (
        <SavedMoviesContainer
          // eslint-disable-next-line no-underscore-dangle
          key={savedMovie.imdbID}>
          <CardMedia
            component="img"
            height="120px"
            sx={{
              objectFit: 'cover',
              width: '90px'
            }}
            image={
              savedMovie.movie_location_still
                ? savedMovie.movie_location_still : savedMovie.Poster
            }
            alt={`Image from ${savedMovie.title}`} />
          <MovieDetailCard>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontStyle: 'italic',
                fontSize: '1rem'
              }}>
              {savedMovie.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.9rem' }}>
            ({savedMovie.Year}), {savedMovie.Country}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.9rem' }}>
              {savedMovie.Genre}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontSize: '0.9rem' }}>
              My comments:
            </Typography>
          </MovieDetailCard>
          <IconButton
            aria-label="clear"
            sx={{ alignSelf: 'flex-start' }}
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => handleClearMovie(savedMovie._id)}>
            <ClearIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </SavedMoviesContainer>
      )) : (
        <NoMoviesCard>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontStyle: 'italic',
              fontSize: '1.8rem',
              color: '#008ca5'
            }}>
            No saved movies yet
          </Typography>
          <Player
            src="https://assets4.lottiefiles.com/private_files/lf30_yxwmprgm.json"
            className="player"
            style={{ opacity: '0.8' }}
            loop
            autoplay />
        </NoMoviesCard>
      )}
    </div>
  );
}