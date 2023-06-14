import React from 'react';
import { NavLink } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled from 'styled-components';

export const IconMenuBar = styled.menu`
  position: absolute;
  left: 0px;
  bottom: -19px;
  z-index: 997;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px;
  height: 110vh;
`

export const MenuBackground = styled.div`
  position: absolute;
  left: -71px;
  bottom: -19px;
  z-index: 996;
  padding: 0px;
  width: 100px;
  background:  #008ca5;
  height: 110vh;
  transform: rotate(-7deg);
`

export const IconMenu = () => {
  return (
    <>
      <MenuBackground />
      <IconMenuBar>
        <IconButton>
          <NavLink to="/filter">
            <FilterAltIcon sx={{ fontSize: '40px', color: '#2D3142' }} />
          </NavLink>
        </IconButton>
        <IconButton>
          <NavLink to="/personal">
            <Person2Icon sx={{ fontSize: '40px', color: '#2D3142' }} />
          </NavLink>
        </IconButton>
      </IconMenuBar>
    </>
  )
}