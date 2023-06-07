import React, { useState } from 'react';
import { Card, CardActionArea, Tab, Tabs, Typography, CardMedia, CardContent } from '@mui/material';
import { FavoriteIcon } from '@mui/icons-material';

export const PersonalPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<FavoriteIcon />} label="FAVORITE MOVIES" />
        <Tab icon={<FavoriteIcon />} label="FAVORITE MOVIES" />
        <Tab icon={<FavoriteIcon />} label="FAVORITE MOVIES" />
      </Tabs>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};