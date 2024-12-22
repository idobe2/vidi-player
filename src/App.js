import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";
import About from "./components/about";
import { getVideoThumbnail } from "./utils/videoUtils";

function App() {
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("Default Video");
  const [recentVideos, setRecentVideos] = useState([]);

  const handleFileSubmit = async (file, url) => {
    let newVideo = {};
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const thumbnail = await getVideoThumbnail(videoUrl);
      setVideoSource(videoUrl);
      setVideoTitle(file.name);
      newVideo = { title: file.name, url: videoUrl, thumbnail };
    } else if (url) {
      const thumbnail = await getVideoThumbnail(url);
      setVideoSource(url);
      const urlParts = url.split("/");
      const title = urlParts[urlParts.length - 1];
      setVideoTitle(title);
      newVideo = { title, url, thumbnail };
    }
    setRecentVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  const handleVideoSelect = (video) => {
    setVideoSource(video.url);
    setVideoTitle(video.title);
  };

  return (
    <Router>
      <ThemeProvider>
        <TopBar onFileSubmit={handleFileSubmit} recentVideos={recentVideos} onRecentVideoSelect={handleVideoSelect} />
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