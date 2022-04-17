# AniTrack
[![image.png](https://i.postimg.cc/NGpd6jg9/image.png)](https://postimg.cc/SjYLqqYk)
Anitrack is an anime tracking website, where you can browse anime by different criteria and view information about them. By logging in, you can add them to your watch list.
## Setup Instructions

1. Clone the repository
1. Install Node.js for your system
1. Install packages using 'npm install' in the directory
1. Make a 'config.env' file with PORT=3000, session_secret="random_string", MongoURI="your mongoDB url"
1. Create an Atlas account, create a MongoDB database, whitelist IP as 0.0.0.0/0
1. Install redis and start the redis server. If you're on Windows, install WSL and install redis in that
1. Run 'npm start' to start the main server


## Development

I've used the [Jikan API](https://jikan.docs.apiary.io/#) to retrieve anime related information, a nice free API that scrapes information from MyAnimeList. To prevent overloading the API with requests, I've used Redis to cache the JSON responses from it, so there needs to be a Redis server running in a Linux/Mac environmment in the background. There's a manual delay of 2 seconds set before each API call. 

For the project, I tried to follow the MVC architecture to the best of my understanding. 

### Tools used
* JavaScript, Node.js
* ExpressJS
* MongoDB
* Bootstrap, EJS (templating engine)/CSS
* Redis


