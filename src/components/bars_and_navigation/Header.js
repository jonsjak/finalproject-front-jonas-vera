/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import menus from 'reducers/menus';
import { styled } from '@mui/material/styles';
import { CameraLogo } from 'components/styles/Images';
import { HeaderContainer } from 'components/styles/Containers';
import { SmallMenuText } from 'components/styles/Text';
import IconButton from '@mui/material/IconButton';
import logo from '../../images/camera-logo-new4.png';

const StyledIconButton = styled((props) => (
  <IconButton aria-label="clear" {...props} />
))(() => ({
  position: 'absolute',
  left: '20px',
  top: '20px',
  zIndex: '999',
  borderRadius: '0px',
  padding: '0px',
  width: 'auto',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 780px)': {
    left: '0px',
    top: '0px',
    background: '#dcdcdc'
  }
}));

export const Header = () => {
  const dispatch = useDispatch();
  const showHeader = useSelector((store) => store.menus.headerMenuShowing);

  const handleShowMenu = () => {
    dispatch(menus.actions.toggleHeaderMenu(true));
  };

  return (
    <HeaderContainer>
      {showHeader
        ? (
          <Link to="/">
            <CameraLogo
              src={logo}
              alt="logo" />
          </Link>
        ) : (
          <StyledIconButton onClick={() => handleShowMenu()}>
            <div className="bar top-small" />
            <div className="bar-text middle">
              <SmallMenuText className="middle">
              Menu
              </SmallMenuText>
            </div>
            <div className="bar bottom-small" />
          </StyledIconButton>
        )}
    </HeaderContainer>
  );
}