import React, { useState, useRef } from "react";
import {
  Container,
  Grid2,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import ReactPlayer from "react-player";
import "../global.css";
import PlayerControls from "./playerControls";
import screenfull from "screenfull";
import DeleteIcon from "@mui/icons-material/Delete";

let count = 0;

function VideoPlayer({ source, title }) {
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
    if (source.includes("youtube.com") || source.includes("youtu.be")) {
      alert("Bookmarks are not supported for YouTube videos.");
      return;
    }
    const canvas = canvasRef.current;
    const videoWidth = playerRef.current.getInternalPlayer().videoWidth / 2;
    const videoHeight = playerRef.current.getInternalPlayer().videoHeight / 2;
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

  const deleteBookmark = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
  };

  const renameBookmark = (index, newTitle) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark, i) =>
        i === index ? { ...bookmark, title: newTitle } : bookmark
      )
    );
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const handleDoubleClick = () => {
    screenfull.toggle(playerContainerRef.current);
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
        onDoubleClick={handleDoubleClick}
      >
        <ReactPlayer
          ref={playerRef}
          width={"100%"}
          height={"100%"}
          url={
            source ||
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          }
          muted={muted}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onEnded={handlePlayPause}
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
          title={title}
        />
      </div>

      <Grid2 container style={{ marginTop: 20 }} spacing={3}>
        {bookmarks.map((bookmark, index) => (
          <Grid2 item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="80"
                image={bookmark.image}
                alt={`Bookmark at ${format(bookmark.time)}`}
                onClick={() => playerRef.current.seekTo(bookmark.time)}
              />
              <CardContent
                style={{
                  marginBottom: -20,
                  marginTop: -10,
                  paddingLeft: 5,
                  paddingRight: 0,
                }}
              >
                <Grid2 container direction={"row"} alignItems={"center"}>
                  <Grid2 item xs={8} style={{ width: "80%" }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={`Bookmark at ${format(bookmark.time)}`}
                      onChange={(e) => renameBookmark(index, e.target.value)}
                    />
                  </Grid2>

                  <Grid2 item style={{ marginRight: -15 }}>
                    <IconButton
                      fontSize="small"
                      aria-label="delete"
                      onClick={() => deleteBookmark(index)}
                      sx={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <canvas ref={canvasRef} />
      {/* Footer */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginTop: "2rem" }}
      >
        © {new Date().getFullYear()} Vi-Di Player. All rights reserved.
      </Typography>
    </Container>
  );
}

export default VideoPlayer;
