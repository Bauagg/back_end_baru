const Product = require('./model')
const Category = require('../category/model')
const Tag = require('../tag/model')

const getProduct = async (req, res, next) => {
    try {
        const { skip = 0, limit = 8, searchProduct = '', searchCategory = '', searchTag = [], lastId } = req.query
        let Search = {}

        if (searchProduct.length) {
            Search = {
                ...Search, name: { $regex: searchProduct, $options: 'i' }
            }
        }

        if (searchCategory.length) {
            const categoryResoul = await Category.findOne({ name: { $regex: searchCategory, $options: 'i' } })

            Search = { ...Search, category: categoryResoul._id }
        }

        if (searchTag.length) {
            const tagResoul = await Tag.find({ name: { $in: searchTag } })

            if (tagResoul.length > 0) {
                Search = { ...Search, tag: { $in: tagResoul.map((tag) => tag._id) } }
            }
        }

        // falidasi paginesen untuk perquer hanya 8 paginasen
        if (lastId) {
            Search = { ...Search, _id: { $gt: lastId } }
        }

        const newProduct = await Product.find(Search).skip(skip).limit(limit).populate('category').populate('tag').sort({ _id: 1 })

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newProduct
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

const getProductById = async (req, res, next) => {
    try {
        const newProduct = await Product.findById(req.params.id).populate('category').populate('tag')

        res.status(200).json({
            error: false,
            message: 'get product by id success',
            datas: newProduct
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

const postProduct = async (req, res, next) => {
    try {
        const { name, description, stock, price, status, image, category, tag } = req.body

        let categoryId = null
        if (category) {
            const newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } })

            if (newCategory) {
                categoryId = newCategory._id
            }
        }

        let tagId = []
        if (tag && tag.length > 0) {
            const newTag = await Tag.find({ name: { $in: tag } })

            if (newTag) {
                tagId = newTag.map((tags) => tags._id)
            }
        }

        const newProduct = await Product.create({ name, description, stock, price, status, image, category: categoryId, tag: tagId })

        res.status(201).json({
            error: false,
            message: 'post data product success',
            datas: newProduct
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

const updateProduct = async (req, res, next) => {
    try {
        const { name, description, stock, price, status, image, category, tag } = req.body

        let categoryId = null
        if (category) {
            const newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } })

            if (newCategory) {
                categoryId = newCategory._id
            }
        }

        let tagId = []
        if (tag && tag.length > 0) {
            const newTag = await Tag.find({ name: { $in: tag } })

            if (newTag) {
                tagId = newTag.map((tags) => tags._id)
            }
        }

        const newProduct = await Product.updateOne({ _id: req.params.id }, {
            name,
            description,
            stock,
            price,
            status,
            image,
            category: categoryId,
            tag: tagId
        })

        if (newProduct.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update product succses',
                datas: newProduct
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'product is not update',
                datas: newProduct
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

const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: 'delete product success'
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
    getProduct,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}