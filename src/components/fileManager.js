import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";
import "../global.css";
import DragDropZone from "./dragDropZone";
import CloseIcon from '@mui/icons-material/Close';

const FileManager = ({ open, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileDrop = (droppedFile) => {
    setFile(droppedFile);
    setUrl("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setUrl("");
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setFile(null);
  };

  const handleSubmit = () => {
    if (file || (url && isValidUrl(url))) {
      onSubmit(file, url);
      onClose();
      setFile(null);
    } else {
      alert("Please provide a video file or URL.");
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          width: "100%",
          height: "80%",
        },
      }}
    >
      <DialogTitle>
        <Grid2 container direction="row" justifyContent="space-between">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
        Upload Video
      </Typography>
      </Grid2>
      <Grid2 item style={{ position: "absolute", right: 5, top: 5 }}>
        <Button onClick={onClose} color="secondary">
      <CloseIcon fontSize="large" />
      </Button>
      </Grid2>
        </DialogTitle>
      <DialogContent>
        <Grid2 container direction="row" spacing={2} alignItems="center">
          <Grid2 item>
            <Typography variant="body1" gutterBottom>
              Upload a video file or enter a video URL:
            </Typography>
          </Grid2>

          <DragDropZone onFileDrop={handleFileDrop} />
          <input
            accept="video/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2
          container
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Grid2 item style={{ width: "30%", marginTop: 16 }}>
            <label htmlFor="upload-button">
              <Button variant="contained" component="span" fullWidth>
                Choose File
              </Button>
            </label>
          </Grid2>

          <Grid2 item style={{ width: "30%", marginTop: 16 }}>
            <Button
              variant="contained"
              onClick={() => setFile(null)}
              fullWidth
              disabled={!file}
              color="secondary">
              Clear
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 item>
          <TextField
            fullWidth
            label="Video URL"
            value={url}
            onChange={handleUrlChange}
            margin="normal"
            disabled={file}
          />
        </Grid2>

        <Grid2 item>
            {file && (
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ marginTop: 16 }}
              >
                Selected File: {file.name}
              </Typography>
            )}
          </Grid2>
          
      </DialogContent>
      <DialogActions>
        <Grid2 container direction="row" justifyContent="space-between" spacing={1}>
        <Grid2 item>
        <Button onClick={onClose} color="secondary" size="large">
          Cancel
        </Button>
        </Grid2>
        <Grid2 item>
        <Button onClick={handleSubmit} color="primary" size="large">
          Submit
        </Button>
        </Grid2>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
};

export default FileManager;
