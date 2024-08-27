# Potree Viewer

## Overview

This project integrates the Potree viewer package to visualize point clouds and convert LAS files into Potree-compatible format. It consists of a backend server using Node.js and a client application to view and interact with point cloud data.

## Features

- **View Point Clouds**: Users can view existing Potree files and interact with 3D point clouds.
- **Convert LAS Files**: Convert LAS files into Potree format using PotreeConverter.
- **Serve Data**: The backend serves the converted point cloud data in `metadata.json` format.

## Installation

### Backend

1. **Navigate to the backend directory**:

Install dependencies:

npm install
Start the server:

npm start
The server will run on http://localhost:3008.

Client
Navigate to the client directory:

cd path/to/client
Install dependencies:


npm install
Start the client:


npm run dev
The client will run on http://localhost:5173 (or another port if configured differently).

Usage
Viewing Point Clouds
Ensure the backend server is running.
Open the client application in your browser.
Load the Potree files through the client interface to view and interact with the point clouds.
Converting LAS Files
Place your LAS files in the appropriate directory.

Use PotreeConverter to convert LAS files. Run the following command from your PotreeConverter directory:
