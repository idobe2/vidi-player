import React from "react";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";

function App() {
  return (
    <>
      <ThemeProvider>
        <TopBar />
        <Toolbar />
        <VideoPlayer />
      </ThemeProvider>
    </>
  );
}

export default App;
