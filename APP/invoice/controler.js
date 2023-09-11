const Invoice = require('./model')
const Cart = require('../cart/model')

// import utils invoice number
const invGenerator = require('../../utils/invoice-number-generator')
const { json } = require('express')

const getInvoice = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const allInvoice = await Invoice.find().populate('user', 'full_name')
                .populate({
                    path: 'carts',
                    populate: [
                        {
                            path: 'product',
                            select: 'name description price image stock'
                        },
                        {
                            path: 'qty'
                        }
                    ]
                })
                .populate('address')

            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: allInvoice
            })
        } else {
            const newInvoice = await Invoice.find({ user: req.user.id }).populate('user', 'full_name')
                .populate({
                    path: 'carts',
                    populate: [
                        {
                            path: 'product',
                            select: 'name description price image stock'
                        },
                        {
                            path: 'qty'
                        }
                    ]
                })
                .populate('address')

            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: newInvoice
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

const generetInvoice = async (req, res, next) => {
    try {
        const { cartId, addressId } = req.body

        const newInvoice = await Invoice.create({
            invoiceNumber: invGenerator(req.user.id),
            user: req.user.id,
            carts: cartId,
            address: addressId,
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

const updateManyInvoice = async (req, res, next) => {
    try {
        const { invoiceId, isPaid } = req.body

        if (isPaid !== 'pending' && isPaid !== 'success') {
            return res.status(400).json({
                error: true,
                message: 'Invalid value for isPaid. Only "pending" or "success" are allowed.'
            })
        }

        const updateInvoice = await Invoice.updateMany({ _id: { $in: invoiceId } }, { $set: { isPaid: isPaid } })

        res.status(200).json({
            error: false,
            message: 'UpdateMany success',
            datas: updateInvoice
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400), json({
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
    generetInvoice,
    updateManyInvoice
}