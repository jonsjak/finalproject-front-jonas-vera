import styled from 'styled-components';

export const MovieTitleHeader = styled.span`
  color: black;
  fontStyle: italic;
`

export const MenuText = styled.p`
  color: #2D3142;
  font-weight: 900;
  text-decoration: none;
  font-size: 1.8em;
  text-transform: uppercase;
  position: relative;
  padding: 7px;
  font-family: 'Arimo', sans-serif;
  margin: 0px;

  @media (max-width: 768px) {
    font-size: 1em;
    background: #dcdcdc;
  }
`