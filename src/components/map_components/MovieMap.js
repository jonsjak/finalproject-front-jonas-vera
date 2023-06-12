/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import location from 'reducers/location';
import { MovieCard } from '../map_components/MovieCard';
import { Loader } from 'components/bars_and_navigation/Loader';
import { AddMovie } from './AddMovie';

export const MovieMap = () => {
  const dispatch = useDispatch();
  const startingPosition = [10, 0];
  const movieItems = useSelector((store) => store.location.movies);
  const movieCoordinates = useSelector((store) => store.location.coordinates);
  const movieUrl = process.env.REACT_APP_MOVIE_URL;
  const isLoading = useSelector((store) => store.location.isLoading); // Add isLoading state

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch(movieUrl, options);
        const data = await response.json();

        dispatch(location.actions.setMovies(data.body.movieList));

        for (const movie of data.body.movieList) {
          if (movie) {
            const [latitude, longitude] = movie?.coordinates;
            dispatch(location.actions.setMovieCoordinates([latitude, longitude]));
          } else {
            console.log('no movie location');
          }
        }
        setTimeout(() => dispatch(location.actions.setLoading(false)), 2000)
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoordinates()
  }, []);

  const handleOnReadClick = (movie) => {
    console.log(movie)
    dispatch(location.actions.setActiveMovie(movie));
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

 /*  const LocationFinderDummy = () => {
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
        },
    });
    return null;
};
 */

const addMarker = (e) => {
  const {markers} = this.state
  markers.push(e.latlng)
  this.setState({markers})
}

  return (
    <div style={{ position: 'relative'}}>
      <MapContainer center={startingPosition} maxBounds={outerBounds} maxBoundsViscosity={1} zoom={2} scrollWheelZoom={true} minZoom={3} zoomStart={2} onClick={addMarker}>
        <TileLayer
          bounds={outerBounds}
          noWrap={true}
          continuousWorld={true}
          url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />

        {!isLoading && movieItems?.map((movie, index) => (
          <Marker
            key={movie._id}
            // eslint-disable-next-line max-len
            position={movieCoordinates ? movieCoordinates[index] : [-33.893, 151.1988]}>
            <Popup style={{ margin: '0px', width: '300px' }}>
              <MovieCard movie={movie} handleOnReadClick={handleOnReadClick} />
            </Popup>
          </Marker>
        ))}
        <AddMovie />
      </MapContainer>
    </div>
  );
};