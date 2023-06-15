/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, CardMedia, CardActions, Card, CardHeader, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import ClearIcon from '@mui/icons-material/Clear';
import location from 'reducers/location';
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
  const [expanded, setExpanded] = React.useState(false);
  const selectedMovie = useSelector((store) => store.location.activeMovie);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOnClearClick = () => {
    dispatch(location.actions.setActiveMovie(null));
  };

  return (
    <div>
      {selectedMovie && (
        <Card sx={{ maxWidth: 345, position: 'absolute', right: '20px', top: '30px', zIndex: '999', width: '345px', maxHeight: '85vh', overflow: 'scroll' }}>
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
          <Typography variant="body2" color="text.secondary" sx={{ padding: '16px', paddingTop: '0px', fontStyle: 'italic', fontSize: '1rem' }}>
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
            <Typography variant="body1" color="text.primary" paragraph>
              {selectedMovie.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie.scene_description
                ? selectedMovie.scene_description : selectedMovie.Plot}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <SaveMovie />
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                <Typography variant="body2" paragraph color="text.secondary">Director:</Typography>
                <Typography variant="body2" paragraph>{selectedMovie.Director}</Typography>
                <Typography variant="body2" paragraph color="text.secondary">Actors:</Typography>
                <Typography variant="body2" paragraph>{selectedMovie.Actors}</Typography>
                <Typography variant="body2" paragraph color="text.secondary">Language:</Typography>
                <Typography variant="body2" paragraph>{selectedMovie.Language}</Typography>
                <Typography variant="body2" paragraph color="text.secondary">Country:</Typography>
                <Typography variant="body2" paragraph>{selectedMovie.Country}</Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  Synopsis:
                </Typography>
                <Typography variant="body2" paragraph>
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
        </Card>
      )}
    </div>
  );
};
