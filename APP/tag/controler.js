const Tag = require('./model')

const getTags = async (req, res, next) => {
    try {
        const newTag = await Tag.find()

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newTag
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

const postTag = async (req, res, next) => {
    try {
        const newTag = await Tag.create({ name: req.body.name })

        res.status(201).json({
            error: false,
            message: 'post data Tag success',
            datas: newTag
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

const updateTag = async (req, res, next) => {
    try {
        const newTag = await Tag.updateOne({ _id: Object(req.params.id) }, { name: req.body.name })

        if (newTag.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update Tag success',
                datas: newTag
            })
        } else {
            return res.status(201).json({
                error: false,
                message: 'Tag is not Update',
                datas: newTag
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

const deleteTag = async (req, res, next) => {

    try {
        await Tag.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: ' delete data tag success'
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

module.exports = {
    getTags,
    postTag,
    updateTag,
    deleteTag
}