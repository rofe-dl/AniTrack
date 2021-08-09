const api = require('./jikan_API');

exports.homeRoutes = async (req, res) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        animeFound : animeFound // confusing, but this seems to work? second variable is the const above
    });
}

exports.viewAnimeInfo = async(req, res) => {
    const anime = await api.getAnimeInfo(req.params.animeID);
    res.render('anime_info', {
        anime: anime
    });
}

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

exports.register = (req, res) => {
    res.render('register');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.logout = exports.homeRoutes;

exports.dashboard = (req, res) => {
    res.render('dashboard');
}