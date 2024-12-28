import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InfoDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Grid2 container direction="row" justifyContent="space-between">
        <DialogTitle>Using the Vi-Di Player</DialogTitle>
        <Grid2 style={{ position: "absolute", right: 5, top: 5 }}>
          <Button onClick={onClose} color="secondary">
            <CloseIcon fontSize="large" />
          </Button>
        </Grid2>
      </Grid2>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Quick Start Guide
        </Typography>
        <Typography variant="body1">
          Vi-Di Player is your go-to tool for seamless video playback with
          enhanced features. It is designed to provide an intuitive experience,
          whether you are watching educational content, entertainment, or
          personal videos.
        </Typography>
        <Typography variant="body1">
          Follow these steps to unlock its full potential and enjoy a tailored
          viewing experience:
        </Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Typography variant="h6" gutterBottom>
          Key Instructions
        </Typography>
        <Typography variant="body2">
          <strong>Upload Videos:</strong> Click the "Add" button in the top
          navigation bar to upload a video from your device or use a URL.
        </Typography>
        <Typography variant="body2">
          <strong>Search YouTube:</strong> Enter a video title or keyword in the
          search bar to find and play videos directly from YouTube.
        </Typography>
        <Typography variant="body2">
          <strong>Playback Controls:</strong> Use the central controls for play,
          pause, rewind, and fast-forward options.
        </Typography>
        <Typography variant="body2">
          <strong>Adjust Playback:</strong> Change volume, playback speed,
          repeat or skip to specific moments using the bottom controls.
        </Typography>
        <Typography variant="body2">
          <strong>Create Bookmarks:</strong> Save your favorite moments by
          clicking the "Bookmark" button, then manage them easily from the
          bookmark list.
        </Typography>
        <Typography variant="body2">
          <strong>Access Recent Videos:</strong> Quickly revisit recent videos
          via the "Browse Gallery" dropdown in the navigation bar.
        </Typography>
        <Typography variant="body2">
          <strong>Toggle Dark Mode:</strong> Customize your viewing experience
          by toggling between light and dark themes.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
