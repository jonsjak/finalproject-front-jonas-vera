/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { List, TextField, ThemeProvider, Card, CardContent, Typography, FormControl, Button  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import location, { fetchPrivateMovies } from 'reducers/location';
import { createTheme } from '@mui/material/styles';
import filmIcon from '../../images/movie-marker5-01-01.png'

export const AddMovie = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userInput, setUserInput] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieLocation, setMovieLocation] = useState('');
  const [sceneDescription, setSceneDescription] = useState('');
  const [movieStill, setMovieStill] = useState('');
  const [locationImage, setLocationImage] = useState('');
  const dispatch = useDispatch();
  const map = useMap();
  const accessToken = useSelector((store) => store.user.accessToken);
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
          setSelectedMovie(data) // returns one object - what do to with it?
          setUserInput(true)
          setMovieTitle(Title)
          console.log('title', Title)
          setSearchResults([])
        });
    } else {
      console.log('Movie not found')
    }
  }

  const onSubmitMovie = async () => {
    const inputData = {
      title: movieTitle,
      location: movieLocation,
      scene_description: sceneDescription,
      movie_location_still: movieStill,
      location_image: locationImage,
      coordinates: markerPosition ? markerPosition : null,
      LikedBy: []
    };
    console.log('coordinates', markerPosition)
    console.log('marker', markerPosition)
    const newMovieToPost = { ...selectedMovie, ...inputData };

      console.log('newMovie', newMovieToPost)

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify(newMovieToPost)
      };
      try {
        const response = await fetch(`${process.env.REACT_APP_MOVIE_URL}`, options)
        const data = await response.json();
        
        if (data.success) {
          dispatch(location.actions.addMovie(data.response))
          dispatch(location.actions.updateMovieCoordinates(data.response._id, markerPosition));
          dispatch(fetchPrivateMovies(accessToken))
          setSearchValue('');
          setMarkerPosition(null)
        } else {
          console.log('data didnt fetch')
        }
      } catch (error) {
        console.log("Error:", error);
    }
    setUserInput(false)
    setSearchResults([])
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
              {searchResults.length > 0 && (
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
              {userInput && (
                <>
                  <Typography gutterBottom variant="h4" component="div" sx={{ fontSize: '1.8rem' }}>
                    Add <span style={{ fontStyle: 'italic' }}>{selectedMovie.Title}</span>
                  </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <TextField
                      helperText="Name of movie location"
                      id="outlined-size-small margin-none"
                      label="Location"
                      variant="outlined"
                      size="small"
                      value={movieLocation}
                      onChange={(e) => setMovieLocation(e.target.value)}/>
                    <TextField
                      helperText="Describe the scene from the film taking place here"
                      id="outlined-multiline-static margin-none"
                      label="Scene description"
                      multiline
                      rows={3}
                      size="small"
                      value={sceneDescription}
                      onChange={(e) => setSceneDescription(e.target.value)}/>
                    <TextField
                      helperText="Paste in an URL of a still image from the film scene"
                      id="outlined-basic margin-none"
                      label="Movie still image"
                      variant="outlined"
                      size="small"
                      value={movieStill}
                      onChange={(e) => setMovieStill(e.target.value)}/>
                    <TextField
                      helperText="Paste in an URL to an image of the place"
                      id="outlined-basic margin-none"
                      label="Image of the place"
                      variant="outlined"
                      size="small"
                      value={locationImage}
                      onChange={(e) => setLocationImage(e.target.value)}/>
                    <Button
                      type="button"
                      onClick={onSubmitMovie}
                      variant="contained"
                      sx={{
                        width: '180px',
                        alignSelf: 'center',
                        fontWeight: 700
                      }}
                      size="large">
                        Add movie
                    </Button>
                  </FormControl>
                </>)
              }
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    </ThemeProvider>
  );
};