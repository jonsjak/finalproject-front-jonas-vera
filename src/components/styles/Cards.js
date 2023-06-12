import styled, { css } from 'styled-components';

export const SlidingCard = styled.div`
  display: flex;
  width: ${(props) => (props.personal ? '345px' : '250px')};
  position: fixed;
  z-index: 999;
  bottom: 0px;
  left: ${(props) => (props.personal && '-400px')};
  left: ${(props) => (props.filter && '-300px')};
  right: ${(props) => (props.loginregister && '300px')};
  flex-direction: column;
  background-color: white;
  padding: ${(props) => (props.personal ? '5px' : '20px')};
  transition: transform .7s ease-in-out;
  -moz-transition: transform .7s ease-in-out;
  -ms-transition: transform .7s ease-in-out;
  -o-transition: transform .7s ease-in-out;
  transition: transform .7s ease-in-out;

  ${({ personalSelected }) => personalSelected && css`
    transition: transform .7s ease-in-out;
    -moz-transition: transform .7s ease-in-out;
    -ms-transition: transform .7s ease-in-out;
    -o-transition: transform .7s ease-in-out;
    -webkit-transform: translateX(400px);
    -moz-transform: translateX(400px);
    -ms-transform: translateX(400px);
    -o-transform: translateX(400px);
    transform: translateX(400px);
  `}

  ${({ filterSelected }) => filterSelected && css`
    transition: transform .7s ease-in-out;
    -moz-transition: transform .7s ease-in-out;
    -ms-transition: transform .7s ease-in-out;
    -o-transition: transform .7s ease-in-out;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    -ms-transform: translateX(300px);
    -o-transform: translateX(300px);
    transform: translateX(300px);
`}

  ${({ loginRegisterSelected }) => loginRegisterSelected && css`
    transition: transform .7s ease-in-out;
    -moz-transition: transform .7s ease-in-out;
    -ms-transition: transform .7s ease-in-out;
    -o-transition: transform .7s ease-in-out;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    -ms-transform: translateX(300px);
    -o-transform: translateX(300px);
    transform: translateX(300px);
  `}
`