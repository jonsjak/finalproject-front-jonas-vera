/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import menus from 'reducers/menus';
import { styled } from '@mui/material/styles';
import { CameraLogo, GlobeLogo } from 'components/styles/Images';
import { DiagonalBox, HeaderContainer } from 'components/styles/Containers';
import { MenuText } from 'components/styles/Text';
import IconButton from '@mui/material/IconButton';
import logo from '../../images/movie-logo6.png';
import globe from '../../images/173986775earth-spinning-rotating-animation-15-2.gif';

const StyledIconButton = styled((props) => (
  <IconButton aria-label="clear" {...props} />
))(() => ({
  position: 'absolute',
  left: '15px',
  top: '15px',
  zIndex: '999',
  borderRadius: '0px',
  padding: '0px',
  '@media (max-width: 780px)': {
    left: '0px',
    top: '0px'
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
          <>
            <DiagonalBox />
            <Link to="/">
              <CameraLogo
                src={logo}
                alt="logo" />
              <GlobeLogo
                src={globe}
                alt="globe loader" />
            </Link>
          </>
        ) : (
          <StyledIconButton onClick={() => handleShowMenu()}>
            <MenuText>Menu</MenuText>
          </StyledIconButton>
        )}
    </HeaderContainer>
  );
}