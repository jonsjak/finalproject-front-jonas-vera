import React, { useState } from 'react'
import { TextField, Typography, FormControl, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import location, { fetchPrivateMovies } from 'reducers/location';

export const AddMovieForm = ({
  markerPosition,
  setMarkerPosition,
  movieTitle,
  setSearchValue,
  setUserInput,
  setSearchResults,
  selectedMovie
}) => {
  const [movieLocation, setMovieLocation] = useState('');
  const [sceneDescription, setSceneDescription] = useState('');
  const [movieStill, setMovieStill] = useState('');
  const [locationImage, setLocationImage] = useState('');
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setMovieStill(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error', error);
    }
  }

  const onSubmitMovie = async () => {
    console.log('apple', movieStill)
    const inputData = {
      title: movieTitle,
      location: movieLocation,
      scene_description: sceneDescription,
      movie_location_still: movieStill,
      location_image: locationImage,
      coordinates: markerPosition,
      LikedBy: []
    };

    const newMovieToPost = { ...selectedMovie, ...inputData };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(newMovieToPost)
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_MOVIE_URL}`, options)
      const data = await response.json();

      if (data.success) {
        dispatch(location.actions.addMovie(data.response))
        // eslint-disable-next-line no-underscore-dangle
        dispatch(location.actions.updateMovieCoordinates(data.response._id, markerPosition));
        dispatch(fetchPrivateMovies(accessToken))
        setSearchValue('');
        setMarkerPosition(null)
      } else {
        console.log('data didnt fetch')
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setUserInput(false)
    setSearchResults([])
  }

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ fontSize: '1.8rem' }}>
        Add
        <span
          style={{
            fontStyle: 'italic'
          }}>
          {selectedMovie.Title}
        </span>
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <TextField
          helperText="Name of movie location"
          id="outlined-size-small margin-none"
          label="Location"
          variant="outlined"
          size="small"
          value={movieLocation}
          onChange={(e) => setMovieLocation(e.target.value)} />
        <TextField
          helperText="Describe the scene from the film taking place here"
          id="outlined-multiline-static margin-none"
          label="Scene description"
          multiline
          rows={3}
          size="small"
          value={sceneDescription}
          onChange={(e) => setSceneDescription(e.target.value)} />
        <TextField
          helperText="Paste in an URL to an image of the place"
          id="outlined-basic margin-none"
          label="Image of the place"
          variant="outlined"
          size="small"
          value={locationImage}
          onChange={(e) => setLocationImage(e.target.value)} />
        <Button
          variant="contained"
          compontent="label">
            Upload movie still
          <input
            type="file"
            onChange={convertToBase64} />
        </Button>
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
    </>

  )
}