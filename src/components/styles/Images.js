import styled from 'styled-components';

export const CameraLogo = styled.img`
  height: 7em;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;

  @media (max-width: 768px) {
    height: 8em;
    top: -22px;
  }
`

export const GlobeLoader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;