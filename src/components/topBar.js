import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid2,
} from "@mui/material";
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
import { searchYouTube, truncateTitle } from "../utils/videoUtils";
import { useSnackbar } from "../context/snackbarProvider";

const TopBar = ({
  onFileSubmit,
  recentVideos,
  onRecentVideoSelect,
  onDeleteVideo,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const showSnackbar = useSnackbar();

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
    searchYouTube(query)
      .then((results) => {
        console.log("Search results: ", results);
        setSearchResults(results);
        setAnchorEl(document.getElementById("search-button"));
      })
      .catch((error) => {
        console.error("Error searching YouTube: ", error);
      });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleResultSelect = (result) => {
    console.log("Selected search result: ", result);
    if (result.type !== "Channel") onFileSubmit(null, result.url);
    else showSnackbar("Channel URLs are not supported yet.", "info");
    handleCloseMenu();
  };

  const handleReload = () => {
    window.location.href = "/";
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
            style={{}}
          >
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              onClick={handleReload}
            >
              Vi-Di Player
            </Link>
          </Typography>
          <Grid2
            container
            direction="row"
            position="absolute"
            alignItems="center"
            sx={{ pl: { xs: 20, sm: 14 } }}
          >
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
          </Grid2>

          <Grid2 sx={{ mr: { xs: 14, sm: "auto" } }}>
            <SearchBar onSearch={handleSearch} />
          </Grid2>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {searchResults.map((result, index) => (
              <MenuItem key={index} onClick={() => handleResultSelect(result)}>
                <ListItemAvatar>
                  <Avatar src={result.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={result.title}
                  secondary={truncateTitle(result.description, 70)}
                />
              </MenuItem>
            ))}
          </Menu>
          <Grid2
            sx={{
              display: { xs: "none", sm: "block" },
              pr: { xs: "4%", sm: 0 },
            }}
          >
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
          </Grid2>
          <Button color="inherit" onClick={handleOpenInfo}>
            <InfoIcon fontSize="large" />
          </Button>
          <Info open={infoOpen} onClose={handleCloseInfo} />

          <Button color="inherit" onClick={toggleTheme}>
            {isDarkMode ? (
              <LightModeIcon fontSize="large" />
            ) : (
              <DarkModeIcon fontSize="large" />
            )}
          </Button>
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
