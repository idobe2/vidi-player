import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "../context/themeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const TopBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          React Video Player
        </Typography>
        <Button color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon fontSize="large" /> : <DarkModeIcon fontSize="large" />}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
