import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";
import About from "./components/about";
import { getVideoThumbnail } from "./utils/videoUtils";

function App() {
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("Video");
  const [recentVideos, setRecentVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("recentVideos")) || [];
    setRecentVideos(storedVideos);
    if (storedVideos.length > 0) {
      setVideoSource(storedVideos[0].url);
      setVideoTitle(storedVideos[0].title);
      setBookmarks(storedVideos[0].bookmarks || []);
    }
  }, []);

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
    setBookmarks([]);
  };

  const handleVideoSelect = (video) => {
    setVideoSource(video.url);
    setVideoTitle(video.title);
    setBookmarks(video.bookmarks || []);
  };

  const handleAddBookmark = (bookmark) => {
    const updatedBookmarks = [...bookmarks, bookmark];
    setBookmarks(updatedBookmarks);
    const updatedVideos = recentVideos.map((video) =>
      video.url === videoSource
        ? { ...video, bookmarks: updatedBookmarks }
        : video
    );
    setRecentVideos(updatedVideos);
    localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = recentVideos.filter((_, i) => i !== index);
    setRecentVideos(updatedVideos);
    localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
  };

  return (
    <Router>
      <ThemeProvider>
        <TopBar
          onFileSubmit={handleFileSubmit}
          recentVideos={recentVideos}
          onRecentVideoSelect={handleVideoSelect}
          onDeleteVideo={handleDeleteVideo}
        />
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <VideoPlayer
                source={videoSource}
                title={videoTitle}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                onAddBookmark={handleAddBookmark}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
