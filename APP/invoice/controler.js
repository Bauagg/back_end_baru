const Invoice = require('./model')
const Cart = require('../cart/model')

// import utils invoice number
const invGenerator = require('../../utils/invoice-number-generator')

const getInvoice = async (req, res, next) => {
    try {
        const newInvoice = await Invoice.find({ user: req.user.id }).populate('user', 'full_name')
            .populate({
                path: 'carts',
                select: { _id: 1, product: 1 },
                populate: {
                    path: 'product',
                    model: 'Product',
                    select: '_id'
                },
                populate: {
                    path: 'qty'
                }
            })
            .populate('products')
            .populate('address')

        res.status(200).json({
            error: false,
            message: 'get data invoice success',
            datas: newInvoice
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const generetInvoice = async (req, res, next) => {
    try {
        const { cartId, addressId } = req.body

        const newCart = await Cart.findById(cartId).populate('product')

        if (!newCart) {
            return res.status(404).json({
                error: true,
                message: 'Cart not found'
            });
        }

        const products = newCart.product.map((item) => item._id)

        const newInvoice = await Invoice.create({
            invoiceNumber: invGenerator(req.user.id),
            user: req.user.id,
            carts: cartId,
            products: products,
            address: addressId,
            isPaid: false
        })

        res.status(201).json({
            error: false,
            message: 'invoice generated',
            datas: newInvoice
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getInvoice,
    generetInvoice
}