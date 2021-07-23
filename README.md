# AniTrack (Work In Progress)
[![image.png](https://i.postimg.cc/j5YqTZbb/image.png)](https://postimg.cc/VS4PB9vG)
Anitrack is an anime tracking website, where you can browser anime by different criteria and view information about them. By logging in, you can add them to your watch list. You can even get suggestions from the site to decide on your next anime.

This is a university project work for my CSE470 (Software Development) course.
## Setup Instructions

// TO DO

## Development

I've used the [Jikan API](https://jikan.docs.apiary.io/#) to retrieve anime related information, a nice free scraper that finds information from MyAnimeList and acts like an API. To prevent overloading the API with requests, I've used Redis to cache the JSON responses from it, so there needs to be a Redis server running in a Linux/Mac environmment in the background. The cache is updated once a week. There's also a manual delay of 2 seconds set before each API call. 

For the project, I tried to follow the MVC architecture to the best of my understanding. 

### Tools used
* JavaScript, Node.js
* ExpressJS
* Embedded Javascript (Templating Engine)
* MariaDB
* Bootstrap, EJS/CSS
* Redis


