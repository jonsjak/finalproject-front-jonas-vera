import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const MovieCard = ({ movie, handleOnReadClick }) => {
  return (
    <Card sx={{ width: 301 }}>
      <CardMedia
        component="img"
        alt="location-img"
        height="160"
        sx={{ objectFit: 'cover' }}
        image={movie.movie_location_still ? movie.movie_location_still : movie.Poster} />
      <CardContent>
        <Typography gutterBottom variant="h2" component="div" sx={{ fontSize: '2.2rem' }}>
          {movie.location}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ margin: '0.3em' }}>
          Film scene from <span style={{ color: 'black', fontStyle: 'italic' }}>{movie.title}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleOnReadClick(movie)}
          size="small">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};