const api = require('./jikanAPI');

exports.homeRoutes = (req, res) => {
    res.render('index', {
        // animeFound : api.getComedyAnime() 
        animeFound : [
            {
                imageURL : "https://cdn.myanimelist.net/images/anime/1819/97947.jpg"
            },
            {
                imageURL : "https://cdn.myanimelist.net/images/anime/9/56155.jpg"
            }]
    });
}
