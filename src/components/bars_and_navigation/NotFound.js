import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <p>Page not Found</p>
      <Link to="/">
        <button type="button">Back to start page</button>
      </Link>
    </>
  )
}