import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ConfirmModal = ({ open, title, message, options, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => onClose(null)}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box sx={style}>
      <IconButton
          aria-label="close"
          onClick={() => onClose(null)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="confirmation-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        <Typography
          id="confirmation-modal-description"
          sx={{ mb: 3 }}
        >
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onClose(option.value)}
              variant={option.variant || "contained"}
              color={option.color || "primary"}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
