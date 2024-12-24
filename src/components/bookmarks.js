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

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
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
    }
  };

  const handleInputChange = (event, index) => {
    const newValues = [...editingValues];
    newValues[index] = event.target.value;
    setEditingValues(newValues);
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
    <Box sx={{ width: "100%", mt: 3 }}>
      <Slider {...settings}>
        {bookmarks.map((bookmark, index) => (
          <Box key={index} sx={{ px: 2 }}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="140"
                image={bookmark.image}
                alt={`Bookmark at ${format(bookmark.time)}`}
                onClick={() => onSeek(bookmark.time)}
                sx={{ cursor: "pointer" }}
              />
              <CardContent>
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
                <IconButton
                  onClick={(event) => handleMenuOpen(event, index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    color: "#555",
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
                  <MenuItem onClick={handleDeleteBookmark}>
                    Delete Bookmark
                  </MenuItem>
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
