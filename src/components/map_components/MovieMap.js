/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
/* import { MovieDetails } from 'components/movie_details/MovieDetails'; */
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import location from 'reducers/location';

export const MovieMap = () => {
  const dispatch = useDispatch();
  const startingPosition = [10, 0];
  const movieItems = useSelector((store) => store.location.movies);
  const movieCoordinates = useSelector((store) => store.location.coordinates);
  const movieUrl = process.env.REACT_APP_MOVIE_URL;
  const isLoading = useSelector((store) => store.location.isLoading); // Add isLoading state
  const [detailPage, setDetailPage] = useState(false)

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

        dispatch(location.actions.setLoading(false))
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoordinates()
  }, []);

  const handleLocationClick = (movie) => {
    // what happens when user clicks movie?
    dispatch(location.actions.setMovies(movie.movie));
  };

  const handleToggleDetails = () => {
    setDetailPage(!detailPage);
  };

  const handleOnReadClick = (_id) => {
    dispatch(location.actions.setShowMovieDetails(_id));
    handleToggleDetails()
  };

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
    // Show loading spinner while fetching
  }

  return (
    <div style={{ position: 'relative'}}>
      <MapContainer center={startingPosition} zoom={2} style={{ position: 'relative' }}>
        <TileLayer
          url="http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.nationalgeographic.org/">National Geographic Society</a> | Data &copy; <a href="https://www.arcgis.com/home/item.html?id=2b93b06dc0dc4e809d3c8db5cb96ba69">Esri</a>' />

        {!isLoading && movieItems?.map((movie, index) => (
          <Marker
            key={movie._id}
            // eslint-disable-next-line max-len
            position={movieCoordinates ? movieCoordinates[index] : [-33.893, 151.1988]}>
            <Popup>
            {!detailPage && (
              <>
                <h2>{movie.title}</h2>
                <p style={{margin: '5px'}}>{movie.location}</p>
                <img src={movie.movie_location_still} alt="location-img" style={{width: '100%'}}/>
                <button
                  type="button"
                  onClick={
                    () => handleOnReadClick(movie._id)
                  }> Read more
                  </button>
                  <button
                    type="button"
                    onClick={
                      () => handleLocationClick(movie)
                    }>Save location to state
                  </button>
                </>
              )}
              {detailPage && (
                <img src={movie.location_image} alt="location-img" style={{ width: '100%' }} />
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};