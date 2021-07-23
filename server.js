const express = require('express'); //runs the express.js and returns the exports object into variable, like importing
const app = express(); // makes the app

// morgan is a library used to log HTTP requests on the console
const morgan = require('morgan');
app.use(morgan('tiny'));

// built in lib to use paths for any os
const path = require("path");

 // dotenv is a library to extract variables from a .env and load into process.env as env variable
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'}); // specify the path of the dotenv file

// library that parses HTTP post requests to get the form data and convert it into objects
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true})); // set body parser

const PORT = process.env.PORT || 8080; // || can be used to give default values to variables if first value is falsy

// specifies the port the app will listen to, function is a callback that gets called after app is initialized
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

// set view engine
app.set("view engine", "ejs");
// below line is for when we change location of all ejs files into someplace else other than views
// it then sets the dir of views into another path, where __dirname returns the dir of the current file
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets from the directory
app.use(express.static(path.resolve(__dirname, "assets")));


// load routers so that any url starting with / will load all the subpaths in router.js
app.use('/', require('./server/routes/router'));

/**
 * TODO:
 * 1. Limit requests to 25 a minute
 * 2. slider in front page
 * 3. cache api responses
 * 4. slider on front page
 */

