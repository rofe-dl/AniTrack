const api = require('../services/jikan_API');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');

/**
 * View the register page.
 * @param {*} req 
 * @param {*} res 
 */
exports.getRegister = (req, res) => {
    res.render('register');
}

/**
 * Registers the user upon post request.
 * @param {*} req 
 * @param {*} res 
 */
exports.postRegister = (req, res) => {
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
                    password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
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