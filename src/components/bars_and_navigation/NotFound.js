import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const NotFoundBackground = styled.div`
  background: #2D3142; 
  margin-top: 0px;
  height: 100vh;
  width: 100%;
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 997;
`;

const NotFoundCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  aign-items: center;
  text-align: center;
  gap: 10px;
`;

export const NotFound = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#008ca5',
        dark: '#037588',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: '#035f6f',
        dark: '#ba000d',
        contrastText: '#000'
      }
    }
  });
  return (
    <NotFoundBackground>
      <ThemeProvider theme={theme}>
        <NotFoundCard>
          <Typography gutterBottom variant="h2" component="div" sx={{ margin: '0px', fontSize: '2.2rem', color: 'white' }}>
              Page not found
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', marginBottom: '20px' }}>
              Go back to home
          </Typography>
          <Link to="/">
            <Button
              type="button"
              variant="contained"
              sx={{
                width: '180px',
                fontWeight: 700
              }}
              size="large">
                Go back
            </Button>
          </Link>
        </NotFoundCard>
      </ThemeProvider>
    </NotFoundBackground>
  )
}