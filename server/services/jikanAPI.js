// request to get first page of comedy anime
const request = require('request');

module.exports.getComedyAnime = () => {
    const animeFound = [];

    // request is an async function
    request('https://api.jikan.moe/v3/genre/anime/4/1', { json : true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        body.anime.forEach((anime) => {
            animeFound.push({
                imageURL : anime.image_url
            });
        });

        return animeFound;
    });

    
};