import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import menus from '../../reducers/menus'

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
    <menu style={{ position: 'absolute', left: '0px', bottom: '0px', zIndex: '997', display: 'flex', flexDirection: 'column', gap: '30px', margin: '15px', padding: '0px' }}>
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
    </menu>
  )
}