/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link, Box, Typography, Grid, TextField, Button, IconButton, ThemeProvider } from '@mui/material';
import user from 'reducers/user';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from 'components/styles/muiTheme';
import { useDispatch } from 'react-redux';
import { SlidingCardRight } from 'components/styles/Cards';
import { useNavigate } from 'react-router-dom';
import menus from '../../reducers/menus';

export const Register = () => {
  const registerUrl = process.env.REACT_APP_REGISTER_URL;
  /* const accessToken = useSelector((store) => store.user.accessToken); */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password } = event.target.elements;
    const data = {
      email: email.value,
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

    const validateFields = () => {
      let isValid = true;
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      if (!data.email) {
        setEmailError(true);
        setEmailErrorText('Email is required')
        isValid = false;
      } else {
        setEmailError(false);
      }

      if (!data.username) {
        setUsernameError(true);
        setUsernameErrorText('Username is required')
        isValid = false;
      } else {
        setUsernameError(false);
      }

      if (!passwordRegex.test(data.password)) {
        setPasswordError(true);
        setPasswordErrorText('Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number.');
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorText('');
      }

      return isValid;
    };

    if (validateFields()) {
      try {
        const response = await fetch(registerUrl, options);
        const json = await response.json();

        dispatch(
          user.actions.setUser({
            userName: json.response.username,
            userId: json.response.id,
            accessToken: json.response.accessToken,
            error: false
          })
        );
        // If user is successfully created
        if (json.response.accessToken) {
          navigate('/user/log'); // NEEDS TO BE REDIRECTED ELSEWHERE
        } else {
          alert('failed to register');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.toggleRegisterPage(false));
    navigate('/');
  };

  return (
    <SlidingCardRight loginregister>
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label="clear"
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => handleOnClearClick()}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
        <Typography
          component="h1"
          variant="h5"
          sx={{ alignSelf: 'center' }}>
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailErrorText} />
            </Grid>
            <Grid
              item
              xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                error={usernameError}
                helperText={usernameErrorText} />
            </Grid>
            <Grid
              item
              xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError}
                helperText={passwordErrorText} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2
            }}>
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="flex-end">
            <Grid item>
              <Link
                href="/login"
                variant="body2">
                Already have an account? Sign in here!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </SlidingCardRight>
  );
};