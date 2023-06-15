import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { IconMenuBar, MenuBackground } from 'components/styles/Containers';
import { AddLocation, LocationOff, Person2 } from '@mui/icons-material';
import menus from 'reducers/menus';
import { useDispatch, useSelector } from 'react-redux';

export const IconMenu = () => {
  const dispatch = useDispatch();
  const [isLocationAdderActive, setLocationAdderActive] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  // toggle the location adder
  const locationToggler = () => {
    setLocationAdderActive(!isLocationAdderActive);
    dispatch(menus.actions.toggleMapClicker(!isLocationAdderActive));
  };

  return (
    <>
      <MenuBackground />
      <IconMenuBar>
        {accessToken && (
          <IconButton onClick={locationToggler}>
            {!isLocationAdderActive ? (
              <LocationOff
                sx={{
                  fontSize: '50px',
                  color: '#2D3142'
                }} />
            ) : (
              <AddLocation
                sx={{
                  fontSize: '50px',
                  color: '#2D3142'
                }} />
            )}
          </IconButton>
        )}
        <IconButton>
          <NavLink to="/personal">
            <Person2
              sx={{
                fontSize: '50px',
                color: '#2D3142'
              }} />
          </NavLink>
        </IconButton>
      </IconMenuBar>
    </>
  )
}