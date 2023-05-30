import { createSlice } from '@reduxjs/toolkit';

const location = createSlice({
  name: 'location',
  initialState: {
    movie: null,
    coordinates: null
  },
  reducers: {
    setMovie: (store, action) => {
      store.movie = action.payload
    },
    setCoordinates: (store, action) => {
      store.coordinates = action.payload
    }
  }
});

export default location;