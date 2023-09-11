const jwt = require('jsonwebtoken')

const config = require('../APP/config')

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, config.secretkey)
    },
    validateToken: (token) => {
        try {
            return jwt.verify(token, config.secretkey)
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new Error('Token has expired')
            } else {
                throw new Error('Invalid token')
            }
        }
    }
}