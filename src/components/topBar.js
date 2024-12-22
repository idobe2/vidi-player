import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileManager from "./fileManager";

const TopBar = ({ onFileSubmit }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fileManagerOpen, setFileManagerOpen] = useState(false);

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
