import React from 'react';
import styled from 'styled-components';
import globe from '../../images/173986775earth-spinning-rotating-animation-15-2.gif'

const LoaderBackground = styled.div`
  background: #2D3142; 
  margin-top: 0px;
  height: 100vh;
  position: relative;
`;

const GlobeLoader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader = () => {
  return (
    <LoaderBackground>
      <GlobeLoader
        src={globe}
        alt="globe loader" />
    </LoaderBackground>
  );
}