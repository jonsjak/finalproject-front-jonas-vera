import React from 'react';
import { MovieDetails } from 'components/movie_details/MovieDetails';
import { MovieMap } from './MovieMap';

export const StartPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <MovieMap />
      <MovieDetails />
    </div>
  )
}