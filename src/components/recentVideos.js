import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  CardMedia,
  Divider,
} from "@mui/material";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import DeleteIcon from "@mui/icons-material/Delete";
import { truncateTitle } from "../utils/videoUtils";

const RecentVideos = ({ recentVideos, onVideoSelect, onDeleteVideo }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <BrowseGalleryIcon fontSize="large" />
      </IconButton>
      <Menu
        id="recent-videos-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ maxHeight: 500, overflowY: "auto" }}
      >
        {recentVideos.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">No recent videos</Typography>
          </MenuItem>
        ) : (
          recentVideos.map((video, index) => (
            <div key={index}>
              <MenuItem
                key={index}
                onClick={() => onVideoSelect(video)}
                style={{
                  paddingRight: 0,
                  paddingLeft: 5,
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
              >
                <CardMedia
                  component="img"
                  image={video.thumbnail}
                  alt={video.title}
                  style={{ marginRight: 8, width: 100, height: 60 }}
                />
                <Typography variant="body2">
                  {truncateTitle(video.title, 40)}
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteVideo(index)}
                  style={{ marginLeft: "auto" }}
                >
                  <DeleteIcon />
                </IconButton>
              </MenuItem>
              {index < recentVideos.length - 1 && <Divider />}
            </div>
          ))
        )}
      </Menu>
    </div>
  );
};

export default RecentVideos;
