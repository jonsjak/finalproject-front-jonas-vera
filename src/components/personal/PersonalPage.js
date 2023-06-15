
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, Typography, CardMedia, CardContent, IconButton, ThemeProvider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SlidingCard } from 'components/styles/Cards';
import { createTheme } from '@mui/material/styles';
import styled from 'styled-components';
import Clapper from '../../images/clapboard-g163cd4bec_640.png';
import menus from '../../reducers/menus'
import { SavedMovieList } from './SavedMovieList';

export const PersonalWrapper = styled.div`
  height: 460px; 
  overflow: scroll; 
  padding-top: 30px; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
`

// Saved Movies Tab
const SavedMoviesTab = () => {
  return (
    <div style={{ height: '460px', overflow: 'scroll' }}>
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
        sx={{ width: '80%', margin: '20px' }}
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
        return <SavedMoviesTab />;
      case 1:
        return <PersonalInfoTab />;
      default:
        return null;
    }
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.togglePersonalPage(false));
    navigate('/')
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#008ca5',
        dark: '#002884',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000'
      }
    }
  });

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
        <CardContent sx={{ paddingTop: '0px' }}>
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
            <Tab label="SAVED MOVIES" />
            <Tab label="PERSONAL INFO" />
          </Tabs>
          {renderTabContent()}
        </CardContent>
      </ThemeProvider>
    </SlidingCard>
  );
};