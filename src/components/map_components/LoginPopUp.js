import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Alert popup styling
const PopUp = styled.div`
  position: absolute;
  z-index: 999;
  left: 5%;
  bottom: 3%;
`;

export const LoginPopUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const isLoggedIn = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (!isLoggedIn) {
      const showDelay = 5000; // Delay
      const hideDelay = 5000; // Duration

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
    <PopUp>
      {showAlert && (
        <Alert severity="info">
          Log in for more locations and features.
        </Alert>
      )}
    </PopUp>
  );
};
