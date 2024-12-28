# Vi-Di Player

A fully featured and responsive video player built with React and Material-UI, offering advanced features like dark mode, bookmarking, and dynamic video sources. This project is designed for a seamless user experience with modern web technologies.

## Key Features

- **Dark Mode:** Sleek and modern interface with light and dark mode support.
- **Dynamic Video Sources:** Upload video files or stream directly via URL.
- **Drag-and-Drop Support:** Easily upload video files by dragging them into the player.
- **Recent Videos Dropdown:** Quickly access and play recently viewed videos.
- **Playback Controls:** Fully functional controls for play, pause, rewind, fast-forward, volume, playback speed, repeat and fullscreen.
- **Responsive Design:** Optimized for all screen sizes, ensuring a seamless experience on both desktop and mobile devices.
- **Thumbnail Preview:** Automatically generated thumbnails for videos and bookmarks.
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

### **Uploading Videos**

- Use the **"Add"** button in the top navigation bar to upload a video file from your device or enter a video URL.
- Drag and drop video files directly into the player interface.
- Use the search bar to quickly find videos by name.

### **Playback Controls**

- Use the bottom control panel for the following:
  - **Play/Pause**: Start or stop playback.
  - **Rewind/Fast-Forward**: Skip backward or forward by 10-second intervals.
  - **Volume Adjustment**: Increase or decrease the sound level.
  - **Playback Speed**: Watch videos at your preferred pace.
  - **Fullscreen Mode**: Maximize the player for an immersive experience.
  - **Repeat**: Enable repeat mode to loop videos seamlessly.

### **Bookmarking**

- While watching a video, click the **"Bookmark"** button to save the current video moment.
- Manage bookmarks from the bookmarks section:
  - **Rename**: Assign custom names to bookmarks for easier identification.
  - **Delete**: Remove unwanted bookmarks.
  - **Seek**: Jump directly to the bookmarked moments with a single click.

### **Recent Videos**

- Access recently played videos from the **"Browse Gallery"** dropdown in the top navigation bar.
- Remove unwanted entries directly from the dropdown menu.

### **Dark Mode**

- Toggle dark mode from the top bar to switch between themes.

## Technologies Used

- **React:** Frontend framework for building UI components.
- **Material-UI:** UI library for responsive and modern design.
- **React-Player:** React component for playing videos.
