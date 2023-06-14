/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const AboutCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  max-height: 600px;
  width: 800px;
  padding: 30px;
  background: white;
`;

const About = () => {
  return (
    <AboutCard>
      <Link to="/">
        <Button>
          <Close />
        </Button>
      </Link>
      <h2>Welcome to The Movie Globe!</h2>
      <p>
        Are you a movie enthusiast? Do you love exploring different film locations around the world? Look no further! With Movie Globe, you can embark on a thrilling cinematic journey and discover the real-world places where your favorite movies were filmed.
      </p>
      <p>
        Immerse yourself in the magic of cinema as you navigate the map, filled with markers representing iconic movie locations. Each marker holds a treasure trove of information, from the movie title and scene descriptions to fascinating behind-the-scenes trivia.
      </p>
      <p>
        Using Movie Globe is simple. Just browse the map, zoom in and out to explore different regions, and click on the markers to reveal the secrets they hold. You'll uncover hidden movie gems from all over the world.
      </p>
      <p>
        But that's not all! We've integrated powerful search functionality that allows you to find specific movies and add them to the map based on your own knowledge.
      </p>
      <p>
        That way you can contribute to our ever-growing community by adding your own movie locations. If you've stumbled upon a spot that served as a backdrop for a film, mark it on the map, and share details such as the scene description and movie stills. Together, we can create a comprehensive database of film locations worldwide.
      </p>
      <p>
        Whether you're planning a movie-themed vacation, conducting research, or simply indulging your passion for cinema, Movie Globe is your ultimate companion. Join us in celebrating the art of filmmaking, and let the map guide you to extraordinary places where imagination comes to life on the silver screen.
      </p>
      <p>
        Start your cinematic adventure now and experience movies in a whole new way with Movie Globe!
      </p>
    </AboutCard>
  );
};

export default About;
