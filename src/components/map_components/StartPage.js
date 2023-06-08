import React from 'react';
import { MovieDetails } from 'components/movie_details/MovieDetails';
import { AlternativeNavBar } from 'components/bars_and_navigation/AlternativeNavBar';
import { MovieMap } from './MovieMap';

export const StartPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <MovieMap />
      <MovieDetails />
      <AlternativeNavBar />
      <div className="diagonal-box" />
    </div>
  )
}