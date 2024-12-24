import React, { createContext, useContext, useState, useCallback } from "react";
import SnackbarComponent from "../components/snackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = useCallback((message, type = "success") => {
    setSnackbarState({ open: true, message, type });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <SnackbarComponent
        open={snackbarState.open}
        message={snackbarState.message}
        type={snackbarState.type}
        onClose={handleSnackbarClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
