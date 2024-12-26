import {
  getVideoThumbnail,
  getYoutubeVideoTitle,
  isYoutubeUrl,
  getYoutubeVideoId,
} from "../utils/videoUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Process a file input
const processFileInput = async (file) => {
  const videoUrl = URL.createObjectURL(file);
  const thumbnail = await getVideoThumbnail(videoUrl);
  return {
    title: file.name,
    url: videoUrl,
    thumbnail,
  };
};

// Process a URL input
const processUrlInput = async (url) => {
  if (isYoutubeUrl(url)) {
    const videoId = getYoutubeVideoId(url);
    const embedUrl =
      "https://www.youtube.com/embed/" +
      videoId +
      "?showinfo=0&enablejsapi=1&origin=" +
      BASE_URL;
    const title = await getYoutubeVideoTitle(url);
    return {
      title,
      url: embedUrl,
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    };
  } else {
    const title = url.split("/").pop();
    const thumbnail = await getVideoThumbnail(url);
    return {
      title,
      url,
      thumbnail,
    };
  }
};

// Main function: Handle file or URL submission
const handleFileSubmit = async (
  file,
  url,
  recentVideos,
  setRecentVideos,
  setVideoSource,
  setVideoTitle,
  setBookmarks
) => {
  let newVideo;

  if (file) {
    newVideo = await processFileInput(file);
  } else if (url) {
    newVideo = await processUrlInput(url);
  } else {
    console.error("No valid input provided to handleFileSubmit.");
    return;
  }

  // Update state
  setVideoSource(newVideo.url);
  setVideoTitle(newVideo.title);
  setBookmarks([]);

  // Add to recent videos if not already present
  if (!recentVideos.some((video) => video.url === newVideo.url)) {
    setRecentVideos((prevVideos) => {
      const updatedVideos = [newVideo, ...prevVideos];
      localStorage.setItem("recentVideos", JSON.stringify(updatedVideos));
      return updatedVideos;
    });
  }
};

export {
  isYoutubeUrl,
  getYoutubeVideoId,
  processFileInput,
  processUrlInput,
  handleFileSubmit,
};
