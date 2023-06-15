import styled from 'styled-components';

export const CameraLogo = styled.img`
  height: 10em;
  position: absolute;
  top: -26px;
  left: 6px;
  z-index: 999;

  @media (max-width: 768px) {
    height: 8em;
    top: -22px;
  }
`

export const GlobeLogo = styled.img`
  position: absolute;
  top: 30px;
  left: 138px;
  z-index: 997;
  height: 60px;

  @media (max-width: 768px) {
    top: 21px;
    left: 118px;
    height: 51px;
  }
`;

export const GlobeLoader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;