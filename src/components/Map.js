import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useDispatch } from 'react-redux';
import location from 'reducers/location'
import sampleData from '../sampleData.json';
import clapperIcon from '../images/clapboard-g163cd4bec_640.png';

const clapper = new L.Icon({
  iconUrl: clapperIcon,
  iconSize: [25, 25]
});

export const Map = () => {
  const dispatch = useDispatch();
  const startingPosition = [10, 0];

  const handleLocationClick = (movie) => {
    console.log('movie time');
    dispatch(location.actions.setMovie(movie.movie));
    dispatch(location.actions.setCoordinates([movie.lat, movie.lng]));
  };

  return (
    <MapContainer center={startingPosition} zoom={2}>
      <TileLayer
        url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />
      {sampleData.map((movie) => (
        <Marker
          key={movie.id}
          position={[movie.lat, movie.lng]}
          icon={clapper}>
          <Popup>
            {/* Insert MovieData component */}
            <h2>{movie.movie}</h2>
            <p>{movie.plot}</p>
            <button type="button" onClick={() => handleLocationClick(movie)}>Save location to state</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};