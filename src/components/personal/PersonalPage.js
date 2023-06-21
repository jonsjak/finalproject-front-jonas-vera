
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, Typography, CardMedia, CardContent, IconButton, ThemeProvider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SlidingCard } from 'components/styles/Cards';
import { theme } from 'components/styles/muiTheme';
import { PersonalWrapper } from 'components/styles/Containers';
import Clapper from '../../images/clapboard-g163cd4bec_640.png';
import { SavedMovieList } from './SavedMovieList';

// Saved Movies Tab
const SavedMoviesTab = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      <SavedMovieList />
    </div>
  );
};

// Personal Info Tab
const PersonalInfoTab = () => {
  const userName = useSelector((store) => store.user.userName);
  return (
    <PersonalWrapper>
      <Typography
        gutterBottom
        variant="h5"
        component="div">
        {userName}´s personal space
      </Typography>
      <CardMedia
        component="img"
        sx={{
          width: '80%',
          margin: '20px'
        }}
        image={Clapper}
        alt="Clapboard" />
      <Typography
        variant="body2"
        paragraph>
          Username: {userName}
      </Typography>
    </PersonalWrapper>
  );
};

export const PersonalPage = () => {
  const [value, setValue] = useState(0);
  const personalSelected = useSelector((store) => store.menus.personal);
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  // If not logged in personal page can't be accessed
  useEffect(() => {
    if (!accessToken) {
      navigate('/user/login')
    }
  }, [accessToken, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <SavedMoviesTab />;
      case 1:
        return <PersonalInfoTab />;
      default:
        return null;
    }
  };

  const handleOnClearClick = () => {
    navigate('/')
  };

  return (
    <SlidingCard
      personal
      personalSelected={personalSelected}>
      <ThemeProvider theme={theme}>
        <IconButton
          sx={{ alignSelf: 'flex-end' }}
          aria-label="clear"
          onClick={() => handleOnClearClick()}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
        <CardContent sx={{ paddingTop: '0px', height: '460px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs">
            <Tab label="SAVED MOVIES" />
            <Tab label="PERSONAL INFO" />
          </Tabs>
          {renderTabContent()}
        </CardContent>
      </ThemeProvider>
    </SlidingCard>
  );
};