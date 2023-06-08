import React from 'react';

const About = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '999',
      maxHeight: '400px',
      padding: '30px',
      background: 'white'
    }}>
      <h1>About Page</h1>
      <p>This is a dummy About page.</p>
    </div>
  );
}

export default About;
