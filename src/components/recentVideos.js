import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import "../global.css";

const RecentVideos = ({ recentVideos, onVideoSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + '...';
    }
    return title;
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="recent-videos-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <BrowseGalleryIcon fontSize="large"/>
      </IconButton>
      <Menu
        id="recent-videos-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {recentVideos.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">No recent videos</Typography>
          </MenuItem>
        ) : (
          recentVideos.map((video, index) => (
            <MenuItem key={index} onClick={() => onVideoSelect(video)}>
              <CardMedia
                component="img"
                width="60px"
                height="40px"
                image={video.thumbnail}
                alt={video.title}
                style={{ marginRight: 8 }}
              />
              <Typography variant="body2">{truncateTitle(video.title, 40)}</Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default RecentVideos;