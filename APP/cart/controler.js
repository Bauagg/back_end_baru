const Cart = require('./model')

const getCart = async (req, res, next) => {
    try {
        const newCart = await Cart.find({ user: req.user.id }).populate('product').populate('user', 'full_name')

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newCart
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

const createCart = async (req, res, next) => {
    try {
        const { product, qty } = req.body

        const newCart = await Cart.create({ product, qty, user: req.user.id })

        res.status(201).json({
            error: false,
            message: 'create cart success',
            datas: newCart
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

const updateCart = async (req, res, next) => {
    try {
        const { product, qty } = req.body

        const newCart = await Cart.updateOne({ _id: req.params.id }, { product, qty })

        if (newCart.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'data cart berhasil di update',
                datas: newCart
            })
        } else {
            return res.status(201).json({
                error: false,
                message: 'data cart is not update',
                datas: newCart
            })
        }
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

const deleteCart = async (req, res, next) => {
    try {
        await Cart.deleteOne({ _id: Object(req.params.id) }, { user: req.user.id })

        res.status(200).json({
            error: false,
            message: 'delete data cart success'
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
    getCart,
    createCart,
    updateCart,
    deleteCart
}