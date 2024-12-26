import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import TopBar from "./components/topBar";
import About from "./pages/about";
import { SnackbarProvider } from "./context/snackbarProvider";
import { ConfirmProvider } from "./context/confirmProvider";
import { handleFileSubmit } from "./utils/videoManager";
import {
  addBookmark,
  renameBookmark,
  deleteBookmark,
} from "./utils/bookmarksManager";

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
  const onFileSubmit = (file, url) => {
    handleFileSubmit(
      file,
      url,
      recentVideos,
      setRecentVideos,
      setVideoSource,
      setVideoTitle,
      setBookmarks
    );
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
    addBookmark(
      bookmark,
      bookmarks,
      recentVideos,
      videoSource,
      setBookmarks,
      setRecentVideos
    );
  };

  const handleRenameBookmark = (index, newTitle) => {
    renameBookmark(
      index,
      newTitle,
      bookmarks,
      recentVideos,
      videoSource,
      setBookmarks,
      setRecentVideos
    );
  };

  const handleDeleteBookmark = (index) => {
    deleteBookmark(
      index,
      bookmarks,
      recentVideos,
      videoSource,
      setBookmarks,
      setRecentVideos
    );
  };

  return (
    <Router>
      <ThemeProvider>
        <SnackbarProvider>
          <ConfirmProvider>
            <TopBar
              onFileSubmit={onFileSubmit}
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
