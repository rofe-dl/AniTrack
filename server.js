const express = require('express'); //runs the express.js and returns the exports object into variable, like importing
const morgan = require('morgan');

const dotenv = require('dotenv'); // dotenv is a library to extract variables from a .env and load into process.env as env variable
dotenv.config({path: 'config.env'}) // specify the path of the dotenv file

const app = express(); // makes the app

const PORT = process.env.PORT || 8080; // || can be used to give default values to variables if first value is falsy

//  function to run when root url is called
app.get('/', (req,res)=>{
    res.send("Anime Tracker");
});

// specifies the port the app will listen to, function is a callback that gets called after app is initialized
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

// morgan is a library used to log HTTP requests on the console
app.use(morgan('tiny'));

