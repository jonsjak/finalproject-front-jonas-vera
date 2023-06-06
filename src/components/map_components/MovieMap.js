/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import location from 'reducers/location';
/* import movieData from '../../data/movies.json'; */

// Custom icon if we want
/* import L from 'leaflet';
import clapperIcon from 'images/clapboard-g163cd4bec_640.png'; */
/* import sampleData from '../../sampleData'; */

/* const clapper = new L.Icon({
  iconUrl: clapperIcon,
  iconSize: [25, 25]
}); */

export const MovieMap = () => {
  const dispatch = useDispatch();
  const startingPosition = [10, 0];
  const movieItems = useSelector((store) => store.location.movies);
  const movieUrl = process.env.REACT_APP_MOVIE_URL;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(movieUrl, options)
      .then((data) => data.json())
      .then((data) => {
        console.log('data:', data.body.movieList);
        dispatch(location.actions.setMovies(data.body.movieList));
        /* dispatch(location.actions.setMovies('failed to fetch movies'));
          */ // Set fetch error in backend
      })
      .catch((error) => console.log(error))
  }, []);

  const handleLocationClick = (movie) => {
    // what happens when user clicks movie?
    dispatch(location.actions.setMovies(movie.movie));
  };

  return (
    <MapContainer center={startingPosition} zoom={2}>
      <TileLayer
        url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />

      {movieItems && movieItems.map((movie) => (
        <Marker
          key={movie._id}
          position={movie.Movie_Location.coordinates}>
          <Popup>
            <h2>{movie.title}</h2>
            <p>{movie.location}</p>
            {/* Add link round button to <MovieDetails */}
            <button
              type="button"
              onClick={
                () => handleLocationClick(movie)
              }>Save location to state
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};