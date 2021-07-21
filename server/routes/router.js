const express = require('express');
const route = express.Router();

const render = require('../services/render');

//  function to run when root url is called
route.get('/', render.homeRoutes);

// line used to define what gets returned when require() is called on this file
module.exports = route;