/* eslint-disable */
import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { deleteSavedMovieFetch } from 'reducers/location';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savedMovieFetch } from '../../reducers/location'

export const SaveMovie = () => {
/*   const [toggleSave, setToggleSave] = useState(false) */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeMovie = useSelector((store) => store.location.activeMovie);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const likedBy = activeMovie?.LikedBy || [];


  const handleSaveMovie = async () => {
    if (accessToken) {
      dispatch(savedMovieFetch(userId, accessToken, activeMovie))
    } else {
      navigate('/user/login')
    }
  };

  const handleClearMovie = () => {
    if (accessToken) {
      const { _id } = activeMovie;
      dispatch(deleteSavedMovieFetch(userId, accessToken, _id, 'activeMovie'));
    } else {
      navigate('/user/login')
    }
  };

  console.log(likedBy)
  const isLiked = likedBy.some((id) => id === userId);
  console.log(isLiked)

  return (
    <div>
      {!isLiked 
        ? (
        <IconButton onClick={handleSaveMovie} aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        ) : (
        <IconButton onClick={handleClearMovie} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      )}
    </div>
  );
}