const api = require('./jikanAPI');

exports.homeRoutes = async (req, res) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        animeFound : animeFound // confusing, but this seems to work? second variable is the const above
    });
}

exports.viewAnimeInfo = async(req, res) => {
    const anime = await api.getAnimeInfo(req.params.animeID);
    res.render('animeInfo', {
        anime: anime
    });
}