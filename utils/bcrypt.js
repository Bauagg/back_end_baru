const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: (password) => {
        return bcrypt.hash(password, 10)
    },
    validatePassword: (password, dbPassword) => {
        return bcrypt.compare(password, dbPassword)
    }
}