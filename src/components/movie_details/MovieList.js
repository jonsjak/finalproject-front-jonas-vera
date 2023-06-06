/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import location from 'reducers/location';

export const MovieList = () => {
  const movieItems = useSelector((store) => store.location.movies);
  const movieUrl = process.env.REACT_APP_MOVIE_URL;
  const dispatch = useDispatch();

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
        if (data.success) {
          console.log('data:', data)
          dispatch(location.actions.setMovies(data.body.movieList));
        } else {
          dispatch(location.actions.setMovies('failed to fetch movies'));
           // Set fetch error in backend
        }
      })
      .catch((error) => console.log(error))
  }, []);

  return (
    <div></div>
    {movieItems.lenght && movieItems.map(movieItem) => {

    }}

  )
}; */

