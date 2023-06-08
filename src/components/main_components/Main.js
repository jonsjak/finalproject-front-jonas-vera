import React from 'react';
import { Header } from 'components/bars_and_navigation/Header';
import { NavBarMain } from 'components/bars_and_navigation/NavBarMain';
import { IconMenu } from 'components/bars_and_navigation/IconMenu';
import { MovieDetails } from '../movie_details/MovieDetails';
import { MovieMap } from '../map_components/MovieMap';

export const Main = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <NavBarMain />
      <IconMenu />
      <MovieDetails />
      <MovieMap />
    </div>
  )
};