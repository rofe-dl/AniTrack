const express = require('express');
const app = express();
const path = require('path');

/**
 * Morgan is a library used to log HTTP requests on the console
 */
const morgan = require('morgan');
app.use(morgan('tiny'));

/**
 * Library to extract variables from a .env and load into process.env as env variable
 */
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'}); // specify the path of the dotenv file

/**
 * Library that parses HTTP post requests to get the form data and convert it into objects
 */
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true})); // set body parser

/**
 * Sets the PORT number.
 */
const PORT = process.env.PORT || 8080; // || can be used to give default values to variables if first value is falsy
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

/**
 * View engine set to EJS.
 */
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs")); to change default folder of views

/**
 * Express.static middleware to set static files.
 */
app.use(express.static(path.resolve(__dirname, "assets")));

/**
 * Database connections and configuration
 */
const mongoose = require('mongoose');
const dbConfig = process.env.MongoURI; // check for special characters in the MongoDB URI to replace them with percentage encoding
mongoose.connect(dbConfig, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

/**
 * Express session middleware. Using mongodb for sessionstorage
 * instead of memory so sessions don't disappear upon server
 * restart.
 */
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.session_secret,
    store: MongoStore.create({mongoUrl : process.env.MongoURI}),
    resave: true,
    saveUninitialized: true
}));

/**
 * Passport middleware for authentication
 */
const passport = require('passport');
require('./server/utils/passport')(passport);
// has to be after session middleware
app.use(passport.initialize());
app.use(passport.session());

/**
 * Flash messages setup.
 */
const flash = require('connect-flash');
app.use(flash());

/**
 * Middleware to pass data into all EJS templates for use. 
 */
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error');
    next();
});

/**
 * Load routers so that any url starting with / will load all the subpaths in router.js
 * Must be at the end of all middleware
 */
app.use('/', require('./server/routes/router'));

/**
 * TODO:
 * 1. prevent reload on remove/add to watch list
 * 2. slider in front page with anime by season
 * 5. fix stale cache
 * 7. pagination in search and watch list
 * 8. fix hamburger icon
 * 9. show search result without reloading by fillin in input from prev search
 * 11. fix html title for each page
 */

