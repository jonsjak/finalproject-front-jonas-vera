/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { List, TextField, ThemeProvider, Card, CardContent, Typography, Button  } from '@mui/material';
import { useSelector } from 'react-redux';
import location, { fetchPrivateMovies } from 'reducers/location';
import { createTheme } from '@mui/material/styles';
import filmIcon from '../../images/movie-marker5-01-01.png'
import { AddMovieForm } from './AddMovieForm';

export const AddMovie = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userInput, setUserInput] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const map = useMap();
  const mapClickable = useSelector((store) => store.menus.isMapClickable);
  
  const filmMarker = new L.Icon({
    iconUrl: filmIcon,
    iconSize: [40, 40]
  });

  // Add marker if isMapClickable
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (mapClickable)
      {setMarkerPosition([lat, lng])};
    }
  });
  // 
  useEffect(() => {
    if (markerPosition) {
      console.log(markerPosition);
      map.flyTo(markerPosition, 6)
    }
  }, [markerPosition, map]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) {
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}`)
          .then((response) => response.json())
          .then((json) => {
            setSearchResults(json.Search)
          });
      } else {
        setSearchResults([]); // visa lista
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const addMovieOnClick = (Title) => {
    if (Title) {
      fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${Title}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedMovie(data)
          setUserInput(true)
          setMovieTitle(Title)
          console.log('title', Title)
          setSearchResults([])
        });
    } else {
      console.log('Movie not found')
    }
  }

  const handleMovieSearch = (event) => {
    setSearchValue(event.target.value);
  };

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

  return markerPosition && (
    <ThemeProvider theme={theme}>
      <Marker position={markerPosition} icon={filmMarker}>
        <Popup style={{ margin: '0px', width: '300px' }}>
          <Card sx={{ width: 301 }}>
            <CardContent>
              {userInput ? null : (
                <>
                <Typography gutterBottom variant="h2" component="div" sx={{ fontSize: '2.2rem' }}>
                  Want to add a location?
                </Typography>
                <TextField
                  id="standard-search"
                  label="Search movie on OMDB"
                  type="search"
                  variant="standard"
                  sx={{ width: '70%' }}
                  value={(searchValue)}
                  onChange={handleMovieSearch} />
                </>
                )}
              {searchResults && (
                <List>
                  {searchResults.slice(0, 5).map((result) => (
                    <Button
                      type="button"
                      sx={{ textAlign: 'left' }}
                      onClick={() => addMovieOnClick(result.Title)}
                      key={result.imdbID}>
                      {result.Title}
                    </Button>
                  ))}
                </List>
              )}
              {userInput
                && <AddMovieForm
                  markerPosition={markerPosition}
                  setMarkerPosition={setMarkerPosition}
                  movieTitle={movieTitle}
                  setSearchValue={setSearchValue}
                  setUserInput={setUserInput}
                  setSearchResults={setSearchResults}
                  selectedMovie={selectedMovie} />
              }
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    </ThemeProvider>
  );
};