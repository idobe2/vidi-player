import React, { useState, useRef } from "react";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import "../global.css";
import PlayerControls from "./playerControls";
import screenfull from "screenfull";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

let count = 0;

function VideoPlayer() {
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [bookmarks, setBookmarks] = useState([]);

  const format = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const { playing, muted, volume, playbackRate, played } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handlePlaybackrateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
    playerRef.current.playbackRate = rate;
  };

  const handleProgress = (changeState) => {
    console.log(changeState);

    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }

    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!state.seeking) {
      setState({ ...state, played: changeState.played });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleChangeDispayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;
    const { videoWidth, videoHeight } = playerRef.current.getInternalPlayer();
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageUrl = canvas.toDataURL();
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    setBookmarks([
      ...bookmarks,
      { time: currentTime, disply: elapsedTime, image: imageUrl },
    ]);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  return (
    <Container maxWidth="md">
      <div
        ref={playerContainerRef}
        className="playerWrapper"
        onMouseMove={handleMouseMove}
      >
        <ReactPlayer
          ref={playerRef}
          width={"100%"}
          height={"100%"}
          url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          muted={muted}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
            },
          }}
        />
        <PlayerControls
          ref={controlsRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          volume={volume}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackrateChange}
          onToggleFullScreen={toggleFullScreen}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onChangeDispayFormat={handleChangeDispayFormat}
          onBookmark={addBookmark}
        />
      </div>

      <Grid2 container style={{ marginTop: 20 }} spacing={3}>
        {bookmarks.map((bookmark, index) => (
          <Grid2 item key={index}>
            <Paper onClick={() => playerRef.current.seekTo(bookmark.time)}>
              <img
                crossOrigin="anonymous"
                src={bookmark.image}
                alt={`Bookmark at ${format(bookmark.time)}`}
                style={{ width: 150 }}
              />
              <Typography>Bookmark at {format(bookmark.time)}</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      <canvas ref={canvasRef} />
    </Container>
  );
}

export default VideoPlayer;
