import {
  parseYoutubeUrl,
  fetchYoutubeData,
  fetchVideoThumbnail,
} from "../utils/videoUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const processFileInput = async (file) => {
  const videoUrl = URL.createObjectURL(file);
  const thumbnail = await fetchVideoThumbnail(videoUrl);
  return {
    title: file.name,
    url: videoUrl,
    thumbnail,
  };
};

export const processUrlInput = async (url) => {
  const { kind, id } = parseYoutubeUrl(url);
  if (kind) {
    const youtubeData = await fetchYoutubeData(kind, id);
    const embedUrl =
      kind === "video"
        ? `https://www.youtube.com/embed/${id}?showinfo=0&enablejsapi=1&origin=${BASE_URL}`
        : `https://www.youtube.com/embed/videoseries?list=${id}`;

    return {
      title: youtubeData.title,
      url: embedUrl,
      thumbnail: youtubeData.thumbnail,
    };
  } else {
    const title = url.split("/").pop();
    const thumbnail = await fetchVideoThumbnail(url);
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
  console.log("New video added: ", newVideo);
};
