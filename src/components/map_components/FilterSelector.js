
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import menus from '../../reducers/menus'

export const FilterSelector = () => {
  const [genre, setGenre] = useState('');
  const [continent, setContinent] = useState('');
  const filterSelected = useSelector((store) => store.menus.filter);
  const dispatch = useDispatch();

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  const handleOnClearClick = () => {
    dispatch(menus.actions.toggleFilter(false));
  };

  return (
    <div className={filterSelected ? 'filterpage active' : 'filterpage'}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div">
          Filter movies
        </Typography>
        <IconButton
          aria-label="clear"
          onClick={() => handleOnClearClick()}>
          <ClearIcon />
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
    </div>
  );
};