const router = require('express').Router()

const controlerCart = require('./controler')

// midelware
const authorizationMidelware = require('../../midelware/authorization')

router.get('/cart', authorizationMidelware, controlerCart.getCart)
router.post('/cart', authorizationMidelware, controlerCart.createCart)
router.put('/cart/:id', authorizationMidelware, controlerCart.updateCart)
router.delete('/cart/:id', authorizationMidelware, controlerCart.deleteCart)

module.exports = router