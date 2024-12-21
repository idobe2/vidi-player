import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#7f00ff" : "#007fff", // Light and dark mode primary color
      },
      secondary: {
        main: isDarkMode ? "#bf80ff" : "#d32f2f", // Light and dark mode secondary color
      },
      background: {
        default: isDarkMode ? "#121212" : "#ffffff", // Background color for dark/light
        paper: isDarkMode ? "#212121" : "#f5f5f5", // Card or container background
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000", // Default text color
        secondary: isDarkMode ? "#bbbbbb" : "#333333", // Muted text color
      },
    },
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
