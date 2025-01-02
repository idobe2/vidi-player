import { forwardRef } from "react";
import "../global.css";
import { Typography, Grid2, Button, IconButton, Slider } from "@mui/material";
import {
  Bookmark as BookmarkIcon,
  FastRewind as FastRewindIcon,
  FastForward as FastForwardIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullScreenIcon,
  Repeat as RepeatIcon,
  RepeatOn as RepeatOnIcon,
  RepeatOneOn as RepeatOneOnIcon,
} from "@mui/icons-material";
import PrettoSlider from "./prettoSlider";
import Popover from "./playbackRatePopover";

function PlayerControls(
  {
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
    title,
    repeat,
    onRepeat,
  },
  ref
) {
  return (
    <div className="controlsWrapper" ref={ref}>
      {/* Top Controls */}
      <Grid2
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 12 }}
      >
        <Grid2
          sx={{
            width: { xs: "80%", sm: "90%" },
          }}
        >
          <Typography variant="h5" style={{ color: "#fff" }}>
            {title}
          </Typography>
        </Grid2>

        <Grid2
          sx={{
            width: { xs: "20%", sm: "auto" },
            scale: { xs: 0.8, sm: 1 },
            mt: { xs: -1, sm: 0 },
            mr: { xs: -2, sm: 0 },
          }}
        >
          <Button
            onClick={onBookmark}
            variant="contained"
            color="primary"
            startIcon={
              <BookmarkIcon style={{ paddingLeft: 10, fontSize: "32" }} />
            }
          ></Button>
        </Grid2>
      </Grid2>

      {/* Middle Controls */}
      <Grid2
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        style={{ scale: 1.5 }}
      >
        <IconButton
          onClick={onRewind}
          className="controlsIcons"
          aria-label="rewind"
          sx={{ color: "white" }}
        >
          <FastRewindIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          onClick={onPlayPause}
          className="controlsIcons"
          aria-label="rewind"
          sx={{ color: "white" }}
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
          sx={{ color: "white" }}
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
        sx={{
          p: { xs: 0, sm: "auto" },
          pl: { xs: 1, sm: "auto" },
          pr: { xs: 1, sm: "auto" },
          pt: { xs: 1, sm: "auto" },
        }}
      >
        <Grid2 style={{ width: "100%", height: "30%" }}>
          <PrettoSlider
            min={0}
            max={100}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={Math.floor(played * 100)}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid2>

        <Grid2>
          <Grid2 container direction="row" alignItems="center" spacing={1}>
            <Grid2>
              <IconButton
                onClick={onPlayPause}
                className="bottomIcons"
                sx={{ color: "white", mr: { xs: -1, sm: "auto" } }}
              >
                {playing ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
            </Grid2>

            <Grid2>
              <IconButton onClick={onMute} className="bottomIcons">
                {muted ? (
                  <VolumeOffIcon fontSize="large" sx={{ color: "white" }} />
                ) : (
                  <VolumeUpIcon fontSize="large" sx={{ color: "white" }} />
                )}
              </IconButton>
            </Grid2>

            <Grid2 container direction="row" alignItems="center">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid2
                  style={{ width: 80, marginTop: 5 }}
                  sx={{ pr: { xs: 2, sm: "auto" }, ml: { xs: "auto", sm: 2 } }}
                >
                  <Slider
                    min={0}
                    max={100}
                    value={volume * 100}
                    className="volumeSlider"
                    onChange={onVolumeChange}
                    onChangeCommitted={onVolumeSeekUp}
                  />
                </Grid2>

                <Grid2 sx={{ ml: { xs: -1, sm: 3 } }}>
                  <Button
                    onClick={onChangeDispayFormat}
                    variant="text"
                    className="bottomIcons"
                    style={{
                      color: "#fff",
                      marginLeft: 16,
                      minWidth: 100,
                      right: 30,
                    }}
                    sx={{
                      ml: { xs: 4, sm: "auto" },
                    }}
                  >
                    <Typography>
                      {elapsedTime}/{totalDuration}
                    </Typography>
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
              sx={{
                pr: { xs: 0, sm: "auto" },
                right: { xs: 0, sm: 20 },
              }}
            >
              <Grid2>
                <IconButton
                  onClick={onRepeat}
                  className="bottomIcons"
                  sx={{
                    color: "white",
                    mr: { xs: -3, sm: "auto" },
                  }}
                >
                  {repeat === "off" && <RepeatIcon fontSize="large" />}
                  {repeat === "repeat" && <RepeatOnIcon fontSize="large" />}
                  {repeat === "repeatOne" && (
                    <RepeatOneOnIcon fontSize="large" />
                  )}
                </IconButton>
              </Grid2>

              <Grid2
                sx={{
                  mr: { xs: -2, sm: "auto" },
                }}
              >
                <Popover
                  triggerButton={
                    <Button
                      variant="text"
                      className="bottomIcons"
                      style={{ color: "#fff" }}
                    >
                      <Typography>
                        <strong>{playbackRate}X</strong>
                      </Typography>
                    </Button>
                  }
                  onRateChange={onPlaybackRateChange}
                  playbackRate={playbackRate}
                />
              </Grid2>

              <Grid2 sx={{ mr: { xs: 0, sm: "auto" } }}>
                <IconButton
                  onClick={onToggleFullScreen}
                  className="bottomIcons"
                  sx={{ color: "white" }}
                >
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
