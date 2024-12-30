import React, { useState, useContext, createContext, useCallback } from "react";
import { handleFileSubmit } from "../utils/videoManager";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [state, setState] = useState({
    videoSource: "",
    videoTitle: "Video",
    recentVideos: JSON.parse(localStorage.getItem("recentVideos")) || [],
    bookmarks: [],
  });

  const setVideoSource = useCallback((url, title, bookmarks = []) => {
    setState((prevState) => ({
      ...prevState,
      videoSource: url,
      videoTitle: title,
      bookmarks,
    }));
  }, []);

  const submitVideo = async (file, url) => {
    await handleFileSubmit(file, url, setVideoSource, addRecentVideo);
  };

  const syncBookmarksToRecentVideos = (updatedBookmarks) => {
    setState((prevState) => {
      const updatedVideos = prevState.recentVideos.map((video) =>
        video.url === prevState.videoSource
          ? { ...video, bookmarks: updatedBookmarks }
          : video
      );
      localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
      return { ...prevState, recentVideos: updatedVideos, bookmarks: updatedBookmarks };
    });
  };

  const addBookmark = (bookmark) => {
    const updatedBookmarks = [...state.bookmarks, bookmark];
    syncBookmarksToRecentVideos(updatedBookmarks);
  };

  const updateBookmarks = (newBookmarks) => {
    syncBookmarksToRecentVideos(newBookmarks);
  };

  const renameBookmark = (index, newTitle) => {
    const updatedBookmarks = state.bookmarks.map((bookmark, i) =>
      i === index ? { ...bookmark, title: newTitle } : bookmark
    );
    syncBookmarksToRecentVideos(updatedBookmarks);
  };

  const changeBookmarkIndex = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.bookmarks.length) return;

    const updatedBookmarks = [...state.bookmarks];
    const [movedBookmark] = updatedBookmarks.splice(index, 1);
    updatedBookmarks.splice(newIndex, 0, movedBookmark);

    syncBookmarksToRecentVideos(updatedBookmarks);
  };

  const addRecentVideo = (video) => {
    setState((prevState) => {
      const updatedVideos = [video, ...prevState.recentVideos];
      localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
      return { ...prevState, recentVideos: updatedVideos };
    });
  };

  const deleteVideo = (index) => {
    setState((prevState) => {
      const updatedVideos = prevState.recentVideos.filter((_, i) => i !== index);
      localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
      return { ...prevState, recentVideos: updatedVideos };
    });
  };

  return (
    <VideoContext.Provider
      value={{
        ...state,
        setVideoSource,
        addBookmark,
        updateBookmarks,
        addRecentVideo,
        deleteVideo,
        submitVideo,
        renameBookmark,
        changeBookmarkIndex,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  return useContext(VideoContext);
}
