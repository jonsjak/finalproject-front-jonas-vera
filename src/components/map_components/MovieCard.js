import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { CardContent, Typography, CardMedia, Button, CardActions, Card, ThemeProvider } from '@mui/material';

export const MovieCard = ({ movie, handleOnReadClick }) => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#008ca5',
        dark: '#037588',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: '#035f6f',
        dark: '#ba000d',
        contrastText: '#000'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};