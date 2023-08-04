const User = require('./model')

const bcrypt = require('../../utils/bcrypt')
const jwt = require('../../utils/jwt')

const register = async (req, res, next) => {
    try {
        const { full_name, email, password, role } = req.body

        const isEmailRegister = await User.exists({ email })
        if (isEmailRegister) {
            return res.status(400).json({ error: 'email sudah terdaftar' })
        }

        const newUser = await User.create({ full_name, email, password: await bcrypt.hashPassword(password), role })

        return res.status(201).json({
            error: false,
            message: 'register success',
            datas: newUser
        })
    } catch (err) {
        if (err && err.name == 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const newUser = await User.findOne({ email })
        if (!newUser) {
            return res.status(400).json({
                error: true,
                message: 'invalid email / password'
            })
        }

        const validationPassword = await bcrypt.validatePassword(password, newUser.password)
        if (!validationPassword) {
            return res.status(400).json({
                error: true,
                message: 'invalid email / password'
            })
        }

        const tokenPayload = {
            id: newUser._id,
            name: newUser.full_name,
            email: newUser.email,
            role: newUser.role
        }

        const jwtToken = jwt.createToken(tokenPayload)

        res.status(200).json({
            error: false,
            message: 'login success',
            datas: {
                name: newUser.full_name,
                email: newUser.email,
                role: newUser.role,
                token: jwtToken
            }
        })
    } catch (err) {
        if (err && err.name == 'ValidationError') {
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
    register,
    login
}