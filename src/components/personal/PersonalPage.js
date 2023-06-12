
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, Typography, CardMedia, CardContent, IconButton } from '@mui/material';
import { Grade, AddComment } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { SlidingCard } from 'components/styles/Cards';
import Clapper from '../../images/clapboard-g163cd4bec_640.png';
import menus from '../../reducers/menus'
import { SavedMovieList } from './SavedMovieList';

const FavoriteMoviesTab = () => {
  return (
    <div style={{ height: '250px', overflow: 'scroll' }}>
      <SavedMovieList />
    </div>
  );
};

const AddCommentsTab = () => {
  return (
    <div>
      <Typography variant="h5" component="div">
        Add Comments
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Theese are your comments
      </Typography>
    </div>
  );
};

// testing renaming

export const PersonalPage = () => {
  const [value, setValue] = useState(0);
  const personalSelected = useSelector((store) => store.menus.personal);
  const userName = useSelector((store) => store.user.userName);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/user/login')
      dispatch(menus.actions.toggleLoginPage(true));
    }
  }, [accessToken, dispatch, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <FavoriteMoviesTab />;
      case 1:
        return <AddCommentsTab />;
      default:
        return null;
    }
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.togglePersonalPage(false));
    navigate('/')
  };

  return (
    <SlidingCard personal personalSelected={personalSelected}>
      <IconButton
        sx={{ alignSelf: 'flex-end' }}
        aria-label="clear"
        onClick={() => handleOnClearClick()}>
        <ClearIcon sx={{ fontSize: '16px' }} />
      </IconButton>
      <CardMedia component="img" sx={{ width: '65%', height: '176px', alignSelf: 'center' }} image={Clapper} alt="Clapboard" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {userName}´s personal space
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
          <Tab icon={<Grade />} label="SAVED MOVIES" />
          <Tab icon={<AddComment />} label="ADD COMMENTS" />
        </Tabs>
        {renderTabContent()}
      </CardContent>
    </SlidingCard>
  );
};