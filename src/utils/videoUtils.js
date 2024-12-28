const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Check if a URL is a YouTube URL
const isYoutubeUrl = (url) => /youtube\.com|youtu\.be/.test(url);

// Get the title of a YouTube video
const getYoutubeVideoTitle = async (url) => {
  return new Promise((resolve, reject) => {
    const videoId = getYoutubeVideoId(url);
    const kind = detectKind(url);

    let apiUrl;

    switch (kind) {
      case "youtube#video":
        apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
        break;

      case "youtube#channel":
        apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
        break;

      case "youtube#playlist":
        apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
        break;

      default:
        return reject(new Error("Invalid or unsupported YouTube URL."));
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const title = data.items[0].snippet.title;
          resolve(title);
        } else {
          reject(new Error("Title not found."));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Helper function to extract item ID from a YouTube URL
const getYoutubeVideoId = (url) => {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  if (videoId) return videoId;
  if (urlObj.hostname === "youtu.be") return urlObj.pathname.substring(1);

  const pathSegments = urlObj.pathname.split("/");
  if (pathSegments.includes("channel"))
    return pathSegments[pathSegments.length - 1];
  if (pathSegments.includes("playlist")) return urlObj.searchParams.get("list");

  throw new Error("Invalid YouTube URL.");
};

// Helper function to extract playlist ID from a YouTube URL
const getYoutubePlaylistId = (url) => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/");
  if (pathSegments.includes("playlist")) return urlObj.searchParams.get("list");
  return null;
};

// Helper function to detect the kind of YouTube item
const detectKind = (url) => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/");

  if (pathSegments.includes("channel")) return "youtube#channel";
  if (pathSegments.includes("playlist")) return "youtube#playlist";
  // if (urlObj.searchParams.get("v")) return "youtube#video";

  return "youtube#video";
};

// Get the thumbnail of a video
const getVideoThumbnail = async (videoUrl) => {
  return new Promise((resolve, reject) => {
    if (isYoutubeUrl(videoUrl)) {
      // Handle YouTube video URLs
      try {
        const kind = detectKind(videoUrl);

        switch (kind) {
          case "youtube#video":
            const videoId = getYoutubeVideoId(videoUrl);
            resolve(`https://img.youtube.com/vi/${videoId}/0.jpg`);
            break;

          case "youtube#playlist":
            const playlistId = getYoutubePlaylistId(videoUrl);
            fetch(
              `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Error fetching playlist data: ${response.statusText}`
                  );
                }
                return response.json();
              })
              .then((data) => {
                if (data.items && data.items.length > 0) {
                  resolve(data.items[0].snippet.thumbnails.default.url);
                } else {
                  reject(new Error("Thumbnail not found for the playlist."));
                }
              })
              .catch((error) => {
                reject(error);
              });
            break;

          default:
            reject(new Error("Unsupported YouTube URL type."));
        }
      } catch (error) {
        reject(error);
      }
    } else {
      // Handle non-YouTube video files
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.addEventListener("loadeddata", () => {
        video.currentTime = 2;
      });

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, "image/jpeg");
      });

      video.addEventListener("error", (e) => {
        reject(e);
      });
    }
  });
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
  isYoutubeUrl,
  getYoutubeVideoTitle,
  getYoutubeVideoId,
  getYoutubePlaylistId,
  detectKind,
  getVideoThumbnail,
  searchYouTube,
  truncateTitle,
};
