const api = require('../utils/jikan_API');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');

/**
 * View the register page.
 * @param {*} req 
 * @param {*} res 
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
 * @param {*} req 
 * @param {*} res 
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

exports.login = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        res.render('login', {
            email : req.params.email
        });
    }
}

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

exports.watchlist = (req, res, next) => {
    res.render('watchlist');
}