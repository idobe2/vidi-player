import { forwardRef } from "react";
import "../global.css";
import {
  Typography,
  Grid2,
  Button,
  IconButton,
  Slider,
  Tooltip,
} from "@mui/material";
import {
  Bookmark as BookmarkIcon,
  FastRewind as FastRewindIcon,
  FastForward as FastForwardIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullScreenIcon,
} from "@mui/icons-material";
import PrettoSlider from "./prettoSlider";
import Popover from "./playbackRatePopover";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

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
        style={{ padding: 16 }}
      >
        <Grid2 item>
          <Typography variant="h5" style={{ color: "#fff" }}>
            {title}
          </Typography>
        </Grid2>

        <Grid2 item>
          <Button
            onClick={onBookmark}
            variant="contained"
            color="primary"
            startIcon={<BookmarkIcon style={{paddingLeft: 10, fontSize: "32"}}/>}
          >
          </Button>
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
        style={{ 
          padding: 8,
         }}
      >
        <Grid2 item xs={12} style={{ width: "100%" }}>
          <PrettoSlider
            min={0}
            max={100}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={Math.floor(played * 100)}
            ValueLabelComponent={(props) => (
              <ValueLabelComponent {...props} value={elapsedTime} />
            )}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid2>

        <Grid2 item>
          <Grid2 container direction="row" alignItems="center" spacing={1}>
            <Grid2 item>
              <IconButton onClick={onPlayPause} className="bottomIcons" sx={{ color: "white" }}>
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
                  <VolumeOffIcon fontSize="large" sx={{ color: "white" }} />
                ) : (
                  <VolumeUpIcon fontSize="large" sx={{ color: "white" }} />
                )}
              </IconButton>
            </Grid2>

            <Grid2 container marginTop={1} direction="row" alignItems="center">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid2 item xs style={{ width: 80 }}>
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
