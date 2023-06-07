/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from 'MUI-styling/muiTheme';
import { useDispatch } from 'react-redux';
/* import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; */
import user from 'reducers/user';

export const Login = () => {
  const loginUrl = process.env.REACT_APP_LOGIN_URL;
  const dispatch = useDispatch();

  // Redirect to personal page or personalized map
  /* useEffect(() => {
    if (accessToken) {
      navigate('/personal');
    }
  }, [accessToken, navigate]); */

  // Login-handler
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const data = {
      username: username.value,
      password: password.value
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    // fetches and dispatches data to store
    fetch(loginUrl, options)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          console.log(json);
          dispatch(user.actions.setAccessToken(json.response.accessToken));
          dispatch(user.actions.setUserName(json.response.username));
          dispatch(user.actions.setUserId(json.response.id));
          dispatch(user.actions.setError(data.response));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUserName(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      })
      .catch((error) => console.log(error))
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Not a user? Register here...
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}