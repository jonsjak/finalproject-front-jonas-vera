import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundBackground } from 'components/styles/Containers';
import { Typography, Button, ThemeProvider } from '@mui/material';
import { theme } from 'components/styles/muiTheme';
import { NotFoundCard } from 'components/styles/Cards';

export const NotFound = () => {
  return (
    <NotFoundBackground>
      <ThemeProvider theme={theme}>
        <NotFoundCard>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              margin: '0px',
              fontSize: '2.2rem',
              color: 'white'
            }}>
              Page not found
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