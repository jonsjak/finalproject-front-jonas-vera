import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Box, List, TextField } from '@mui/material';

export const AddMovie = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const map = useMap();

  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
    }
  });

  useEffect(() => {
    if (markerPosition) {
      map.flyTo(markerPosition, 6)
    }
  }, [markerPosition, map]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) {
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}`)
          .then((response) => response.json())
          .then((json) => setSearchResults(json.Search));
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleMovieSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return markerPosition && (
    <Marker position={markerPosition}>
      <Popup style={{ margin: '0px', width: '300px' }}>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
          <h2>Want to add a location?</h2>
          <TextField
            id="standard-search"
            label="Search movie on OMDB"
            type="search"
            variant="standard"
            onChange={handleMovieSearch} />
          <List>
            {searchResults.slice(0, 5).map((result) => (
              <p key={result.imdbID}>{result.Title}</p>
            ))}
          </List>
        </Box>
      </Popup>
    </Marker>
  );
};