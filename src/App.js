import React from 'react';
import { Map } from 'components/Map';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { user } from 'reducers/user';
import { map } from 'reducers/map';

const reducer = combineReducers({
  user: user.reducer,
  map: map.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  )
};