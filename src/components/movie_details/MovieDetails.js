/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, Button, CardMedia, CardActions, Card, CardHeader, Collapse, IconButton, ThemeProvider, createTheme } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditOffIcon from '@mui/icons-material/EditOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import ClearIcon from '@mui/icons-material/Clear';
import location from 'reducers/location';
import menus from 'reducers/menus';
import { SaveMovie } from 'components/personal/SaveMovie';
import { AddComment } from 'components/personal/AddComment';
import { GetComments } from 'components/personal/GetComments';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props; // eslint-disable-line prefer-object-spread
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand && expand !== 'comments' ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export const colorTheme = createTheme({
  palette: {
    primary: {
      light: '#ef9974',
      main: '#f08353',
      dark: '#e26d3b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#035f6f',
      dark: '#f08353',
      contrastText: '#000'
    }
  }
});

export const MovieDetails = () => {
  const dispatch = useDispatch();
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const selectedMovie = useSelector((store) => store.location.activeMovie);
  const accessToken = useSelector((store) => store.user.accessToken);

  const handleExpandDetailsClick = () => {
    setExpandedDetails(!expandedDetails);
  };

  const handleExpandCommentsClick = () => {
    setExpandedComments(!expandedComments);
  };

  const handleOnClearClick = () => {
    dispatch(location.actions.setActiveMovie(null));
    dispatch(menus.actions.toggleMoviePopup(false));
    dispatch(menus.actions.toggleHeaderMenu(true));
  };

  const handleShowForm = () => {
    setShowCommentInput(!showCommentInput);
  };

  const styles = {
    cardStyle: {
      maxWidth: 345,
      position: 'absolute',
      right: '20px',
      top: '30px',
      zIndex: '999',
      maxHeight: '85vh',
      overflowY: 'scroll',
      '@media (max-width: 780px)': {
        right: '0px'
      }
    },
    expandStyle: {
      borderRadius: '6px',
      '&:hover': {
        background: '#f0835312'
      },
      '&:active': {
        backgroundColor: 'transparent'
      },
      '.MuiTouchRipple-child': {
        backgroundColor: '#f0835359'
      }
    }
  }

  return (
    <ThemeProvider theme={colorTheme}>
      {selectedMovie && (
        <Card
          sx={styles.cardStyle}>
          <CardHeader
            action={
              <IconButton
                aria-label="clear"
                onClick={() => handleOnClearClick()}>
                <ClearIcon />
              </IconButton>
            }
            title={selectedMovie.title}
            subheader={`(${selectedMovie.Year}), ${selectedMovie.Country}`}
            sx={{ paddingBottom: '0px' }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              padding: '16px',
              paddingTop: '0px',
              fontStyle: 'italic',
              fontSize: '1rem'
            }}>
            {selectedMovie.Genre}
          </Typography>
          {selectedMovie.location_image || selectedMovie.movie_location_still
            ? (
              <Carousel
                animation="fade">
                <CardMedia
                  component="img"
                  height="184.645px"
                  width="100%"
                  sx={{ objectFit: 'cover' }}
                  image={
                    selectedMovie.location_image
                      ? selectedMovie.location_image : selectedMovie.Poster
                  }
                  alt={`Image from ${selectedMovie.title}`} />
                <CardMedia
                  component="img"
                  height="184.645px"
                  width="100%"
                  sx={{ objectFit: 'cover' }}
                  image={
                    selectedMovie.movie_location_still
                      ? selectedMovie.movie_location_still : selectedMovie.Poster
                  }
                  alt={`Image from ${selectedMovie.title}`} />
              </Carousel>
            ) : (
              <CardMedia
                component="img"
                height="184.645px"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={selectedMovie.Poster}
                alt={`Poster for ${selectedMovie.title}`} />
            )}
          <CardContent>
            <Typography
              variant="body1"
              color="text.primary"
              paragraph>
              {selectedMovie.location}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary">
              {selectedMovie.scene_description
                ? selectedMovie.scene_description : selectedMovie.Plot}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <SaveMovie />
            <ExpandMore
              expand={expandedComments ? 'comments' : ''}
              onClick={handleExpandCommentsClick}
              aria-expanded={expandedComments}
              sx={styles.expandStyle}
              aria-label="show more">
              {expandedComments
                ? (
                  <Typography
                    variant="overline"
                    display="block"
                    sx={{
                      fontSize: '0.85rem',
                      color: '#f08353',
                      margin: 0
                    }}
                    gutterBottom>
                    Hide reviews
                  </Typography>
                ) : (
                  <Typography
                    variant="overline"
                    display="block"
                    sx={{
                      fontSize: '0.85rem',
                      color: '#f08353',
                      margin: 0
                    }}
                    gutterBottom>
                    Location reviews
                  </Typography>)}
            </ExpandMore>
            <ExpandMore
              sx={{ marginLeft: '15px' }}
              expand={expandedDetails}
              onClick={handleExpandDetailsClick}
              aria-expanded={expandedDetails}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expandedDetails}
            timeout="auto"
            unmountOnExit>
            <CardContent>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr'
                }}>
                <Typography
                  variant="body2"
                  paragraph
                  color="text.secondary">
                    Director:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph>
                  {selectedMovie.Director}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  color="text.secondary">
                    Actors:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph>
                  {selectedMovie.Actors}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  color="text.secondary">
                    Language:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph>
                  {selectedMovie.Language}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  color="text.secondary">
                    Country:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph>
                  {selectedMovie.Country}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  color="text.secondary">
                    Synopsis:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph>
                  {selectedMovie.Plot}
                </Typography>
              </div>

              <CardMedia
                component="img"
                height="100%"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={selectedMovie.Poster}
                alt={`Poster for ${selectedMovie.title}`} />
            </CardContent>
          </Collapse>
          <Collapse
            in={expandedComments}
            timeout="auto"
            unmountOnExit>
            <CardContent>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <GetComments selectedMovie={selectedMovie} showUserComments="false" />
              {accessToken
                ? (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      aria-label="clear"
                      sx={{ alignSelf: 'flex-end' }}
                      // eslint-disable-next-line no-underscore-dangle
                      onClick={() => handleShowForm()}>
                      {showCommentInput
                        ? (
                          <EditOffIcon size="large" />
                        ) : (
                          <DriveFileRenameOutlineIcon size="large" />)}
                    </IconButton>
                  </div>
                ) : (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/user/login">
                      <Button
                        size="small"
                        to="/user/login">
                          Log in to review
                      </Button>
                    </Link>
                  </div>
                )}
              {showCommentInput
                && (
                  <AddComment selectedMovie={selectedMovie} />)}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </ThemeProvider>
  );
};
