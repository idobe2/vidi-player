import React, { useRef } from "react";
import ShareIcon from "@mui/icons-material/Share";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import { alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import { useVideoContext } from "../context/videoContext";
import { useKeyboardShortcut } from "../hooks/useKeyboardShortcut";
import { useSnackbar } from "../context/snackbarProvider";

const useStyles = (/*theme*/) => ({
  typography: {
    // padding: theme.spacing(2)
  },
  btn: {
    backgroundColor: "#26a27b",
    color: "rgba(255,255,255,0.9)",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: alpha("#26a27b", 0.9085),
    },
  },
});

export default function DropdownShareButton() {
  const classes = useStyles();
  const { videoSource } = useVideoContext();
  const popupStateRef = useRef(null);
  const showSnackbar = useSnackbar();

  const handleShare = (e) => {
    e.preventDefault();

    const ahref = window.location.href;
    // eslint-disable-next-line
    const encodedAhref = encodeURIComponent(ahref);
    var link;

    switch (e.currentTarget.id) {
      case "facebook":
        // ahref
        link = `https://www.facebook.com/sharer/sharer.php?u=${videoSource}`;
        open(link);
        handleClose(popupStateRef.current);
        break;

      case "twitter":
        // encodedAhref
        link = `https://twitter.com/intent/tweet?url=${videoSource}`;
        open(link);
        handleClose(popupStateRef.current);
        break;

      case "reddit":
        // encodedAhref
        link = `https://www.reddit.com/submit?url=${videoSource}`;
        open(link);
        handleClose(popupStateRef.current);
        break;

      case "copy":
        // ahref
        if (videoSource === "") {
          showSnackbar("No video source available!", "error");
          break;
        }
        navigator.clipboard.writeText(videoSource);
        handleClose(popupStateRef.current);
        showSnackbar("Link copied to clipboard!", "success");
        break;

      default:
        break;
    }
  };

  const open = (socialLink) => {
    if (videoSource === "") {
      showSnackbar("No video source available!", "error");
      return;
    }
    window.open(socialLink, "_blank");
  };

  const handleClose = (popupState) => {
    popupStateRef.current.close();
  };

  useKeyboardShortcut({
    key: "Escape",
    onKeyPressed: handleClose,
  });

  // const handleShareMessage = () => {
  //   return 'Check out this video: "' + videoTitle + '" at ' + videoSource;
  // };

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => {
        popupStateRef.current = popupState; // Store popupState in ref

        return (
          <ClickAwayListener onClickAway={handleClose}>
            <div className="popup-menu">
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                sx={{ marginRight: 2, height: "70%", width: "7%" }}
                {...bindToggle(popupState)}
              >
                <ShareIcon fontSize="medium" />
                {/* <Typography variant="button" sx={{ ml: 1, mr: 1 }}>
                  Share
                </Typography> */}
              </Button>
              <Popper {...bindPopper(popupState)} transition placement="top">
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper elevation={3}>
                      <List dense className={classes.paper}>
                        <ListItem button id="facebook" onClick={handleShare}>
                          <ListItemIcon>
                            <FacebookIcon />
                          </ListItemIcon>
                          <ListItemText primary="Facebook" />
                        </ListItem>
                        <ListItem button id="twitter" onClick={handleShare}>
                          <ListItemIcon>
                            <TwitterIcon />
                          </ListItemIcon>
                          <ListItemText primary="Twitter" />
                        </ListItem>
                        <ListItem button id="reddit" onClick={handleShare}>
                          <ListItemIcon>
                            <RedditIcon />
                          </ListItemIcon>
                          <ListItemText primary="Reddit" />
                        </ListItem>
                        <ListItem button id="copy" onClick={handleShare}>
                          <ListItemIcon>
                            <LinkIcon />
                          </ListItemIcon>
                          <ListItemText primary="Copy Link" />
                        </ListItem>
                      </List>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </ClickAwayListener>
        );
      }}
    </PopupState>
  );
}
