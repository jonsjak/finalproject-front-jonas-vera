/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from 'MUI-styling/muiTheme';
import user from 'reducers/user';
import { useDispatch } from 'react-redux';

export const Register = () => {
  const registerUrl = process.env.REACT_APP_REGISTER_URL;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const data = {
      username: username.value,
      password: password.value
      // add email address here and to backend
    };
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify(data)
    };

    // Checks password requirements
    if (!passwordRegex.test(data.password)) {
      console.log('Password needs to be at least 6 characters long, include one number, one UPPERCASE letter and one lowercase letter')
    }

    fetch(`${registerUrl}`, options)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // what to do more with the recived data? Redirect to...
        dispatch(user.actions.setUserName(json.response.username));
        dispatch(user.actions.setUserId(json.response.id));
        dispatch(user.actions.setAccessToken(json.response.accessToken));
        dispatch(user.actions.setError(false));
      })
      .catch((error) => console.log(error));
  };
  return (
    <ThemeProvider theme={muiTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography component="h1" variant="h5">
              Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                    Already have an account? Sign in here!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};