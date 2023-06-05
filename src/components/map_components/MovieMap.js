import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import location from 'reducers/location';
import movieData from '../../data/movies.json';

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

  const handleLocationClick = (movie) => {
    dispatch(location.actions.setMovie(movie.movie));
    dispatch(location.actions.setCoordinates(
      [movie.lat, movie.lng]
    ));
  };

  return (
    <MapContainer center={startingPosition} zoom={2}>
      <TileLayer
        url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />

      {movieData.map((movie) => (
        <Marker
          key={movie.id}
          position={movie.coordinates}>
          <Popup>
            <h2>{movie.title}</h2>
            <p>{movie.location}</p>
            {/* Add link round button */}
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