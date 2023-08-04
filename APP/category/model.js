const mongoose = require('mongoose')

const modelCategory = mongoose.Schema({
    name: {
        type: String,
        maxlength: [50, 'max karakter 50 karakter'],
        minlength: [3, 'min karakter 3 karakter'],
        required: [true, 'name harus di isi']
    }
})

const Category = mongoose.model('Category', modelCategory)

module.exports = Category