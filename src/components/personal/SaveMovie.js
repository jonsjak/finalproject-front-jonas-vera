import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import location from 'reducers/location';
import { useSelector, useDispatch } from 'react-redux';

export const SaveMovie = () => {
/*   const [toggleSave, setToggleSave] = useState(null) */
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.location.activeMovie);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  /*   const currentMovieList = useSelector((store) => store.location.movies); */

  useEffect(() => {
    if (!accessToken) {
      console.log('please login')
    }
  }, [accessToken])

  const handleSaveMovie = async () => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': accessToken
        },
        body: JSON.stringify({ userId })
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovie._id}`, options);
      console.log(response);
      const data = await response.json();
      console.log('data', data);
      console.log('updated movie', data.body.updatedMovie.LikedBy);
      const updatedLikedBy = [...data.body.updatedMovie.LikedBy, userId];

      if (data.success) {
        dispatch(location.actions.saveActiveMovie(updatedLikedBy));
        dispatch(location.actions.saveMovie(updatedLikedBy));

        console.log(userId);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  /* setToggleSave(true) */
  };

  const handleClearMovie = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': accessToken
        }
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovie._id}`, options);
      console.log(response);
      const data = await response.json();
      console.log('data', data);
      console.log('updated movie', data.body.updatedMovie);

      if (data.success) {
        dispatch(location.actions.clearActiveMovie(userId));
        dispatch(location.actions.clearSavedMovie(userId));
      }
    } catch (error) {
      console.log('Error:', error);
    }
    /*     setToggleSave(false) */
  };

  return (
    <div>
      {/*       {!toggleSave
        ? ( */}
      <IconButton onClick={handleSaveMovie} aria-label="add to favorites">
        <FavoriteBorderIcon />
      </IconButton>
      {/*         ) : (
        )} */}
      <IconButton onClick={handleClearMovie} aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
    </div>
  );
}