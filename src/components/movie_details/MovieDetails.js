/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, CardMedia, CardActions, Card, CardHeader, Collapse, IconButton, FormControl, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import ClearIcon from '@mui/icons-material/Clear';
import location from 'reducers/location';
import menus from 'reducers/menus';
import { SaveMovie } from 'components/personal/SaveMovie';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props; // eslint-disable-line prefer-object-spread
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export const MovieDetails = () => {
  const dispatch = useDispatch();
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);
  const [message, setMessage] = useState('');
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
  };

  const handleSubmit = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ message })
    };
    try {
      // eslint-disable-next-line no-underscore-dangle
      const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovie._id}/addcomment`, options);
      const data = await response.json(); // fix line above?

      if (data.success) {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(location.actions.addComment({ movieId: selectedMovie._id, message }));
      } else {
        console.log('comment not posted')
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setMessage('')
  };

  const styles = {
    cardStyle: {
      maxWidth: 345,
      position: 'absolute',
      right: '20px',
      top: '30px',
      zIndex: '999',
      maxHeight: '85vh',
      overflow: 'scroll',
      '@media (max-width: 780px)': {
        right: '0px'
      }
    }
  }

  return (
    <div>
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
              expand={expandedComments}
              onClick={handleExpandCommentsClick}
              aria-expanded={expandedComments}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
            <ExpandMore
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
            {selectedMovie.Comments && selectedMovie.Comments.map((comment) => (
              <>
                <p>{comment.message}</p>
                <p>{comment.userName}</p>
              </>
            ))}
            <FormControl
              sx={{ m: 1, minWidth: 200 }}
              size="small">
              <TextField
                id="outlined-multiline-static margin-none"
                label="Write your comment or review here..."
                multiline
                rows={3}
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)} />
              <Button
                type="button"
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  width: '180px',
                  alignSelf: 'center',
                  fontWeight: 700
                }}
                size="large">
                  Post Comment
              </Button>
            </FormControl>
          </Collapse>
        </Card>
      )}
    </div>
  );
};
