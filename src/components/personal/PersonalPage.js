
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Card, CardActionArea, Tab, Tabs, Typography, CardMedia, CardContent } from '@mui/material';
import { Grade, AddComment, AddAPhoto } from '@mui/icons-material';
import Clapper from '../../images/clapboard-g163cd4bec_640.png';

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

  return (
    <Card sx={{ maxWidth: 500, zIndex: 999, position: 'absolute', top: '100px', right: 0 }}>
      <CardActionArea>
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
      </CardActionArea>
    </Card>
  );
};