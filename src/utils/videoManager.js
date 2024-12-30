import {
  getVideoThumbnail,
  getYoutubeVideoTitle,
  isYoutubeUrl,
  getYoutubeVideoId,
  getYoutubePlaylistId,
  detectKind,
} from "../utils/videoUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const processFileInput = async (file) => {
  const videoUrl = URL.createObjectURL(file);
  const thumbnail = await getVideoThumbnail(videoUrl);
  return {
    title: file.name,
    url: videoUrl,
    thumbnail,
  };
};

export const processUrlInput = async (url) => {
  if (isYoutubeUrl(url)) {
    const kind = detectKind(url);

    let videoId;
    let embedUrl;
    let title;

    switch (kind) {
      case "youtube#video":
        videoId = getYoutubeVideoId(url);
        embedUrl = `https://www.youtube.com/embed/${videoId}?showinfo=0&enablejsapi=1&origin=${BASE_URL}`;
        title = await getYoutubeVideoTitle(url);
        break;

      case "youtube#playlist":
        videoId = getYoutubePlaylistId(url);
        embedUrl = `https://www.youtube.com/embed/videoseries?list=${videoId}`;
        title = await getYoutubeVideoTitle(url);
        break;

      default:
        throw new Error("Unsupported YouTube URL.");
    }

    return {
      title,
      url: embedUrl,
      thumbnail:
        kind === "youtube#video"
          ? `https://img.youtube.com/vi/${videoId}/0.jpg`
          : null,
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

export const handleFileSubmit = async (
  file,
  url,
  setVideoSource,
  addRecentVideo
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

  setVideoSource(newVideo.url, newVideo.title, []);
  addRecentVideo(newVideo);
};
