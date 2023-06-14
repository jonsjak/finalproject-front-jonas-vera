import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled from 'styled-components';
import { AddLocation, LocationOff } from '@mui/icons-material';
import menus from 'reducers/menus';
import { useDispatch, useSelector } from 'react-redux';

export const IconMenuBar = styled.menu`
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 997;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 15px;
  padding: 0px;
`

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
    <IconMenuBar>
      <IconButton>
        <NavLink to="/filter">
          <FilterAltIcon sx={{ fontSize: '50px', color: '#2D3142' }} />
        </NavLink>
      </IconButton>
      {accessToken && (
        <IconButton onClick={locationToggler}>
          {!isLocationAdderActive ? (
            <LocationOff sx={{ fontSize: '50px', color: '#2D3142' }} />
          ) : (
            <AddLocation sx={{ fontSize: '50px', color: '#2D3142' }} />
          )}
        </IconButton>
      )}
      <IconButton>
        <NavLink to="/personal">
          <Person2Icon sx={{ fontSize: '50px', color: '#2D3142' }} />
        </NavLink>
      </IconButton>
    </IconMenuBar>
  )
}