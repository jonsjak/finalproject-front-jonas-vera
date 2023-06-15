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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeMovie = useSelector((store) => store.location.activeMovie);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const likedBy = activeMovie?.LikedBy || [];

  // If logged in movie is saved in the store and database
  const handleSaveMovie = async () => {
    if (accessToken) {
      dispatch(savedMovieFetch(userId, accessToken, activeMovie))
    } else {
      navigate('/user/login')
    }
  };

  // If logged in movie is deleted from the store and database
  const handleClearMovie = () => {
    if (accessToken) {
      const { _id } = activeMovie;
      dispatch(deleteSavedMovieFetch(userId, accessToken, _id, 'activeMovie'));
    } else {
      navigate('/user/login')
    }
  };

  const isLiked = likedBy.some((id) => id === userId);

  return (
    <div>
      {!isLiked 
        ? (
        <IconButton
          onClick={handleSaveMovie}
          aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        ) : (
        <IconButton
          onClick={handleClearMovie}
          aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      )}
    </div>
  );
}