const mongoose = require('mongoose')

const modelInvoice = mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: [true, 'invoice number cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryAddress'
    },
    isPaid: {
        type: String,
        enum: ['pending', 'success'],
        messsage: '{VALUE} is not supported',
        default: 'pending'
    }
})

const Invoice = mongoose.model('Invoice', modelInvoice)

module.exports = Invoice