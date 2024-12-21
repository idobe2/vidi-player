import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";

function App() {
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("Default Video");


  const handleFileSubmit = (file, url) => {
    if (file) {
      setVideoSource(URL.createObjectURL(file));
      setVideoTitle(file.name);
    } else if (url) {
      setVideoSource(url);
      const urlParts = url.split("/");
      setVideoTitle(urlParts[urlParts.length - 1]);
    }
  };

  return (
    <>
      <ThemeProvider>
      <TopBar onFileSubmit={handleFileSubmit} />
        <Toolbar />
        <VideoPlayer source={videoSource} title={videoTitle} />
      </ThemeProvider>
    </>
  );
}

export default App;
