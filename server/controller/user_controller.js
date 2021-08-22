const api = require('../utils/jikan_API');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');
const Anime = require('../models/Anime');

/**
 * View the register page.
 */
exports.getRegister = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        res.render('register');
    }
}

/**
 * Registers the user upon post request.
 */
exports.postRegister = (req, res, next) => {
    const errors = validationResult(req);
    const alert = errors.array();
    const { name, email, password } = req.body;

    // if validation error is found
    if (!errors.isEmpty()){
        res.render('register', {
            alert,
            name,
            email
        });
    }else{
        // check existing email
        User.findOne({email: email}).then(user => {
            if (user){
                alert.push({msg: 'This email is not available'});
                res.render('register', {
                    alert,
                    name
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered.');
                                res.redirect('/login/' + req.body.email);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

/**
 * View login page.
 */
exports.login = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        res.render('login', {
            email : req.params.email
        });
    }
}

/**
 * Login the user
 */
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login/' + req.body.email,
        failureFlash: true
    })(req, res, next);
}

exports.logout = async (req, res, next) => {
    req.logout();
    res.redirect('/');
}

/**
 * Get current user's watch list.
 */
exports.getWatchlist = async (req, res, next) => {
    // populate called on the promise to find the anime object from object_id
    // in the watch list field
    await User.findById(req.user._id)
        .populate('watchlist').exec((err, user) => {
            if (err) console.log(err);

            res.render('watchlist', {
                watchlist : user.watchlist
            });
        });
}

/**
 * Add anime to watch list.
 */
exports.addAnime = async (req, res, next) => {
    const mal_id = req.params.anime_id;
    const response = await api.getAnimeInfo(mal_id);

    // if anime not in db, add it
    let anime = await Anime.findOne({mal_id});
    if (anime === null){

        anime = new Anime({
            mal_id : mal_id,
            title : response.title,
            image_url : response.image_url,
            episodes : response.episodes
        });

        await anime.save();
    }
    // if does not already have it in watch list
    if (req.user.watchlist.indexOf(anime._id) < 0){
        req.user.watchlist.push(anime);
        await req.user.save();
    }

    res.redirect('/watchlist');
}

/**
 * Remove anime from watch list.
 */
 exports.removeAnime = async (req, res, next) => {
    const mal_id = req.params.anime_id;
    const object = await Anime.findOne({mal_id});

    if (object !== null){
        req.user.watchlist.pull({ _id : object._id});
        await req.user.save();
    }

    res.redirect('/watchlist');
}