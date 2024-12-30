import React, { useState, useRef } from "react";
import { Container, Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import "../global.css";
import PlayerControls from "./playerControls";
import screenfull from "screenfull";
import Bookmarks from "./bookmarks";
import { useSnackbar } from "../context/snackbarProvider";
import { useKeyboardShortcut } from "../hooks/useKeyboardShortcut";

let count = 0;
let repeatFlag = false;

function VideoPlayer({
  source,
  title,
  bookmarks,
  setBookmarks,
  onAddBookmark,
  onRenameBookmark,
  onDeleteBookmark,
  onChangeBookmarkIndex,
}) {
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    repeat: "off",
  });

  const showSnackbar = useSnackbar();

  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");

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

  const { playing, muted, volume, playbackRate, played, repeat } = state;

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
    if (screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current).catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      console.error("Fullscreen not supported on this device.");
      showSnackbar("Fullscreen not supported on this device.", "error");
    }
  };

  const handlePlaybackrateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
    playerRef.current.playbackRate = rate;
  };

  const handleProgress = (changeState) => {
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

  const handleRepeat = () => {
    if (repeat === "off") {
      setState({ ...state, repeat: "repeat" });
      repeatFlag = true;
    } else if (repeat === "repeat") {
      setState({ ...state, repeat: "repeatOne" });
      repeatFlag = true;
    } else {
      setState({ ...state, repeat: "off" });
      repeatFlag = false;
    }
    console.log("repeat mode: ", repeat);
  };

  const handleEnd = () => {
    if (repeat === "repeatOne" && repeatFlag) {
      playerRef.current.seekTo(0);
      handlePlayPause();
      setState({ ...state, repeat: "off" });
      repeatFlag = false;
    } else if (repeat === "repeat") {
      playerRef.current.seekTo(0);
      handlePlayPause();
      repeatFlag = true;
    }
    console.log("repeat mode: ", repeat);
  };

  const addBookmark = () => {
    if (source === "") {
      showSnackbar("Please select a video file or enter a valid URL.", "error");
      return;
    }
    if (source.includes("youtube.com") || source.includes("youtu.be")) {
      showSnackbar(
        "Bookmarks are not supported for YouTube videos yet.",
        "info"
      );
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

    const bookmark = {
      time: currentTime,
      display: elapsedTime,
      image: imageUrl,
    };
    onAddBookmark(bookmark);
  };

  const deleteBookmark = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
    onDeleteBookmark(index);
  };

  const renameBookmark = (index, newTitle) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark, i) =>
        i === index ? { ...bookmark, title: newTitle } : bookmark
      )
    );
    onRenameBookmark(index, newTitle);
  };

  const seekToBookmark = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
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

  useKeyboardShortcut({
    key: " ",
    onKeyPressed: () => {
      handlePlayPause();
    },
  });

  useKeyboardShortcut({
    key: "ArrowLeft",
    onKeyPressed: () => {
      handleRewind();
    },
  });

  useKeyboardShortcut({
    key: "ArrowRight",
    onKeyPressed: () => {
      handleFastForward();
    },
  });

  return (
    <Container maxWidth="md">
      <div
        ref={playerContainerRef}
        className="playerWrapper"
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
      >
        <ReactPlayer
          playsinline 
          ref={playerRef}
          width={"100%"}
          height={"100%"}
          url={source}
          muted={muted}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onEnded={handleEnd}
          loop={repeat === "repeat" ? true : false}
          
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
                origin: process.env.REACT_APP_BASE_URl
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
          repeat={repeat}
          onRepeat={handleRepeat}
        />
      </div>
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: "box.main",
          marginTop: 2,
          width: "100%",
          boxShadow: "24",
        }}
      >
        <Typography variant="h6" padding={2} paddingBottom={0}>
          Bookmarks
        </Typography>
        {bookmarks.length === 0 ? (
          <Typography
            variant="body1"
            padding={2}
            textAlign="center"
            paddingBottom={16}
            marginTop={8}
            color="secondary.main"
          >
            No bookmarks added yet.
          </Typography>
        ) : (
          <Bookmarks
            bookmarks={bookmarks}
            format={format}
            onDelete={deleteBookmark}
            onSeek={seekToBookmark}
            onRename={renameBookmark}
            onChangeIndex={onChangeBookmarkIndex}
          />
        )}
      </Box>
      <canvas ref={canvasRef} />
    </Container>
  );
}

export default VideoPlayer;
