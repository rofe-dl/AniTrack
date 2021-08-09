const express = require('express');
const route = express.Router();

const {controller, user_controller, api_controller} = require('../controller/index');

/**
 * Root URL.
 */
route.get('/', controller.homeRoute);

/**
 * URL sequence matters, so edit with care.
 * For example, if viewAnimeInfo put before searchAnime, it'll treat
 * /anime/search as a viewAnimeInfo URL, with search as the animeID, and won't
 * return anything.
 */
route.get('/anime/search', api_controller.searchAnime);
route.get('/anime/:animeID', api_controller.viewAnimeInfo);

route.get('/register', user_controller.register);
route.get('/login', user_controller.login);
route.get('/logout', user_controller.logout);
route.get('/dashboard', user_controller.dashboard);


// line used to define what gets returned when require() is called on this file
module.exports = route;