const axios = require('axios');

/**
 * Install Redis on Linux/WSL/Mac first. It's used as a cache server that 
 * caches the API responses from Jikan, storing JSON as value 
 * against " aniTrack:`url` " as a key. Default hostname and port are 
 * 127.0.0.1(localhost) & 6379 respectively
 */
const redis = require('redis');
const redisClient = redis.createClient(); 
redisClient.on("error", function(error) {
    console.error("Error: " + error);
});

/**
 * Bluebird promisifies the function of the whole redis module,
 * as they are callback based, making it hard to retrieve
 * values from the callback functions.Instead it's convenient
 * to make them return promises and use async/await.
 * Every function in the module will then have another copy
 * of it named with Async appended at the end of function name.
 * e.g set becomes setAsync, get becomes getAsync
 */
const { promisifyAll } = require('bluebird'); 
// syntax to say something like const a = require('bluebird').promisifyAll; a(redis);
promisifyAll(redis);


/**
 * Jikan has a genre code for every genre of anime.
 */
module.exports.genreCodes = {
    action: 1, adventure: 2, cars: 3, comedy: 4,
    dementia: 5, demons: 6, mystery: 7, drama: 8,
    ecchi: 9, fantasy: 10, game: 11, hentai: 12,
    historical: 13, horror: 14, kids: 15, magic: 16,
    martialArts: 17, mecha: 18, music: 19, parody: 20,
    samurai: 21, romance: 22, school: 23, sciFi: 24,
    shoujo: 25, shoujoAi: 26, shounen: 27, shounenAi: 28,
    space: 29, sports: 30, superPower: 31, vampire: 32,
    yaoi: 33, yuri: 34, harem: 35, sliceOfLife: 36,
    supernatural: 37, military: 38, police: 39, psychological: 40,
    thriller: 41, seinen: 42, josei: 43
}

/**
 * Function to make the script pause for a set duration.
 * @param {int} ms  Duration for the script to sleep for 
 * @returns Promise
 */
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

/**
 * Function used to make calls to the API. A 2s delay set for rate limiting.
 * 
 * @param {String} url  URL used to make the API call. 
 * @returns Promise that can be resolved to a response object
 */
async function jikan(url){
    await sleep(2000);

    // Jikan cache URL
    //https://private-anon-c7736fee61-jikan.apiary-proxy.com/v3/genre/anime/${this.genreCodes.comedy}/1
    // Jikan URL
    //https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1

    // axios.get returns a promise, so do await
    return await axios.get(url);
}

/**
 * Function to retrieve the anime to show on the front page
 * @returns A response object containing arrays of anime objects, wrapped in a promise because it's an async function
 */
module.exports.getFrontPageAnime = async() => {

    let response = {
        comedy : [],
        seinen : [],
        shoujo : [],
        thriller : []
    }

    // Stores the keys of the response object in an array to iterate the genres later
    const responseKeys = Object.keys(response);

    // Loop used to iterate the genres and check if response exists in Redis cache
    // Use [] instead of . , to access object properties using variable names
    for(let index in responseKeys){

        let key = responseKeys[index];
        let genreCode = exports.genreCodes[key];

        response[key] = await redisClient.getAsync(`aniTrack:https://api.jikan.moe/v3/genre/anime/${genreCode}/1`);

        // if cache hit, it's not null, so just get the JSON from the string and set it to it 
        if (response[key] !== null){
            response[key] = JSON.parse(response[key]).anime.slice(0,5);
        }else{
            // cache miss, so do an API call 
            response[key] = await jikan(`https://api.jikan.moe/v3/genre/anime/${genreCode}/1`);
            // Gets the JSON object
            response[key] = response[key].data;

            // Saves the value in cache
            await redisClient.setAsync(`aniTrack:https://api.jikan.moe/v3/genre/anime/${genreCode}/1`, JSON.stringify(response[key]));
            // Slicing to only show 5 anime per genre on the front page
            response[key] = response[key].anime.slice(0,5);
        }
    }

    return response;
    
};

module.exports.getAnimeInfo = async (animeID) => {
    let response = await redisClient.getAsync(`aniTrack:https://api.jikan.moe/v3/anime/${animeID}`);

    if (response !== null){
        response = JSON.parse(response);
    }else{
        response = await jikan(`https://api.jikan.moe/v3/anime/${animeID}`);
        response = response.data;

        await redisClient.setAsync(`aniTrack:https://api.jikan.moe/v3/anime/${animeID}`, JSON.stringify(response));
    }

    return response;
}