import React from 'react';
import styled from 'styled-components';
import logo from '../../images/movie-logo.png'

export const CameraLogo = styled.img`
  height: 145px;
  position: absolute;
  top: 0px;
  left: -1px;
  z-index: 999;
`
export const HeaderContainer = styled.div`
  position: relative;
`

export const DiagonalBox = styled.div`
  background: #008ca5;
  transform: skewY(-8deg);
  position: absolute;
  z-index: 997;
  top: -146px;
  width: 100%;
  height: 194px;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <DiagonalBox />
      <CameraLogo src={logo} alt="logo" />
    </HeaderContainer>
  );
}