const api = require('../utils/jikan_API');

/**
 * Information page of an anime.
 */
exports.viewAnimeInfo = async(req, res) => {
    const anime = await api.getAnimeInfo(req.params.animeID);
    res.render('anime_info', {
        anime: anime
    });
}

/**
 * Search anime page.
 */
exports.searchAnime = async(req, res) => {
    if (!Object.keys(req.query).length){
        res.render('search_anime', {
            results : []
        });
    }else{
        const response = await api.searchAnime(req.query);
        res.render('search_anime', {
            results : response.results // json response has a field named results containing the anime
        });
    }
}