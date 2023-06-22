import { CardContent, Typography, Card, List, ListSubheader, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import location from 'reducers/location';

export const GetComments = ({ selectedMovie, showUserComments }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.userName);
  const movieComments = selectedMovie.Comments || [];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };
      try {
        // eslint-disable-next-line no-underscore-dangle
        if (accessToken && selectedMovie._id && isMounted) {
          // eslint-disable-next-line no-underscore-dangle
          const response = await fetch(`https://movie-globe-backend-djwdbjbdsa-lz.a.run.app/movies/${selectedMovie._id}/getcomments`, options);
          const data = await response.json();
          const comments = data.body.singleMovie.Comments;

          dispatch(location.actions.setComments({
            // eslint-disable-next-line no-underscore-dangle
            movieId: selectedMovie._id,
            comments
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line no-underscore-dangle
  }, [accessToken, dispatch, selectedMovie._id]);

  // Filter comments based on the showUserComments prop
  const filteredComments = showUserComments === 'true'
    ? movieComments.filter((comment) => comment.userName === name)
    : movieComments;

  return (
    <div style={{ marginBottom: '40px' }}>
      {showUserComments === 'false' && filteredComments.length > 0 && (
        <div>
          {filteredComments.map((comment) => (
            <Card
            // eslint-disable-next-line no-underscore-dangle
              key={comment._id}
              sx={{
                marginBottom: '10px',
                boxShadow: 3
              }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    margin: '0.3em',
                    fontStyle: 'italic',
                    wordBreak: 'break-word',
                    hyphens: 'auto'
                  }}>
                  {comment.message}
                </Typography>
                <Typography
                  sx={{ alignSelf: 'flex-end' }}
                  component="span"
                  variant="body2"
                  color="text.secondary">
                    / {comment.userName}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {showUserComments === 'true' && filteredComments.length > 0 && (
        <List>
          <ListSubheader
            sx={{
              padding: '0px',
              borderBottom: '1px solid #f08353',
              color: '#f08353',
              top: '-5px'
            }}
            id="nested-list-subheader">
            <Typography
              variant="overline"
              display="block"
              gutterBottom>
              My comments
            </Typography>
          </ListSubheader>
          {filteredComments.map((comment) => (
            <ListItem
            // eslint-disable-next-line no-underscore-dangle
              key={comment._id}
              sx={{ padding: '8px 0px' }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  margin: '0.3em 0.1em',
                  fontStyle: 'italic',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}>
                &quot;{comment.message}&quot;
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
      {filteredComments.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            margin: '0.3em',
            fontStyle: 'italic',
            wordBreak: 'break-word',
            hyphens: 'auto'
          }}>
          No comments yet
        </Typography>
      )}
    </div>
  );
};