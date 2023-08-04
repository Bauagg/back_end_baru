const jwt = require('../utils/jwt')
const { getToken } = require('../utils/getToken')
module.exports = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) {
            return res.status(403).json({ error: true, message: 'authentication failed' })
        }

        const validateToken = jwt.validateToken(token)
        if (!validateToken) {
            return res.status(403).json({ error: true, message: 'authentication failed' })
        }

        req.user = validateToken
        next()
    } catch (err) {
        next(err)
    }
}
