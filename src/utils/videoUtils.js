import axios from 'axios';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

const parseYoutubeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    const listId = urlObj.searchParams.get("list");
    const pathSegments = urlObj.pathname.split("/");

    if (pathSegments.includes("channel")) {
      return { kind: "channel", id: pathSegments[pathSegments.length - 1] };
    }
    if (listId) {
      return { kind: "playlist", id: listId };
    }
    if (videoId || urlObj.hostname === "youtu.be") {
      return { kind: "video", id: videoId || urlObj.pathname.substring(1) };
    }
    throw new Error("Invalid YouTube URL.");
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return { kind: null, id: null };
  }
};

const fetchYoutubeData = async (kind, id) => {
  const apiUrlMap = {
    video: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${GOOGLE_API_KEY}`,
    playlist: `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${GOOGLE_API_KEY}`,
    channel: `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${GOOGLE_API_KEY}`,
  };

  const apiUrl = apiUrlMap[kind];
  if (!apiUrl) throw new Error("Unsupported YouTube data kind.");

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.items?.length > 0) {
      const snippet = data.items[0].snippet;
      return {
        title: snippet.title,
        thumbnail: snippet.thumbnails?.default?.url || null,
      };
    } else {
      throw new Error("No data found for YouTube ID.");
    }
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    throw error;
  }
};

const fetchVideoThumbnail = async (videoUrl) => {
  if (/youtube\.com|youtu\.be/.test(videoUrl)) {
    const { kind, id } = parseYoutubeUrl(videoUrl);
    if (kind === "video") {
      return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.addEventListener("loadeddata", () => (video.currentTime = 2));
    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/jpeg");
    });
    video.addEventListener("error", (e) => reject(e));
  });
};

export const fetchPlaylistItems = async (playlistId) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        maxResults: 10,
        playlistId,
        key: GOOGLE_API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return [];
  }
};

// Search YouTube for videos, playlists, and channels
const searchYouTube = async (query) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        query
      )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const results = data.items.map((item) => {
            const { kind } = item.id;
            const commonData = {
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnail: item.snippet.thumbnails.default.url,
            };

            switch (kind) {
              case "youtube#channel":
                return {
                  ...commonData,
                  title: item.snippet.channelTitle,
                  channelId: item.id.channelId,
                  url: `https://www.youtube.com/channel/${item.id.channelId}`,
                  type: "Channel",
                };

              case "youtube#playlist":
                return {
                  ...commonData,
                  playlistId: item.id.playlistId,
                  url: `https://www.youtube.com/playlist?list=${item.id.playlistId}`,
                  type: "Playlist",
                };

              case "youtube#video":
                return {
                  ...commonData,
                  videoId: item.id.videoId,
                  url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                  type: "Video",
                };

              default:
                console.warn("Unknown kind:", kind);
                return null;
            }
          });

          // Filter out any null results from unknown kinds
          const filteredResults = results.filter((result) => result !== null);
          resolve(filteredResults);
        } else {
          reject(new Error("No items found."));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
};

const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength - 3) + "...";
  }
  return title;
};

export {
  searchYouTube,
  truncateTitle,
  parseYoutubeUrl,
  fetchYoutubeData,
  fetchVideoThumbnail,
};
