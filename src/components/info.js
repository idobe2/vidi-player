import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid2,
} from "@mui/material";
import visualGuide from "../images/visual-guide.png";

const InfoDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>How to Use the Video Player</DialogTitle>
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

        <Divider style={{ margin: "1rem 0" }} />

        <Grid2 item xs={6}>
          <Typography variant="h6" gutterBottom>
            Visual Guide
          </Typography>
        </Grid2>

        <Grid2 item xs={6} style={{ textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            <img
              src={visualGuide}
              alt="Visual Guide"
              style={{ width: "80%" }}
            />
          </Typography>
        </Grid2>

        <Grid2 container direction="row" spacing={2} justifyContent={"center"} marginTop={2}>
        <Grid2 item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              {/* <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Video title</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Add bookmark</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Rewind</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>Play/Pause</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>Fast forawrd</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6</TableCell>
                  <TableCell>Progress bar</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>

        <Grid2 item xs={12}>
          <TableContainer component={Paper}>
            <Table>
            {/* <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                <TableRow>
                  <TableCell>7</TableCell>
                  <TableCell>Play/Pause</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>8</TableCell>
                  <TableCell>Mute/Unmute</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>9</TableCell>
                  <TableCell>Volume slider</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10</TableCell>
                  <TableCell>Time display</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>11</TableCell>
                  <TableCell>Full screen</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
        </Grid2>
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
