const axios = require('axios');

/**
 * Install Redis on Linux/WSL first. It's used as a cache server that 
 * caches the API responses from Jikan, storing JSON as value 
 * against aniTrack:`url` as a key. Default hostname and port are 
 * 127.0.0.1(localhost) & 6379 respectively
 */
const redis = require('redis');
const redisClient = redis.createClient(); 
redisClient.on("error", function(error) {
    console.error("Error: " + error);
});

/**
 * Promisifies the function of the whole redis module,
 * as they are callback based, making it hard to retrieve
 * values fromm the callback functions.Instead it's convenient
 * to make them return promises and use async/await.
 * Every function in the module will then have another copy
 * of it named with Async appended at the end of function name.
 * e.g set becomes setAsync, get becomes getAsync
 */
const { promisifyAll } = require('bluebird');
promisifyAll(redis);



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
 * Function used to make calls to the API. A delay set for rate limiting.
 * @param {String} url  URL used to make the API call. 
 * @returns Promise that can be resolved to a response object
 */
async function jikan(url){
    await sleep(2000);

    // axios.get returns a promise, so do await
    return await axios.get(url);
}

/**
 * Function to retrieve the anime to show on the front page
 * @returns An array of Anime objects, wrapped in a promise because it's an async function
 */
module.exports.getFrontPageAnime = async() => {
    const comedy = [], seinen = [], shoujo = [], thriller = [];

    // Jikan cache URL
    //https://private-anon-c7736fee61-jikan.apiary-proxy.com/v3/genre/anime/${this.genreCodes.comedy}/1
    // Jikan URL
    //https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1

    let responseComedy = await redisClient.getAsync(`aniTrack:https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1`);
    // let cacheSeinen = await redisClient.get(`aniTrack:https://api.jikan.moe/v3/genre/anime/${this.genreCodes.seinen}/1`);
    // let cacheShoujo = await redisClient.get(`aniTrack:https://api.jikan.moe/v3/genre/anime/${this.genreCodes.shoujo}/1`);
    // let cacheThriller = await redisClient.get(`aniTrack:https://api.jikan.moe/v3/genre/anime/${this.genreCodes.thriller}/1`);

    if (responseComedy !== null){
        responseComedy = JSON.parse(responseComedy);
    }else{
        responseComedy = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1`);

        // Gets the JSON object
        responseComedy = responseComedy.data;
        await redisClient.setAsync(`aniTrack:https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1`, JSON.stringify(responseComedy));
    }

    
    // const responseSeinen = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.seinen}/1`);
    // const responseShoujo = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.shoujo}/1`);
    // const responseThriller = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.thriller}/1`);

    // limits front page to 5 anime for every genre
    for (let i = 0; i < 5; i++){
        comedy.push({
            imageURL : responseComedy.anime[i].image_url
        });
        // seinen.push({
        //     imageURL : responseSeinen.data.anime[i].image_url
        // });
        // shoujo.push({
        //     imageURL : responseShoujo.data.anime[i].image_url
        // });
        // thriller.push({
        //     imageURL : responseThriller.data.anime[i].image_url
        // });
    }

    return [comedy];
    // return [comedy, seinen, shoujo, thriller];
    
};

module.exports.updateFrontPageAnime = () => {

}