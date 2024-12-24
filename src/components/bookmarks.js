import React, { useState } from "react";
import {
  Grid2,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Bookmarks = ({ bookmarks, format, onDelete, onSeek, onRename }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editingValues, setEditingValues] = useState(
    bookmarks.map(
      (bookmark) => bookmark.title || `Bookmark at ${format(bookmark.time)}`
    )
  );

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      const newTitle = editingValues[index];
      onRename(index, newTitle);
      setSnackbarOpen(true);
      event.preventDefault();
    }
  };

  const handleInputChange = (event, index) => {
    const newValues = [...editingValues];
    newValues[index] = event.target.value;
    setEditingValues(newValues);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid2 container spacing={3} style={{ marginTop: 20 }}>
      {bookmarks.map((bookmark, index) => (
        <Grid2 key={index} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              image={bookmark.image}
              alt={`Bookmark at ${format(bookmark.time)}`}
              onClick={() => onSeek(bookmark.time)}
              style={{ cursor: "pointer" }}
            />
            <CardContent
              style={{
                paddingLeft: 5,
                paddingRight: 0,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <Grid2 container direction="row" alignItems="center">
                <Grid2>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={
                      bookmark.title || `Bookmark at ${format(bookmark.time)}`
                    }
                    value={editingValues[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index, e.target.value)}
                  />
                </Grid2>
                <Grid2>
                  <IconButton
                    fontSize="small"
                    aria-label="delete"
                    onClick={() => onDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Auto close after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Bookmark renamed successfully!
        </Alert>
      </Snackbar>
    </Grid2>
  );
};

export default Bookmarks;
