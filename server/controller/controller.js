const api = require('../utils/jikan_API');

exports.homeRoute = async (req, res, next) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        animeFound : animeFound, // confusing, but this seems to work? second variable is the const above
    });
}