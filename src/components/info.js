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
        <DialogTitle>How to Use the Video Player</DialogTitle>
        <Grid2 item style={{ position: "absolute", right: 5, top: 5 }}>
          <Button onClick={onClose} color="secondary">
            <CloseIcon fontSize="large" />
          </Button>
        </Grid2>
      </Grid2>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Welcome to the Vi-Di Player!
        </Typography>
        <Typography variant="body1">
          This video player offers advanced features like fast-forwarding,
          rewinding, bookmarking, and more. Below are the instructions to help
          you get started.
        </Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Typography variant="h6" gutterBottom>
          Getting Started
        </Typography>
        <Typography variant="body2">
          1. To upload a video, click on the "Add" button in the top navigation
          bar.
        </Typography>
        <Typography variant="body2">
          2. Use the controls at the middle of the player to play, pause,
          rewind, or fast-forward the video.
        </Typography>
        <Typography variant="body2">
          3. Use the controls at the bottom of the player to adjust the volume,
          playback speed and progress.
        </Typography>
        <Typography variant="body2">
          4. Bookmark your favorite moments by clicking the "Bookmark" button.
        </Typography>
        <Typography variant="body2">
          5. View recent videos by clicking the "Browse Gallery" dropdown in the
          navigation bar.
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
