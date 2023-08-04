const mongoose = require('mongoose')

const modelProduct = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi']
    },
    description: {
        type: String,
        maxlength: [1000, 'descriptions max 1000 kararakter'],
        required: [true, 'descriptions harus di isi']
    },
    stock: {
        type: Number,
        required: [true, 'stock harus di isi']
    },
    price: {
        type: Number,
        required: [true, 'price harus di isi']
    },
    status: {
        type: Boolean,
        default: false,
    },
    image: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

const Product = mongoose.model('Product', modelProduct)

module.exports = Product