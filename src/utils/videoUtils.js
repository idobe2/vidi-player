export const getVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        // Use a placeholder thumbnail for YouTube videos
        resolve("https://img.icons8.com/color/48/000000/youtube-play.png");
      } else {
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