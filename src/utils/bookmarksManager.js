// Add a bookmark to the list
export const addBookmark = (
  bookmark,
  bookmarks,
  recentVideos,
  videoSource,
  setBookmarks,
  setRecentVideos
) => {
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

// Rename a bookmark in the list
export const renameBookmark = (
  index,
  newTitle,
  bookmarks,
  recentVideos,
  videoSource,
  setBookmarks,
  setRecentVideos
) => {
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

// Delete a bookmark from the list
export const deleteBookmark = (
  index,
  bookmarks,
  recentVideos,
  videoSource,
  setBookmarks,
  setRecentVideos
) => {
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

export const changeBookmarkIndex = (
  index,
  direction,
  bookmarks,
  recentVideos,
  videoSource,
  setBookmarks,
  setRecentVideos
) => {
  const newIndex = index + direction;

  if (newIndex < 0 || newIndex >= bookmarks.length) {
    console.warn("Index out of bounds");
    return;
  }

  const updatedBookmarks = [...bookmarks];
  const [movedBookmark] = updatedBookmarks.splice(index, 1);
  updatedBookmarks.splice(newIndex, 0, movedBookmark);

  setBookmarks(updatedBookmarks);

  const updatedVideos = recentVideos.map((video) =>
    video.url === videoSource
      ? { ...video, bookmarks: updatedBookmarks }
      : video
  );

  setRecentVideos(updatedVideos);
  localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
};
