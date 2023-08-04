const jwt = require('../utils/jwt')

module.exports = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            return res.status(404).json({ message: 'unauthorized access' })
        }
    } catch (error) {
        next(error)
    }
}