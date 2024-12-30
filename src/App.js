import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import VideoPlayer from "./components/videoPlayer";
import { ThemeProvider } from "./context/themeContext";
import { VideoProvider, useVideoContext } from "./context/videoContext";
import TopBar from "./components/topBar";
import About from "./pages/about";
import { SnackbarProvider } from "./context/snackbarProvider";
import { ConfirmProvider } from "./context/confirmProvider";

function AppContent() {
  const {
    videoSource,
    videoTitle,
    bookmarks,
    recentVideos,
    setVideoSource,
    deleteVideo,
    submitVideo,
  } = useVideoContext();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("recentVideos")) || [];
    if (storedVideos.length > 0) {
      const { url, title, bookmarks } = storedVideos[0];
      setVideoSource(url, title, bookmarks);
    }
  }, [setVideoSource]);

  return (
    <>
      <TopBar
        recentVideos={recentVideos}
        onRecentVideoSelect={(video) =>
          setVideoSource(video.url, video.title, video.bookmarks)
        }
        onDeleteVideo={deleteVideo}
        onFileSubmit={(file, url) => submitVideo(file, url)}
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
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SnackbarProvider>
          <ConfirmProvider>
            <VideoProvider>
              <AppContent />
            </VideoProvider>
          </ConfirmProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
