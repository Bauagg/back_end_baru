const router = require('express').Router()

const controlerUser = require('./controler')

router.post('/register', controlerUser.register)
router.post('/login', controlerUser.login)

module.exports = router