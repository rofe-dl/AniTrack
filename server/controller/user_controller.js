const api = require('../services/jikan_API');

exports.register = (req, res) => {
    res.render('register');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.logout = async (req, res) => {
    const animeFound = await api.getFrontPageAnime();
    res.render('index', {
        animeFound : animeFound // confusing, but this seems to work? second variable is the const above
    });
}

exports.dashboard = (req, res) => {
    res.render('dashboard');
}