const express = require('express');
const route = express.Router();

const render = require('../services/render');

/**
 * Root URL.
 */
route.get('/', render.homeRoutes);

/**
 * URL sequence matters, so edit with care.
 * For example, if viewAnimeInfo put before searchAnime, it'll treat
 * /anime/search as a viewAnimeInfo URL, with search as the animeID, and won't
 * return anything.
 */
route.get('/anime/search', render.searchAnime);
route.get('/anime/:animeID', render.viewAnimeInfo);



// line used to define what gets returned when require() is called on this file
module.exports = route;