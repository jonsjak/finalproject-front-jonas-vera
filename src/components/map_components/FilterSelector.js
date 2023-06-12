
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, InputLabel, MenuItem, FormHelperText, FormControl, Select, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SlidingCard } from 'components/styles/Cards';
import menus from '../../reducers/menus'

export const FilterSelector = () => {
  const [genre, setGenre] = useState('');
  const [continent, setContinent] = useState('');
  const filterSelected = useSelector((store) => store.menus.filter);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/user/login')
      dispatch(menus.actions.toggleLoginPage(true));
    }
  }, [accessToken, dispatch, navigate]);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.toggleFilter(false));
    navigate('/')
  };

  return (
    <SlidingCard filter filterSelected={filterSelected}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div">
          Filter movies
        </Typography>
        <IconButton
          aria-label="clear"
          onClick={() => handleOnClearClick()}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </div>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="demo-simple-select-helper-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={genre}
          label="Genre"
          onChange={handleGenreChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
        </Select>
        <FormHelperText>Select genre</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="demo-simple-select-helper-label">Continent</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={continent}
          label="Genre"
          onChange={handleContinentChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
        </Select>
        <FormHelperText>Select continent</FormHelperText>
      </FormControl>
      <FormGroup>
        <FormControlLabel control={<Checkbox color="secondary" size="small" />} label="Bechdel test approved" />
      </FormGroup>
    </SlidingCard>
  );
};