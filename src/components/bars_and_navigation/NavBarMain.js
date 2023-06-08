import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NavBarMain = () => {
  const [toggleSideBar, setToggleSidebar] = useState(false)

  const onToggleMenu = () => {
    setToggleSidebar(!toggleSideBar);
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
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/user/login" onClick={onToggleMenu}>Login</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/user/register" onClick={onToggleMenu}>Register</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/about" onClick={onToggleMenu}>About</NavLink></li>
            <li className={toggleSideBar ? 'sidebar-item active' : 'sidebar-item'}><NavLink className="sidebar-anchor" to="/" onClick={onToggleMenu}>Home</NavLink></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

