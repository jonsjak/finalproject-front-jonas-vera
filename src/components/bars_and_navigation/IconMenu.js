import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { AddLocation, LocationOff } from '@mui/icons-material';
import menus from 'reducers/menus';
import { useDispatch, useSelector } from 'react-redux';

export const IconMenuBar = styled.menu`
  position: absolute;
  left: -19px;
  bottom: -8px;
  z-index: 997;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 15px;
  justify-content: flex-end;
  padding: 0px;
  height: 110vh;
`

export const MenuBackground = styled.div`
  position: absolute;
  left: -81px;
  bottom: -19px;
  z-index: 996;
  padding: 0px;
  width: 100px;
  background: linear-gradient(to right, #68a0d6 0%,#008ca5 100%); 
  height: 110vh;
  transform: rotate(-7deg);
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
    <>
      <MenuBackground />
      <IconMenuBar>
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
    </>
  )
}