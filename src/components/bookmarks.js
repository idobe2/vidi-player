import React, { useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSnackbar } from "../context/snackbarProvider";
import "../global.css";

const Bookmarks = ({ bookmarks, format, onDelete, onSeek, onRename }) => {
  const showSnackbar = useSnackbar();
  const [editingValues, setEditingValues] = useState(
    bookmarks.map(
      (bookmark) => bookmark.title || `Bookmark at ${format(bookmark.time)}`
    )
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);

    if (selectedIndex !== index) {
      setSelectedIndex(index)
      setIsEditing(false);
    }
    // setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedIndex(null);
  };

  const handleDeleteBookmark = () => {
    if (selectedIndex !== null) {
      onDelete(selectedIndex);
      showSnackbar("Bookmark deleted successfully!", "success");
    }
    handleMenuClose();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      const newTitle = editingValues[index];
      onRename(index, newTitle);
      showSnackbar("Bookmark renamed successfully!", "success");
      event.preventDefault();
      setIsEditing(false);
    }
  };

  const handleInputChange = (event, index) => {
    const newValues = [...editingValues];
    newValues[index] = event.target.value;
    setEditingValues(newValues);
  };

  const handleRenameClick = () => {
    setIsEditing(true);
    handleMenuClose();
    showSnackbar("Press Enter to save the new title", "info");
  };

  // React Slick settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <Slider {...settings}>
        {bookmarks.map((bookmark, index) => (
          <Box key={index} sx={{ px: 2, pb: 2, pt: 2 }}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="120"
                image={bookmark.image}
                alt={`Bookmark at ${format(bookmark.time)}`}
                onClick={() => onSeek(bookmark.time)}
                sx={{ cursor: "pointer" }}
              />
              <CardContent sx={{ padding: 1, marginBottom: -2 }}>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  defaultValue={
                    bookmark.title || `Bookmark at ${format(bookmark.time)}`
                  }
                  value={editingValues[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index, e.target.value)}
                  disabled={selectedIndex !== index || !isEditing}
                  style={{ padding: 0 }}
                />
                <IconButton
                  onClick={(event) => handleMenuOpen(event, index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 0,
                    zIndex: 1,
                    color: "black",
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleDeleteBookmark}>Delete</MenuItem>
                  <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Bookmarks;
