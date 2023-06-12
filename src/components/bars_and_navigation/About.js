import React from 'react';
import styled from 'styled-components';

export const AboutCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  max-height: 400px;
  padding: 30px;
  background: white;
`

const About = () => {
  return (
    <AboutCard>
      <h1>About Page</h1>
      <p>This is a dummy About page.</p>
    </AboutCard>
  );
}

export default About;
