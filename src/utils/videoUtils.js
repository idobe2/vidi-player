const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const isYoutubeUrl = (url) => /youtube\.com|youtu\.be/.test(url);

export const getYoutubeVideoId = (url) => {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

export const getVideoThumbnail = (videoUrl) => {
  return new Promise((resolve, reject) => {
    // Get the thumbnail of a YouTube video
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      resolve(
        `https://img.youtube.com/vi/${getYoutubeVideoId(videoUrl)}/0.jpg`
      );
    }

    // Get the thumbnail of a video file
    else {
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

export const getYoutubeVideoTitle = (url) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getYoutubeVideoId(
        url
      )}&key=${GOOGLE_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching video title: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const title = data.items[0].snippet.title;
          console.log(`Video title: ${title}`);
          resolve(title);
        } else {
          reject(new Error("Video title not found."));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchYouTube = (query) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        query
      )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => {
        console.log("Response received:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data parsed:", data);
        if (data.items && data.items.length > 0) {
          const results = data.items.map((item) => ({
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
            videoId: item.id.videoId,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          }));
          console.log("Results:", results);
          resolve(results);
        } else {
          console.log("No videos found.");
          reject(new Error("No videos found."));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
};
