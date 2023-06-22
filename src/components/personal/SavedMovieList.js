/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { MovieDetailCard, NoMoviesCard } from 'components/styles/Cards';
import { getSavedMoviesFetch, deleteSavedMovieFetch } from 'reducers/location';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, CardMedia, Typography, AccordionDetails, CardContent, Accordion, AccordionSummary } from '@mui/material';
import EditOffIcon from '@mui/icons-material/EditOff';
import { Player } from '@lottiefiles/react-lottie-player';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { AddComment } from './AddComment';
import { GetComments } from './GetComments';

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" {...props} />
))(() => ({
  alignItems: 'flex-end',
  padding: '9px',
  position: 'relative',
  '& .MuiAccordionSummary-content': {
    margin: '0px 0px'
  }
}));

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

  return (
    <div>
      {savedMoviesCollection.length ? savedMoviesCollection.map((savedMovie, index) => (
        <Accordion
          key={savedMovie.imdbID}
          sx={{
            marginBottom: '10px',
            boxShadow: 3
          }}
          disableGutters>
          <StyledAccordionSummary>
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
          </StyledAccordionSummary>
          <AccordionDetails sx={{ padding: '9px' }}>
            <CardContent>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <GetComments selectedMovie={savedMovie} showUserComments="true" />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0px'
                }}>
                <IconButton
                  aria-label="clear"
                  sx={{ alignSelf: 'flex-end' }}
                  // eslint-disable-next-line no-underscore-dangle
                  onClick={() => handleClearMovie(savedMovie._id)}>
                  <ClearIcon size="medium" />
                </IconButton>
                <IconButton
                  aria-label="clear"
                  sx={{ alignSelf: 'flex-end' }}
                  // eslint-disable-next-line no-underscore-dangle
                  onClick={() => handleShowForm(index)}>
                  {showCommentInput[index]
                    ? (
                      <EditOffIcon size="medium" />
                    ) : (
                      <DriveFileRenameOutlineIcon size="medium" />)}
                </IconButton>
              </CardContent>
              {showCommentInput[index]
                && (
                  <AddComment selectedMovie={savedMovie} />
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
