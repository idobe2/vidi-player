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
  Divider,
} from "@mui/material";
import "../global.css";
import DragDropZone from "../components/dragDropZone";
import CloseIcon from "@mui/icons-material/Close";

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
      setUrl("");
    } else {
      alert("Please provide a video file or URL.");
    }
  };

  const handleCancel = () => {
    if (file) {
      if (
        window.confirm(
          "You have selected a file. You will need to upload it again later if you cancel. Do you want to proceed?"
        )
      ) {
        setFile(null);
        setUrl("");
        onClose();
      }
    } else {
      onClose();
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
      onClose={handleCancel}
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
          <Button onClick={handleCancel} color="secondary">
            <CloseIcon fontSize="large" />
          </Button>
        </Grid2>
      </DialogTitle>
      <DialogContent dividers>
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

        <Grid2 container direction="row" spacing={2} alignItems="center">
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
              color="secondary"
            >
              Clear
            </Button>
          </Grid2>
        </Grid2>

        <Divider style={{ margin: "1rem 0" }} />

        <Grid2 item>
          <TextField
            fullWidth
            label="Video URL"
            value={url}
            onChange={handleUrlChange}
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
        <Grid2
          container
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Grid2 item>
            <Button onClick={handleCancel} color="secondary" size="large">
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
