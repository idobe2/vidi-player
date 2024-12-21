import { forwardRef } from "react";
import { Typography } from "@mui/material";
import "../global.css";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PrettoSlider from "./prettoSlider";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import FullScreenIcon from "@mui/icons-material/Fullscreen";
import Popover from "./pophover";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function PlayerControls({
  onPlayPause,
  playing,
  onRewind,
  onFastForward,
  muted,
  onMute,
  onVolumeChange,
  onVolumeSeekUp,
  volume,
  playbackRate,
  onPlaybackRateChange,
  onToggleFullScreen,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration,
  onChangeDispayFormat,
  onBookmark,
}, ref) {
  return (
    <div className="controlsWrapper" ref={ref}>
      {/* Top Controls */}
      <Grid2
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid2 item>
          <Typography variant="h5" style={{ color: "#fff" }}>
            Video Title
          </Typography>
        </Grid2>

        <Grid2 item>
          <Button
            onClick={onBookmark}
            variant="contained"
            color="primary"
            startIcon={<BookmarkIcon />}
          >
            Bookmark
          </Button>
        </Grid2>
      </Grid2>

      {/* Middle Controls */}
      <Grid2
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={onRewind}
          className="controlsIcons"
          aria-label="rewind"
        >
          <FastRewindIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          onClick={onPlayPause}
          className="controlsIcons"
          aria-label="rewind"
        >
          {playing ? (
            <PauseIcon fontSize="inherit" />
          ) : (
            <PlayArrowIcon fontSize="inherit" />
          )}
        </IconButton>

        <IconButton
          onClick={onFastForward}
          className="controlsIcons"
          aria-label="rewind"
        >
          <FastForwardIcon fontSize="inherit" />
        </IconButton>
      </Grid2>

      {/* Bottom Controls */}
      <Grid2
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: 16 }}
      >
        <Grid2 item xs={12} style={{ width: "100%" }}>
          <PrettoSlider
            min={0}
            max={100}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={played * 100}
            ValueLabelComponent={(props) => <ValueLabelComponent {...props} value={elapsedTime} />}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid2>

        <Grid2 item>
          <Grid2 container direction="row" alignItems="center" spacing={1}>
            <Grid2 item>
              <IconButton onClick={onPlayPause} className="bottomIcons">
                {playing ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
            </Grid2>

            <Grid2 item>
              <IconButton onClick={onMute} className="bottomIcons">
                {muted ? (
                  <VolumeOff fontSize="large" />
                ) : (
                <VolumeUpIcon fontSize="large" />
                )}
              </IconButton>
            </Grid2>

            <Grid2 container>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid2 item xs style={{ width: "100%" }}>
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={volume * 100}
                    className="volumeSlider"
                    onChange={onVolumeChange}
                    onChangeCommitted={onVolumeSeekUp}
                  />
                </Grid2>

                <Grid2 item>
                  <Button
                  onClick={onChangeDispayFormat}
                    variant="text"
                    className="bottomIcons"
                    style={{ color: "#fff", marginLeft: 16 }}
                  >
                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                  </Button>
                </Grid2>
              </div>
            </Grid2>

            <Grid2
              container
              direction="row"
              alignItems="center"
              spacing={1}
              position={"absolute"}
              right={20}
            >
              <Grid2 item>
                <Popover
                  triggerButton={
                    <Button
                      variant="text"
                      className="bottomIcons"
                      style={{ marginLeft: 24 }}
                    >
                      <Typography>{playbackRate}X</Typography>
                    </Button>
                  }
                  onRateChange={onPlaybackRateChange}
                  playbackRate={playbackRate}
                />
              </Grid2>

              <Grid2 item>
                <IconButton onClick={onToggleFullScreen} className="bottomIcons">
                  <FullScreenIcon fontSize="large" />
                </IconButton>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default forwardRef(PlayerControls);
