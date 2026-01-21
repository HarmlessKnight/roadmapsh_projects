# Weather API Wrapper Service

This is a simple weather API wrapper service that provides weather data for a given location. It uses the Visual Crossing Weather API to fetch the data and caches the results in Redis to improve performance and reduce the number of requests to the external API.

## Project Page URL

[https://github.com/HarmlessKnight/roadmapsh_projects](https://github.com/HarmlessKnight/roadmapsh_projects)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js
*   npm
*   Redis
*   A Visual Crossing Weather API key

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/HarmlessKnight/roadmapsh_projects.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the project and add your Visual Crossing Weather API key and your Redis server URL.
    ```
    API_KEY=YOUR_API_KEY
    REDIS_URL=redis://your_redis_server_url:6379
    ```

## Usage

1.  Start the server
    ```sh
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:3000` to use the web interface.
3.  To get weather data from the API, make a GET request to `http://localhost:3000/weather?location=your_location`.

## Environment Variables

*   `API_KEY`: Your Visual Crossing Weather API key.
*   `REDIS_URL`: The URL of your Redis server.
