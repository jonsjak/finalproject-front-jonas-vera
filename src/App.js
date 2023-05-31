import React from 'react';
import { Map } from 'components/Map';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from 'reducers/user';
import location from 'reducers/location';
import OmdbFetch from 'components/OmdbFetch';

const reducer = combineReducers({
  user: user.reducer,
  location: location.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <OmdbFetch />
      <Map />
    </Provider>
  )
};