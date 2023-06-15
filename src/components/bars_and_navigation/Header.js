import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../images/movie-logo6.png';
import globe from '../../images/173986775earth-spinning-rotating-animation-15-2.gif';

export const CameraLogo = styled.img`
  height: 10em;
  position: absolute;
  top: -26px;
  left: 6px;
  z-index: 999;
`
export const HeaderContainer = styled.div`
  position: relative;
`

export const DiagonalBox = styled.div`
  background: linear-gradient(to bottom, #57c1eb 0%,#008ca5 100%); 
  transform: skewY(-8deg);
  position: absolute;
  z-index: 997;
  top: -146px;
  width: 100%;
  height: 194px;
`

const GlobeLoader = styled.img`
  position: absolute;
  top: 30px;
  left: 138px;
  z-index: 997;
  height: 60px;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <DiagonalBox />
      <Link to="/">
        <CameraLogo
          src={logo}
          alt="logo" />
        <GlobeLoader
          src={globe}
          alt="globe loader" />
      </Link>
    </HeaderContainer>
  );
}