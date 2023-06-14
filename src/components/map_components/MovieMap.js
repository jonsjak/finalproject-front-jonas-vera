/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { fetchPublicMovies } from 'reducers/location';
import { useDispatch, useSelector } from 'react-redux';
import location from 'reducers/location';
import { AddMovie } from './AddMovie';
import { MovieCard } from '../map_components/MovieCard';
import { Loader } from 'components/bars_and_navigation/Loader';

export const MovieMap = () => {
  const dispatch = useDispatch();
  const startingPosition = [10, 0];
  const startMovieItems = useSelector((store) => store.location.startmovies);
  const movieItems = useSelector((store) => store.location.movies);
  console.log('Movie Items:', movieItems);
  const movieCoordinates = useSelector((store) => store.location.coordinates);
  const movieStartCoordinates = useSelector((store) => store.location.startcoordinates);
  const accessToken = useSelector((store) => store.user.accessToken);
/*   const movieUrl = process.env.REACT_APP_MOVIE_URL;
  const movieStartUrl = process.env.REACT_APP_MOVIE_START_URL; */
  const isLoading = useSelector((store) => store.location.isLoading); // Add isLoading state
/*   const accessToken = useSelector((store) => store.user.accessToken); */

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchPrivateMovies(accessToken));
    } else {
      dispatch(fetchPublicMovies(movieStartCoordinates))
    }
  }, []);

  const handleOnReadClick = (movie) => {
    console.log(movie)
    dispatch(location.actions.setActiveMovie(movie));
  };

  const handleNewMovieAdded = () => {
    alert('movie added!')
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

  const outerBounds = [
    [-90, -180],
    [90, 180]
  ]

  return (
    <div style={{ position: 'relative'}}>
      <MapContainer center={startingPosition} maxBounds={outerBounds} maxBoundsViscosity={1} zoom={2} scrollWheelZoom={true} minZoom={3} zoomStart={2}>
        <TileLayer
          bounds={outerBounds}
          noWrap={true}
          continuousWorld={true}
          url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />

        {!isLoading && movieItems.map((movie, index) => (
          <Marker
            key={movie._id}
            // eslint-disable-next-line max-len
            position={movieCoordinates ? movieCoordinates[index] : [-33.893, 151.1988]}>
            <Popup style={{ margin: '0px', width: '300px' }}>
              <MovieCard movie={movie} handleOnReadClick={handleOnReadClick} />
            </Popup>
          </Marker>
        ))}
        {!isLoading && startMovieItems?.map((movie, index) => (
          <Marker
            key={movie._id}
            // eslint-disable-next-line max-len
            position={movieStartCoordinates ? movieStartCoordinates[index] : [-33.893, 151.1988]}>
            <Popup style={{ margin: '0px', width: '300px' }}>
              <MovieCard movie={movie} handleOnReadClick={handleOnReadClick} />
            </Popup>
          </Marker>
        ))}
        <AddMovie onNewMovieAdded={handleNewMovieAdded} />
      </MapContainer>
    </div>
  );
};