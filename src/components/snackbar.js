import React from "react";
import { Snackbar, Alert } from "@mui/material";
import Slide from '@mui/material/Slide';

const SnackbarComponent = ({ open, message, type, onClose }) => {

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
