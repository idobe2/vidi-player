import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import FileManager from "./fileManager";
import RecentVideos from "./recentVideos";
import Info from "./info";

const TopBar = ({ onFileSubmit, recentVideos, onRecentVideoSelect, onDeleteVideo }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fileManagerOpen, setFileManagerOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleOpenInfo = () => {
    setInfoOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  const handleVideoSelect = (video) => {
    onRecentVideoSelect(video);
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
            <Grid2 item>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Vi-Di Player
                </Link>
              </Typography>
            </Grid2>

            <Grid2 item>
              <Button
                color="inherit"
                onClick={() => {
                  setFileManagerOpen(true);
                }}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </Button>
            </Grid2>

            <Grid2 item>
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

              <Grid2 item>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
              </Grid2>

              <Grid2 item>
                <Button color="inherit" onClick={handleOpenInfo}>
                  <InfoIcon fontSize="large" />
                </Button>
                <Info open={infoOpen} onClose={handleCloseInfo} />
              </Grid2>

              <Grid2 item style={{}}>
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
