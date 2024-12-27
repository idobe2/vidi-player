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
  Button,
  Grow,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { useSnackbar } from "../context/snackbarProvider";
import "../global.css";

const Bookmarks = ({
  bookmarks,
  format,
  onDelete,
  onSeek,
  onRename,
  onChangeIndex,
}) => {
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
      setSelectedIndex(index);
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

  const handleIndexChange = (direction) => {
    console.log("index:", selectedIndex, direction);
    onChangeIndex(selectedIndex, direction);
    handleMenuClose();
  };

  // React Slick settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <Slider {...settings}>
        {bookmarks.map((bookmark, index) => (
          <Box key={index} sx={{ px: 2, pb: 2, pt: 2 }}>
            <Grow in={true} timeout={600}>
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
                    <MenuItem>
                      <Button
                        style={{ padding: 0 }}
                        onClick={() => handleIndexChange(-1)}
                        disabled={selectedIndex === 0}
                      >
                        <ArrowLeftIcon fontSize="large" />
                      </Button>
                      <Button
                        style={{ padding: 0 }}
                        onClick={() => handleIndexChange(1)}
                        disabled={selectedIndex === bookmarks.length - 1}
                      >
                        <ArrowRightIcon fontSize="large" />
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteBookmark}>Delete</MenuItem>
                    <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
                  </Menu>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Bookmarks;
