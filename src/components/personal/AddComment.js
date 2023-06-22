import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import location from 'reducers/location';
import { FormControl, TextField, Button } from '@mui/material';

export const AddComment = ({ selectedMovie }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.userName);

  const handleSubmit = async () => {
    const comment = {
      message,
      userName: name
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(comment)
    };
    try {
      // eslint-disable-next-line no-underscore-dangle
      const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovie._id}/addcomment`, options);
      const data = await response.json(); // fix line above?

      if (data.success) {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(location.actions.addComment({ movieId: selectedMovie._id, comment }));
        dispatch(location.actions.setComments({
          // eslint-disable-next-line no-underscore-dangle
          movieId: selectedMovie._id,
          comments: [...selectedMovie.Comments, comment]
        }));
      } else {
        console.log('comment not posted')
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setMessage('')
  };

  return (
    <FormControl
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '30px'
      }}
      size="small">
      <TextField
        id="outlined-multiline-static margin-none"
        label="Your comment or review..."
        multiline
        rows={3}
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)} />
      <Button
        type="button"
        onClick={handleSubmit}
        variant="contained"
        sx={{
          width: '180px',
          alignSelf: 'center',
          fontWeight: 700,
          marginTop: '20px'
        }}
        size="large">
          Post Comment
      </Button>
    </FormControl>
  )
}