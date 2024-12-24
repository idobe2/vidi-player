import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmModal from "../components/confirm";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
    options: [],
    resolve: null,
  });

  const confirm = useCallback((title, message, options = []) => {
    return new Promise((resolve) => {
      setModalState({
        open: true,
        title,
        message,
        options,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback((value) => {
    if (modalState.resolve) {
      modalState.resolve(value);
    }
    setModalState((prev) => ({ ...prev, open: false }));
  }, [modalState]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmModal
        open={modalState.open}
        title={modalState.title}
        message={modalState.message}
        options={modalState.options}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  return useContext(ConfirmContext);
};
