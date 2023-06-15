import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import location, { fetchPublicMovies } from 'reducers/location';
import menus from 'reducers/menus';
import user from 'reducers/user';
import { NavBarContainer } from 'components/styles/Containers';

export const NavBarMain = () => {
  const dispatch = useDispatch();
  const [toggleSideBar, setToggleSidebar] = useState(false)
  const accessToken = useSelector((store) => store.user.accessToken);

  const onRegisterClick = () => {
    dispatch(menus.actions.toggleRegisterPage(true));
    setToggleSidebar(!toggleSideBar)
  }

  const onToggleMenu = () => {
    setToggleSidebar(!toggleSideBar)
  };

  // Signing out and resetting state
  const onLogOutClick = () => {
    dispatch(user.actions.signOut())
    dispatch(location.actions.setMovies([]));
    dispatch(location.actions.setMovieCoordinates([]));
    dispatch(fetchPublicMovies())
    setToggleSidebar(!toggleSideBar)
  };

  return (
    <NavBarContainer>
      <nav>
        <div className="nav-right visible-xs">
          <button
            onClick={onToggleMenu}
            type="button"
            className={toggleSideBar
              ? 'button active' : 'button'}
            id="btn">
            <div className="bar top" />
            <div className="bar middle" />
            <div className="bar bottom" />
          </button>
        </div>
        <main className={toggleSideBar
          ? 'move-to-left' : ''}>
          <nav>
            <div className="nav-right hidden-xs">
              <button
                onClick={onToggleMenu}
                type="button"
                className={toggleSideBar
                  ? 'button active' : 'button'}
                id="btn">
                <div className="bar top" />
                <div className="bar middle" />
                <div className="bar bottom" />
              </button>
            </div>
          </nav>
        </main>
        <div className={toggleSideBar
          ? 'sidebar active' : 'sidebar'}>
          <ul className="sidebar-list">
            {accessToken
              ? (
                <li
                  className={toggleSideBar
                    ? 'sidebar-item active'
                    : 'sidebar-item'}>
                  <NavLink
                    className="sidebar-anchor"
                    to="/"
                    onClick={onLogOutClick}>
                      Log out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li
                    className={toggleSideBar
                      ? 'sidebar-item active' : 'sidebar-item'}>
                    <NavLink
                      className="sidebar-anchor"
                      to="/user/login"
                      onClick={onToggleMenu}>
                        Log in
                    </NavLink>
                  </li>
                  <li
                    className={toggleSideBar
                      ? 'sidebar-item active' : 'sidebar-item'}>
                    <NavLink
                      className="sidebar-anchor"
                      to="/user/register"
                      onClick={onRegisterClick}>
                        Register
                    </NavLink>
                  </li>
                </>
              )}
            <li
              className={toggleSideBar
                ? 'sidebar-item active' : 'sidebar-item'}>
              <NavLink
                className="sidebar-anchor"
                to="/about"
                onClick={onToggleMenu}>
                  About
              </NavLink>
            </li>
            <li
              className={toggleSideBar
                ? 'sidebar-item active' : 'sidebar-item'}>
              <NavLink
                className="sidebar-anchor"
                to="/"
                onClick={onToggleMenu}>
                  Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </NavBarContainer>
  );
}

