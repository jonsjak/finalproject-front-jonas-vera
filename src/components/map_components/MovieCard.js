import * as React from 'react';
import { theme } from 'components/styles/muiTheme';
import { CardContent, Typography, CardMedia, Button, CardActions, Card, ThemeProvider, Link, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { MovieTitleHeader } from 'components/styles/Text';

export const MovieCard = ({ movie, handleOnReadClick, handleOnClearClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 301 }}>
        <IconButton
          sx={{ position: 'absolute', top: '2px', right: '2px' }}
          aria-label="clear"
          onClick={() => handleOnClearClick(movie)}>
          <ClearIcon sx={{ fontSize: '16px', color: 'white' }} />
        </IconButton>
        <CardMedia
          component="img"
          alt="location-img"
          height="160"
          sx={{ objectFit: 'cover' }}
          image={movie.movie_location_still
            ? movie.movie_location_still : movie.Poster} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{ fontSize: '2.2rem' }}>
            {movie.location}
          </Typography>
          <Link
            href={`https://www.imdb.com/title/${movie.imdbID}/?ref_=nv_sr_srsg_0`}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ margin: '0.3em' }}>
              Film scene from&nbsp;
              <MovieTitleHeader>
                {movie.title}
              </MovieTitleHeader>
            </Typography>
          </Link>
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
