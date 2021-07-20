const express = require('express'); //runs the express.js and returns the exports object into variable, like importing
const morgan = require('morgan');
const path = require("path"); // built in lib to use paths for any os

const dotenv = require('dotenv'); // dotenv is a library to extract variables from a .env and load into process.env as env variable
dotenv.config({path: 'config.env'}) // specify the path of the dotenv file

const bodyparser = require("body-parser"); // library that parses HTTP post requests to get the form data and convert it into objects

const app = express(); // makes the app

const PORT = process.env.PORT || 8080; // || can be used to give default values to variables if first value is falsy

//  function to run when root url is called
app.get('/', (req,res)=>{
    res.send("AniTrack");
});

// specifies the port the app will listen to, function is a callback that gets called after app is initialized
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

// morgan is a library used to log HTTP requests on the console
app.use(morgan('tiny'));

// set body parser
app.use(bodyparser.urlencoded({extended: true}));

// set view engine
app.set("view engine", "ejs");
// below line is for when we change location of all ejs files into someplace else other than views
// it then sets the dir of views into another path, where __dirname returns the dir of the current file
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

const request = require('request');

// request to get first page of comedy anime
request('https://api.jikan.moe/v3/genre/anime/4/1', { json : true}, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log("hi");
    body.anime.forEach((anime) => {
        console.log(anime.title);
    });
    
})


