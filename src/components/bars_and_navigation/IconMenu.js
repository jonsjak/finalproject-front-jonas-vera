import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled from 'styled-components';
import menus from '../../reducers/menus'

export const IconMenuBar = styled.menu`
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 997;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 15px;
  padding: 0px;
`

export const IconMenu = () => {
  const dispatch = useDispatch();

  const onToggleFilter = () => {
    dispatch(menus.actions.toggleFilter(true));
    dispatch(menus.actions.togglePersonalPage(false));
  }

  const onTogglePersonalPage = () => {
    dispatch(menus.actions.toggleFilter(false));
    dispatch(menus.actions.togglePersonalPage(true));
  }

  return (
    <IconMenuBar>
      <IconButton onClick={onToggleFilter}>
        <NavLink to="/filter">
          <FilterAltIcon sx={{ fontSize: '50px', color: '#2D3142' }} />
        </NavLink>
      </IconButton>
      <IconButton onClick={onTogglePersonalPage}>
        <NavLink to="/personal">
          <Person2Icon sx={{ fontSize: '50px', color: '#2D3142' }} />
        </NavLink>
      </IconButton>
    </IconMenuBar>
  )
}