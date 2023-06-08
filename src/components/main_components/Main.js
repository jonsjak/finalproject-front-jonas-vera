import React from 'react';
import { Header } from 'components/bars_and_navigation/Header';
import { NavBar } from 'components/bars_and_navigation/NavBar';
import { MovieDetails } from '../movie_details/MovieDetails';
import { MovieMap } from '../map_components/MovieMap';

export const Main = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <NavBar />
      <MovieDetails />
      <MovieMap />
    </div>
  )
};