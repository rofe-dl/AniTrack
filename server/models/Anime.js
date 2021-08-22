const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
    mal_id : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    image_url : String,
    episodes : Number
})

module.exports = mongoose.model('Anime', AnimeSchema);