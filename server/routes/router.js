const express = require('express');
const route = express.Router();

const services = require('../services/render');

//  function to run when root url is called
route.get('/', services.homeRoutes);

// line used to define what gets returned when require() is called on this file
module.exports = route