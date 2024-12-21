import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "../global.css";
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { useTheme } from "@mui/material/styles";

const DragDropZone = ({ onFileDrop }) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        onFileDrop(file);
      } else {
        alert("Please drop a valid video file.");
      }
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: isDragging ? "2px dashed #3f51b5" : "2px dashed #cccccc",
        borderRadius: "8px",
        padding: "60px 0",
        textAlign: "center",
        backgroundColor: isDragging ? theme.palette.action.hover : "transparent",
        transition: "background-color 0.3s, border-color 0.3s",
        cursor: "pointer",
        width: "100%",
        height: "100%",
      }}
    >
        <VideoFileIcon sx={{ fontSize: 100, color: isDragging ? "#3f51b5" : "#cccccc" }} />
      <Typography variant="body1" color={isDragging ? "primary" : "textSecondary"}>
        Drag and drop your video file here, or click to browse
      </Typography>
    </Box>
  );
};

export default DragDropZone;
