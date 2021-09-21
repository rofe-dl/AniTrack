const api = require('../utils/jikan_API');

/**
 * Root URL leading to front page.
 */
exports.homeRoute = async (req, res, next) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        animeFound : animeFound
    });
}