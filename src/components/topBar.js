import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid2, Menu, MenuItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import FileManager from "../dialogs/fileManager";
import RecentVideos from "./recentVideos";
import Info from "../dialogs/info";
import SearchBar from "./searchBar";
import { searchYouTube } from "../utils/videoUtils";

const TopBar = ({
  onFileSubmit,
  recentVideos,
  onRecentVideoSelect,
  onDeleteVideo,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const [fileManagerOpen, setFileManagerOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleOpenInfo = () => {
    setInfoOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  const handleVideoSelect = (video) => {
    console.log("Selected video: ", video);
    onRecentVideoSelect(video);
  };

  const handleSearch = (query) => {
    console.log("Search query: ", query);
    searchYouTube(query)
      .then(results => {
        console.log("Search results: ", results);
        setSearchResults(results);
        setAnchorEl(document.getElementById('search-button'));
      })
      .catch(error => {
        console.error("Error searching YouTube: ", error);
      });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid2
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid2>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Vi-Di Player
                </Link>
              </Typography>
            </Grid2>

            <Grid2>
              <Button
                color="inherit"
                onClick={() => {
                  setFileManagerOpen(true);
                }}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </Button>
            </Grid2>

            <Grid2>
              <RecentVideos
                recentVideos={recentVideos}
                onVideoSelect={handleVideoSelect}
                onDeleteVideo={onDeleteVideo}
              />
            </Grid2>

            <Grid2
              container
              position="absolute"
              right="10px"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >

              <Grid2>
              <SearchBar onSearch={handleSearch} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {searchResults.map((result, index) => (
          <MenuItem key={index} onClick={() => handleVideoSelect(result)}>
            <ListItemAvatar>
              <Avatar src={result.thumbnail} />
            </ListItemAvatar>
            <ListItemText primary={result.title} secondary={result.description} />
          </MenuItem>
        ))}
      </Menu>
              </Grid2>

              <Grid2>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
              </Grid2>

              <Grid2>
                <Button color="inherit" onClick={handleOpenInfo}>
                  <InfoIcon fontSize="large" />
                </Button>
                <Info open={infoOpen} onClose={handleCloseInfo} />
              </Grid2>

              <Grid2 style={{}}>
                <Button color="inherit" onClick={toggleTheme}>
                  {isDarkMode ? (
                    <LightModeIcon fontSize="large" />
                  ) : (
                    <DarkModeIcon fontSize="large" />
                  )}
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
      <FileManager
        open={fileManagerOpen}
        onClose={() => setFileManagerOpen(false)}
        onSubmit={onFileSubmit}
      />
    </>
  );
};

export default TopBar;
