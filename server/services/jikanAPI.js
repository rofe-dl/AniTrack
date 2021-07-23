const axios = require('axios');
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
    await sleep(3000);

    // axios.get returns a promise, so do await
    return await axios.get(url);
}

/**
 * Function to retrieve the anime to show on the front page
 * @returns An array of Anime objects, wrapped in a promise because it's an async function
 */
module.exports.getFrontPageAnime = async() => {
    const comedy = [], seinen = [], shoujo = [], thriller = [];

    const responseComedy = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.comedy}/1`);
    const responseSeinen = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.seinen}/1`);
    const responseShoujo = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.shoujo}/1`);
    const responseThriller = await jikan(`https://api.jikan.moe/v3/genre/anime/${this.genreCodes.thriller}/1`);

    // limits front page to 5 anime for every genre
    for (let i = 0; i < 5; i++){
        comedy.push({
            imageURL : responseComedy.data.anime[i].image_url
        });
        seinen.push({
            imageURL : responseSeinen.data.anime[i].image_url
        });
        shoujo.push({
            imageURL : responseShoujo.data.anime[i].image_url
        });
        thriller.push({
            imageURL : responseThriller.data.anime[i].image_url
        });
    }

    return [comedy, seinen, shoujo, thriller];
    
};