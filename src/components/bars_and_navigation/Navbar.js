import React, { useState } from 'react';
/* import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; */
/* import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../images/globe-logo.png' */

export const NavBar = () => {
  const [toggleSideBar, setToggleSidebar] = useState(false)

  const onToggleMenu = () => {
    setToggleSidebar(!toggleSideBar)
  }

  return (
    <aside style={{ position: 'fixed', right: '0px', top: '0px', zIndex: '999'/* , display: 'flex', flexDirection: 'column' */ }}>
      <nav>
        {/* <IconButton
          aria-label="clear"
          sx={{ position: 'relative' }}>
          <img
            src={logo}
            alt="logo"
            className="logo"
            style={{
              width: '70px',
              objectFit: 'cover'
            }} />
        </IconButton>
        <IconButton
          aria-label="clear"
          sx={{ position: 'relative' }}>
          <LoginIcon sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            fontSize: '30px'
          }} />
          <section className="stage">
            <figure className="ball"><span className="shadow" /></figure>
          </section>
        </IconButton>
        <IconButton
          aria-label="clear"
          sx={{ position: 'relative' }}>
          <PersonAddAlt1Icon sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            fontSize: '30px'
          }} />
          <section className="stage">
            <figure className="ball"><span className="shadow" /></figure>
          </section>
        </IconButton>
        <IconButton
          aria-label="clear"
          sx={{ position: 'relative' }}>
          <InfoIcon sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            fontSize: '30px'
          }} />
          <section className="stage">
            <figure className="ball"><span className="shadow" /></figure>
          </section>
        </IconButton> */}
        {/*         <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          sx={{ fontSize: '50px', color: 'white' }}>
          <MenuIcon sx={{ fontSize: '50px', color: 'white' }} />
        </IconButton> */}
        <div className="nav-right visible-xs">
          <button
            onClick={onToggleMenu}
            type="button"
            className="button"
            id="btn">
            <div className="bar top" />
            <div className="bar middle" />
            <div className="bar bottom" />
          </button>
        </div>
        <main className={toggleSideBar ? 'move-to-left' : ''}>
          <nav>
            <div className="nav-right hidden-xs">
              <button
                onClick={onToggleMenu}
                type="button"
                className={toggleSideBar ? 'button active' : 'button'}
                id="btn">
                <div className="bar top" />
                <div className="bar middle" />
                <div className="bar bottom" />
              </button>
            </div>
          </nav>
        </main>
        {toggleSideBar && (
          <div className="sidebar">
            <ul className="sidebar-list">
              <li className={`sidebar-item${toggleSideBar ? 'active' : ''}`}><a href="#" className="sidebar-anchor">Log in</a></li>
              <li className={`sidebar-item${toggleSideBar ? 'active' : ''}`}><a href="#" className="sidebar-anchor">Register</a></li>
              <li className={`sidebar-item${toggleSideBar ? 'active' : ''}`}><a href="#" className="sidebar-anchor">About</a></li>
              <li className={`sidebar-item${toggleSideBar ? 'active' : ''}`}><a href="#" className="sidebar-anchor">Filter</a></li>
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}