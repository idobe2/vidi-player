import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid2 } from "@mui/material";

export default function PlaybackratePopover({
  triggerButton,
  onRateChange,
  playbackRate,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRateClick = (rate) => {
    onRateChange(rate);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;

  return (
    <div>
      {triggerButton ? (
        React.cloneElement(triggerButton, {
          "aria-describedby": id,
          onClick: handlePopover,
        })
      ) : (
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handlePopover}
        >
          Open Popover
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Grid2 container direction="column-reverse">
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <Button
              onClick={() => handleRateClick(rate)}
              key={rate}
              variant="text"
            >
              <Typography
                color={rate === playbackRate ? "secondary" : "default"}
              >
                {rate}X
              </Typography>
            </Button>
          ))}
        </Grid2>
      </Popover>
    </div>
  );
}
