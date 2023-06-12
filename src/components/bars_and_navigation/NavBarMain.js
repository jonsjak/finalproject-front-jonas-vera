import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import menus from 'reducers/menus';

export const NavBarMain = () => {
  const [toggleSideBar, setToggleSidebar] = useState(false)
  const dispatch = useDispatch();

  const onLoginClick = () => {
    dispatch(menus.actions.toggleLoginPage(true));
    setToggleSidebar(!toggleSideBar)
  };

  const onRegisterClick = () => {
    dispatch(menus.actions.toggleRegisterPage(true));
    setToggleSidebar(!toggleSideBar)
  }

  const onToggleMenu = () => {
    setToggleSidebar(!toggleSideBar)
  };

  return (
    <aside style={{ position: 'fixed', right: '0px', top: '0px', zIndex: '997' }}>
      <nav>
        <div className="nav-right visible-xs">
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
        <div className={toggleSideBar ? 'sidebar active' : 'sidebar'}>
          <ul className="sidebar-list">
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/user/login" onClick={onLoginClick}>Login</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/user/register" onClick={onRegisterClick}>Register</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/about" onClick={onToggleMenu}>About</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/" onClick={onToggleMenu}>Home</NavLink></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

