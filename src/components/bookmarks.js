import React from "react";
import {
  Grid2,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Bookmarks = ({ bookmarks, format, onDelete, onSeek, onRename }) => {
  return (
    <Grid2 container spacing={3} style={{ marginTop: 20 }}>
      {bookmarks.map((bookmark, index) => (
        <Grid2 item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              image={bookmark.image}
              alt={`Bookmark at ${format(bookmark.time)}`}
              onClick={() => onSeek(bookmark.time)}
              style={{ cursor: "pointer" }}
            />
            <CardContent style={{ paddingLeft: 5, paddingRight: 0, paddingBottom: 5, paddingTop: 5 }}>
              <Grid2 container direction="row" alignItems="center">
                <Grid2 item xs={8}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={bookmark.title || `Bookmark at ${format(bookmark.time)}`}
                    onChange={(e) => onRename(index, e.target.value)}
                  />
                </Grid2>
                <Grid2 item>
                  <IconButton
                    fontSize="small"
                    aria-label="delete"
                    onClick={() => onDelete(index)}
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
  );
};

export default Bookmarks;
