import React from 'react';
import { BASE_URL } from 'utils/urls';

// testing from .env

const OmdbFetch = () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });

  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export default OmdbFetch;
