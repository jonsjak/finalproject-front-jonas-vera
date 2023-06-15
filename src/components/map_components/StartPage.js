import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

export const StartPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const isLoggedIn = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      const showDelay = 5000; // Delay
      const hideDelay = 4000; // Duration

      const showTimer = setTimeout(() => {
        setShowAlert(true);
      }, showDelay);

      const hideTimer = setTimeout(() => {
        setShowAlert(false);
      }, showDelay + hideDelay);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isLoggedIn]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 444,
        left: '5%',
        bottom: '5%'
      }}>
      {showAlert && (
        <Alert
          severity="info">
          You need to log in to explore all features.
        </Alert>
      )}
    </div>
  );
};
