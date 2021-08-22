# AniTrack (Work In Progress)
[![image.png](https://i.postimg.cc/2yNgf2Ds/image.png)](https://postimg.cc/S2Vg6Ljd)
Anitrack is an anime tracking website, where you can browser anime by different criteria and view information about them. By logging in, you can add them to your watch list. 

This is a university project work for my CSE470 (Software Development) course.
## Setup Instructions

// TO DO

## Development

I've used the [Jikan API](https://jikan.docs.apiary.io/#) to retrieve anime related information, a nice free API that scrapes information from MyAnimeList. To prevent overloading the API with requests, I've used Redis to cache the JSON responses from it, so there needs to be a Redis server running in a Linux/Mac environmment in the background. There's a manual delay of 2 seconds set before each API call. 

For the project, I tried to follow the MVC architecture to the best of my understanding. 

### Tools used
* JavaScript, Node.js
* ExpressJS
* MongoDB
* Bootstrap, EJS (templating engine)/CSS
* Redis


