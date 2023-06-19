import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from 'reducers/user';
import location from 'reducers/location';
import menus from 'reducers/menus';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from 'components/personal/Login';
import { Register } from 'components/personal/Register';
import { PersonalPage } from 'components/personal/PersonalPage';
import { NotFound } from 'components/bars_and_navigation/NotFound';
import About from 'components/bars_and_navigation/About';
import { LoginPopUp } from 'components/map_components/LoginPopUp';
import { Main } from 'components/map_components/Main';

const reducer = combineReducers({
  user: user.reducer,
  location: location.reducer,
  menus: menus.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main style={{ position: 'relative' }}>
          <Routes>
            <Route path="/" element={<LoginPopUp />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Main />
        </main>
      </BrowserRouter>
    </Provider>
  );
};