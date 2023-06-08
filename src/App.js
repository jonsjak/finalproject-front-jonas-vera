import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from 'reducers/user';
import location from 'reducers/location';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from 'components/personal/Login';
import { Register } from 'components/personal/Register';
/* import { StartPage } from 'components/map_components/StartPage'; */
import { PersonalPage } from 'components/personal/PersonalPage';
import { NotFound } from 'components/bars_and_navigation/NotFound';
/* import { MovieDetails } from 'components/movie_details/MovieDetails'; */
import About from 'components/bars_and_navigation/About';
/* import { MovieMap } from 'components/map_components/MovieMap'; */
import { StartPage } from 'components/map_components/StartPage';
/* import { AlternativeNavBar } from 'components/bars_and_navigation/AlternativeNavBar'; */
/* import { MovieList } from 'components/movie_details/MovieList'; */
import { Main } from 'components/main_components/Main';

const reducer = combineReducers({
  user: user.reducer,
  location: location.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};