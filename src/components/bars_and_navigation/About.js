/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import { AboutCard } from 'components/styles/Cards';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, ThemeProvider, Typography, CardHeader, Card, CardContent, CardMedia } from '@mui/material';
import { theme } from 'components/styles/muiTheme';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Slide1 from '../../images/slide1.png'
import Slide2 from '../../images/slide2.png'
import Slide3 from '../../images/slide3.png'
import Slide4 from '../../images/slide4.png'

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <AboutCard>
        <Card
          sx={{
            padding: '20px',
            overflow: 'scroll',
            height: '600px'
          }}>
          <CardHeader
            action={
              <Link
                to="/">
                <IconButton
                  aria-label="clear">
                  <ClearIcon />
                </IconButton>
              </Link>
            }
            title="Welcome to The Movie Globe!"
            subheader="a project by Jonas Jakobson and Vera Sjunnesson"
            sx={{
              paddingBottom: '0px'
            }} />
          <CardContent>
            <Carousel
              sx={{ marginBottom: '20px' }}
              animation="fade">
              <CardMedia
                component="img"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={Slide1}
                alt="image of webbpage" />
              <CardMedia
                component="img"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={Slide2}
                alt="image of webbpage" />
              <CardMedia
                component="img"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={Slide3}
                alt="image of webbpage" />
              <CardMedia
                component="img"
                width="100%"
                sx={{ objectFit: 'cover' }}
                image={Slide4}
                alt="image of webbpage" />
            </Carousel>
            <Typography
              variant="body2"
              paragraph>
              Are you a movie enthusiast? Do you love exploring different film locations around the world? Look no further! With Movie Globe, you can embark on a thrilling cinematic journey and discover the real-world places where your favorite movies were filmed.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              Immerse yourself in the magic of cinema as you navigate the map, filled with markers representing iconic movie locations. Each marker holds a treasure trove of information, from the movie title and scene descriptions to fascinating behind-the-scenes trivia.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              Using Movie Globe is simple. Just browse the map, zoom in and out to explore different regions, and click on the markers to reveal the secrets they hold. You'll uncover hidden movie gems from all over the world.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              But that's not all! We've integrated powerful search functionality that allows you to find specific movies and add them to the map based on your own knowledge.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              That way you can contribute to our ever-growing community by adding your own movie locations. If you've stumbled upon a spot that served as a backdrop for a film, mark it on the map, and share details such as the scene description and movie stills. Together, we can create a comprehensive database of film locations worldwide.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              Whether you're planning a movie-themed vacation, conducting research, or simply indulging your passion for cinema, Movie Globe is your ultimate companion. Join us in celebrating the art of filmmaking, and let the map guide you to extraordinary places where imagination comes to life on the silver screen.
            </Typography>
            <Typography
              variant="body2"
              paragraph>
              Start your cinematic adventure now and experience movies in a whole new way with Movie Globe!
            </Typography>
          </CardContent>
        </Card>
      </AboutCard>
    </ThemeProvider>
  );
};

export default About;
