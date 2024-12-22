import React from "react";
import { Container, Typography, Grid2, Paper, IconButton, Link } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

const About = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      {/* Project Overview */}
      <Paper elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          About the Project
        </Typography>
        <Typography variant="body1">
          Welcome to my Vi-Di Player project! This application is designed to provide
          a seamless video playback experience, featuring advanced controls like fast-forward,
          rewind, volume adjustments, playback rate and bookmarks. It's built with React and leverages modern
          web technologies to ensure performance and responsiveness.
        </Typography>
        <Typography variant="body1">
          The project is open-source, and contributions are welcome! Check out the links below
          to learn more and get involved.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Paper elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Dark mode support for a modern, user-friendly interface.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Bookmarking system to save your favorite video moments.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Dynamic video sources: upload files or stream via URL.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Built-in support for custom themes using Material-UI.
            </Typography>
          </li>
        </ul>
      </Paper>

      {/* Contributors Section */}
      <Paper elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Contributors
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            <Paper style={{ padding: "1rem", textAlign: "center" }} elevation={2}>
              <Typography variant="h6">Ido Ben Noun</Typography>
              <Typography variant="body2">Software Developer</Typography>
              <IconButton href="https://github.com/idobe2/" target="_blank" rel="noopener noreferrer">
                <GitHub />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/idobn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
            </Paper>
          </Grid2>
        </Grid2>
      </Paper>

      {/* Links Section */}
      <Paper elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Useful Links
        </Typography>
        <ul>
          <li>
            <Link
              href="https://github.com/idobe2/vidi-player.git"
              target="_blank"
              rel="noopener noreferrer"
              variant="body1"
            >
              <GitHub /> GitHub Repository
            </Link>
          </li>
          {/* <li>
            <Link
              href="https://your-documentation-link.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="body1"
            >
              <Language /> Documentation
            </Link>
          </li> */}
          {/* <li>
            <Link
              href="https://your-website.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="body1"
            >
              <Info /> Official Website
            </Link>
          </li> */}
        </ul>
      </Paper>

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
};

export default About;
