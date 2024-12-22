import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";
import About from "./components/about";

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
    <Router>
      <ThemeProvider>
        <TopBar onFileSubmit={handleFileSubmit} />
        <Toolbar />
        <Routes>
          <Route path="/" element={<VideoPlayer source={videoSource} title={videoTitle} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;