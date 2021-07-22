const api = require('./jikanAPI');

exports.homeRoutes = async (req, res) => {

    res.render('index', {
        animeFound : await api.getComedyAnime() 
    });
}
