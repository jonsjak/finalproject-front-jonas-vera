/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';

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
  const [expanded, setExpanded] = React.useState(false);
  const selectedMovie = useSelector((store) => store.location.activeMovie);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {selectedMovie && (
        <Card sx={{ maxWidth: 345, position: 'absolute', right: '30px', top: '3e0px', zIndex: '999' }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={selectedMovie.title}
            subheader={`(${selectedMovie.Year}), ${selectedMovie.Country}`} />
          <CardMedia
            component="img"
            height="184.645px"
            width="100%"
            sx={{ objectFit: 'cover' }}
            image={selectedMovie.location_image}
            alt={`Image from ${selectedMovie.title}`} />
          <CardMedia
            component="img"
            height="184.645px"
            width="0%"
            sx={{ objectFit: 'cover' }}
            image={selectedMovie.movie_location_still}
            alt={`Image from ${selectedMovie.title}`} />
          <CardContent>
            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '10px' }}>
              {selectedMovie.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie.scene_description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
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
              <Typography paragraph>{selectedMovie.Plot}</Typography>
              <Typography paragraph>Heat 1/2 cup</Typography>
              <Typography paragraph>bring to a boil.</Typography>
              <Typography paragraph>Add rice</Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </div>
  );
};