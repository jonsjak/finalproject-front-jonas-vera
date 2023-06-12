/* import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Box, TextField } from '@mui/material';
import dotenv from 'dotenv';

dotenv.config();

export const AddMovie = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const map = useMap();
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setMarkerPosition(e.latlng);
    }
  });

  useEffect(() => {
    if (markerPosition) {
      map.flyTo(markerPosition, 10)
    }
  }, [markerPosition, map]);

  const handleMovieSearch = (event) => {
    try {
      const searchValue = event.target.value;
      fetch(`http://www.omdbapi.com/?s=${searchValue}&497b18fa&`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
  return markerPosition ? (
    <Marker position={markerPosition}>
      <Popup style={{ margin: '0px', width: '300px' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off">
          <h2>Want to add a location?</h2>
          <TextField
            id="standard-search"
            label="Search movie on OMDB"
            type="search"
            variant="standard"
            onChange={handleMovieSearch} />
        </Box>
      </Popup>
    </Marker>
  ) : null;
};
 */