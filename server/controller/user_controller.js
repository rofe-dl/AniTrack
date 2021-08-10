const api = require('../services/jikan_API');
const { validationResult } = require('express-validator');

exports.getRegister = (req, res) => {
    res.render('register');
}

exports.postRegister = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const alert = errors.array();
        res.render('register', {
            alert,
            name : req.body.name,
            email : req.body.email
        });
    }else{
        
    }

    console.log(req.body);
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