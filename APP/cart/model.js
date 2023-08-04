const mongoose = require('mongoose')

const modelCart = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    qty: {
        type: Number,
        required: [true, 'qty harus di isi'],
        min: [1, 'minimal qty berisi 1']
    }
})

const Cart = mongoose.model('Cart', modelCart)

module.exports = Cart