/* eslint-disable no-underscore-dangle */
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const GetComments = () => {
  const selectedMovieId = useSelector((store) => store.location.activeMovie._id);
  const accessToken = useSelector((store) => store.user.accessToken);
  const [commentedMovie, setCommentedMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };
      try {
        if (accessToken && selectedMovieId) {
          const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovieId}`, options);
          const data = await response.json();
          console.log(data.body.singleMovie.Comments);
          setCommentedMovie(data.body.singleMovie);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, selectedMovieId]);

  return (
    <div>
      {commentedMovie.Comments && commentedMovie.Comments.length > 0 ? (
        <List>
          {commentedMovie.Comments.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemText>{comment.message}</ListItemText>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary">
                /{comment.userName}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};