const Category = require('./model')

const getCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.find()

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newCategory
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

const postCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.create({ name: req.body.name })

        res.status(201).json({
            error: false,
            message: 'create data category success',
            datas: newCategory
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

const updateCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.updateOne({ _id: Object(req.params.id) }, { name: req.body.name })

        if (newCategory.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update category success',
                datas: newCategory
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'category data is not uodate',
                datas: newCategory
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

const deleteCategory = async (req, res, next) => {
    try {
        await Category.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: 'delete data success'
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
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
}