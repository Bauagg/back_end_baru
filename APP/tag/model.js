const mongoose = require('mongoose')

const modelTags = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        minlength: [3, 'min karakter 3 karakter'],
        maxlength: [50, 'max karakter 50 karakter']
    }
})

const Tag = mongoose.model('Tag', modelTags)

module.exports = Tag