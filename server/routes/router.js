const express = require('express');
const route = express.Router();

const render = require('../services/render');

/**
 * Root URL.
 */
route.get('/', render.homeRoutes);

route.get('/anime/:animeID', render.viewAnimeInfo);


// line used to define what gets returned when require() is called on this file
module.exports = route;