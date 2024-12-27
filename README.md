# Vi-Di Player

A fully featured and responsive video player built with React and Material-UI, offering advanced features like dark mode, bookmarking, and dynamic video sources. This project is designed for a seamless user experience with modern web technologies.

## Key Features

- **Dark Mode:** Sleek and modern interface with light and dark mode support.
- **Dynamic Video Sources:** Upload video files or stream directly via URL.
- **Drag-and-Drop Support:** Easily upload video files by dragging them into the player.
- **Recent Videos Dropdown:** Quickly access and play recently viewed videos.
- **Playback Controls:** Fully functional controls for play, pause, rewind, fast-forward, volume, and fullscreen.
- **Customizable Playback Speed:** Adjust playback speed for personalized viewing.
- **Responsive Design:** Optimized for all screen sizes, ensuring a seamless experience on both desktop and mobile devices.
- **Thumbnail Preview:** Automatically generated thumbnails for bookmarks.
- **Integrated Alerts:** User-friendly prompts to guide actions, such as file uploads and bookmark management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/idobe2/vidi-player.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vidi-player
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Uploading Videos:**
  - Use the "Add" button in the top bar to upload a video file or enter a URL.
  - Drag and drop video files directly into the player.

- **Using the "Add" Button:**
  - Located in the top bar, the "Add" button allows you to:
  - Upload video files directly from your device.
  - Enter a video URL (Youtube, etc.) for seamless streaming.

- **Bookmarking:**
  - Click the "Bookmark" button during playback to save the current video moment.
  - Manage bookmarks in the bookmarks section, including renaming, deleting, and seeking.

- **Manage Bookmarks:**
  - Rename: Give your bookmarks meaningful titles for easy reference.
  - Delete: Remove bookmarks you no longer need.
  - Seek: Jump directly to bookmarked moments with a single click.

- **Recent Videos:**
  - Access recently played videos through the dropdown in the top bar.

- **Playback Controls:**
  - Use controls for play, pause, rewind, fast-forward, volume adjustment, and fullscreen mode.

## Technologies Used

- **React:** Frontend framework for building UI components.
- **Material-UI:** UI library for responsive and modern design.
- **React-Player:** React component for playing videos.
