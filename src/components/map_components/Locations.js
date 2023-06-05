/* import React, { useState } from 'react';

const movieApi = process.env.REACT_APP_MOVIE_URL;

export const Locations = () => {
  const [currentLocation, setCurrentLocation] = useState([]);

  fetch(movieApi)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setCurrentLocation(json.body.movieList);
    })
    .catch((error) => {
      console.log(error)
    });

  return (
    <div>
      {currentLocation.map((movie) => (
        <p>{movie.Title}</p>
      ))}
    </div>
  );
};
 */