const DeliveryAddress = require('./model')

const getDeliveryAddress = async (req, res, next) => {
    try {
        const newDeliveryAddress = await DeliveryAddress.find({ user: req.user.id }).populate('user', 'full_name')

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newDeliveryAddress
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const postDelveryAddress = async (req, res, next) => {
    try {
        const { name, kelurahan, kecamatan, kabupaten, provinsi, detail } = req.body

        const newDeliveryAddress = await DeliveryAddress.create({
            name, kelurahan, kecamatan, kabupaten, provinsi, detail, user: req.user.id
        })

        res.status(201).json({
            error: false,
            message: 'create Delivery Address success',
            datas: newDeliveryAddress
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const updateDeliveryAddress = async (req, res, next) => {
    try {
        const { name, kelurahan, kecamatan, kabupaten, provinsi, detail } = req.body

        const newDeliveryAddress = await DeliveryAddress.updateOne({ _id: Object(req.params.id) }, {
            name, kelurahan, kecamatan, kabupaten, provinsi, detail
        })

        if (newDeliveryAddress.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update data success',
                datas: newDeliveryAddress
            })
        } else {
            return res.status(201).json({
                error: false,
                message: 'deliveri addres is not update',
                datas: newDeliveryAddress
            })
        }
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getDeliveryAddress,
    postDelveryAddress,
    updateDeliveryAddress
}