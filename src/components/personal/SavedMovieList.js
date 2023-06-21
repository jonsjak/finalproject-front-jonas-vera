/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MovieDetailCard, NoMoviesCard } from 'components/styles/Cards';
import { getSavedMoviesFetch, deleteSavedMovieFetch } from 'reducers/location';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, CardMedia, Typography, AccordionDetails, CardContent, Accordion, AccordionSummary } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { AddComment } from './AddComment';

export const SavedMovieList = () => {
  const [showCommentInput, setShowCommentInput] = useState({});
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
    dispatch(deleteSavedMovieFetch(userId, accessToken, _id));
  };

  const handleShowForm = (index) => {
    setShowCommentInput((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const styles = {
    accordionSummaryStyle: {
      alignItems: 'flex-end',
      padding: '9px',
      position: 'relative',
      margin: '0px 0px',
      '& .Mui-expanded': {
        margin: '0px 0px'
      }
    },
    accordionStyle: {
      marginBottom: '10px',
      boxShadow: 3
    }
  }

  return (
    <div>
      {savedMoviesCollection.length ? savedMoviesCollection.map((savedMovie, index) => (
        <Accordion key={savedMovie.imdbID} sx={styles.accordionStyle}>
          <AccordionSummary
            sx={styles.accordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <IconButton
              aria-label="clear"
              sx={{ position: 'absolute', top: '5px', right: '6px' }}
              // eslint-disable-next-line no-underscore-dangle
              onClick={() => handleClearMovie(savedMovie._id)}>
              <ClearIcon sx={{ fontSize: '16px' }} />
            </IconButton>
            <CardMedia
              component="img"
              height="120px"
              sx={{
                objectFit: 'cover',
                width: '90px'
              }}
              image={savedMovie.movie_location_still
                ? savedMovie.movie_location_still : savedMovie.Poster}
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
            </MovieDetailCard>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '9px' }}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  fontStyle: 'italic',
                  fontSize: '1rem'
                }}>
                Comments...
              </Typography>
              <IconButton
                aria-label="clear"
                sx={{ alignSelf: 'flex-end' }}
                // eslint-disable-next-line no-underscore-dangle
                onClick={() => handleShowForm(index)}>
                <DriveFileRenameOutlineIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </CardContent>
            <CardContent>
              {showCommentInput[index]
                && (
                  // eslint-disable-next-line no-underscore-dangle
                  <AddComment selectedMovie={savedMovie._id} />
                )}
            </CardContent>
          </AccordionDetails>
        </Accordion>
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