import styled, { keyframes } from 'styled-components';

const GoRight = keyframes`
0% {
  transform: translateX(-400px;);
}
100% {
  transform: translateX(400px);
}
`;

export const SlidingCard = styled.div`
  display: flex;
  width: ${(props) => (props.personal ? '345px' : '250px')};
  height: ${(props) => (props.personal && '600px')};
  border-radius: ${(props) => (props.personal && '4px')};
  position: fixed;
  z-index: 1000;
  bottom: 0px;
  left: ${(props) => (props.personal && '-400px')};
  left: ${(props) => (props.filter && '-300px')};
  right: ${(props) => (props.loginregister && '-300px')};
  flex-direction: column;
  background-color: white;
  padding: ${(props) => (props.personal ? '5px' : '20px')};
  animation: ${GoRight} 2.5s ease forwards;
`

const GoLeft = keyframes`
0% {
  transform: translateX(300px;);
}
100% {
  transform: translateX(-300px);
}
`;

export const SlidingCardRight = styled(SlidingCard)`
  animation: ${GoLeft} 2.5s ease forwards;
`

