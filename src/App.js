import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";
import About from "./pages/about";
import { getVideoThumbnail } from "./utils/videoUtils";
import { SnackbarProvider } from "./context/snackbarProvider";
import { ConfirmProvider } from "./context/confirmProvider";

function App() {
  const [videoSource, setVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("Video");
  const [recentVideos, setRecentVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("recentVideos")) || [];
    console.log("Stored videos:", storedVideos);
    setRecentVideos(storedVideos);
    if (storedVideos.length > 0) {
      setVideoSource(storedVideos[0].url);
      setVideoTitle(storedVideos[0].title);
      setBookmarks(storedVideos[0].bookmarks || []);
    }
  }, []);

  useEffect(() => {
    if (recentVideos.length > 0) {
      localStorage.setItem("recentVideos", JSON.stringify(recentVideos));
      console.log("Updated recentVideos in localStorage:", recentVideos);
    }
  }, [recentVideos]);

  /* File handling */
  const handleFileSubmit = async (file, url) => {
    let newVideo = {};
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const thumbnail = await getVideoThumbnail(videoUrl);
      newVideo = { title: file.name, url: videoUrl, thumbnail };
      setVideoSource(videoUrl);
      setVideoTitle(file.name);
    } else if (url) {
      const thumbnail = await getVideoThumbnail(url);
      const title = url.split("/").pop();
      newVideo = { title, url, thumbnail };
      setVideoSource(url);
      setVideoTitle(title);

      if (!recentVideos.some((video) => video.url === url)) {
        setRecentVideos((prevVideos) => {
          const updatedVideos = [newVideo, ...prevVideos];
          localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
          return updatedVideos;
        });
      }
    }
    setBookmarks([]);
  };

  const handleVideoSelect = (video) => {
    setVideoSource(video.url);
    setVideoTitle(video.title);
    setBookmarks(video.bookmarks || []);
  };

  const handleDeleteVideo = (index) => {
    setRecentVideos((prevVideos) => {
      const updatedVideos = prevVideos.filter((_, i) => i !== index);
      localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
      return updatedVideos;
    });
  };

  /* Bookmark handling */
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

  const handleRenameBookmark = (index, newTitle) => {
    const updatedBookmarks = bookmarks.map((bookmark, i) =>
      i === index ? { ...bookmark, title: newTitle } : bookmark
    );
    setBookmarks(updatedBookmarks);
    const updatedVideos = recentVideos.map((video) =>
      video.url === videoSource
        ? { ...video, bookmarks: updatedBookmarks }
        : video
    );
    setRecentVideos(updatedVideos);
    localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
  };

  const handleDeleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    const updatedVideos = recentVideos.map((video) =>
      video.url === videoSource
        ? { ...video, bookmarks: updatedBookmarks }
        : video
    );
    setRecentVideos(updatedVideos);
    localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
  };

  return (
    <Router>
      <ThemeProvider>
      <SnackbarProvider>
        <ConfirmProvider>
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
                onRenameBookmark={handleRenameBookmark}
                onDeleteBookmark={handleDeleteBookmark}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        </ConfirmProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
