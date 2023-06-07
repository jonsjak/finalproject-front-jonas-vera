import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const MovieCard = ({ movie, handleOnReadClick, handleLocationClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="location-img"
        height="140"
        image={movie.movie_location_still} />
      <CardContent>
        <Typography gutterBottom variant="h2" component="div" sx={{ fontSize: '2.5rem' }}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleOnReadClick(movie)}
          size="small">
          Read more
        </Button>
        <Button
          onClick={() => handleLocationClick(movie)}
          size="small">
          Save
        </Button>
      </CardActions>
    </Card>
  );
};