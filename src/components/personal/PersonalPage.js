
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, Typography, CardMedia, CardContent, IconButton } from '@mui/material';
import { Grade, AddComment, AddAPhoto } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import Clapper from '../../images/clapboard-g163cd4bec_640.png';
import menus from '../../reducers/menus'

const FavoriteMoviesTab = () => {
  return (
    <div>
      <Typography variant="h5" component="div">
        Favorite Movies
      </Typography>
      <Typography variant="body2" color="text.secondary">
        List of all liked movies
      </Typography>
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

const AddPhotoTab = () => {
  return (
    <div>
      <Typography variant="h5" component="div">
        Add a Photo
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Theese are your photos
      </Typography>
    </div>
  );
};

export const PersonalPage = () => {
  const [value, setValue] = useState(0);
  const personalSelected = useSelector((store) => store.menus.personal);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <FavoriteMoviesTab />;
      case 1:
        return <AddCommentsTab />;
      case 2:
        return <AddPhotoTab />;
      default:
        return null;
    }
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.togglePersonalPage(false));
  };

  return (
    <div className={personalSelected ? 'personal-page active' : 'personal-page'}>
      <IconButton
        sx={{ alignSelf: 'flex-start' }}
        aria-label="clear"
        onClick={() => handleOnClearClick()}>
        <ClearIcon />
      </IconButton>
      <CardMedia component="img" height="300" image={Clapper} alt="Clapboard" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Personal Space
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to your personal space! This is where you handle your watchlists, add comments and locations.
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
          <Tab icon={<Grade />} label="FAVORITE MOVIES" />
          <Tab icon={<AddComment />} label="ADD COMMENTS" />
          <Tab icon={<AddAPhoto />} label="ADD A PHOTO" />
        </Tabs>
        {renderTabContent()}
      </CardContent>
    </div>
  );
};