const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
    mal_ID : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    image_url : String
})

module.exports = mongoose.model('Anime', AnimeSchema);