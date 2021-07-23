const api = require('./jikanAPI');

exports.homeRoutes = async (req, res) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        comedy : animeFound[0],
        // seinen : animeFound[1],
        // shoujo : animeFound[2],
        // thriller : animeFound[3] 
    });
}
