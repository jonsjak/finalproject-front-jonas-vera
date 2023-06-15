import styled, { keyframes } from 'styled-components';

const GoRight = keyframes`
  0% {
    transform: translateX(-400px);
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
    transform: translateX(300px);
  }
  100% {
    transform: translateX(-300px);
  }
  `;

export const SlidingCardRight = styled(SlidingCard)`
  animation: ${GoLeft} 2.5s ease forwards;
`

export const AboutCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px;
  z-index: 999;
  max-height: 600px;
  overflow: scroll;
  border-radius: 4px;
  width: 800px;
  background: white;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 800px) {
    width: 400px;
    top: 414px;
  }

  @media (max-width: 400px) {
    width: 300px;
  }

  @media (max-width: 300px) {
    width: 250px;
  }
`;

export const NotFoundCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

export const MovieDetailCard = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const NoMoviesCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`