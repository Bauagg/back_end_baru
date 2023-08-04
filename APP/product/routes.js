const router = require('express').Router()

// controler
const controlerProduct = require('./controler')

// midelware
const authorizationMidelware = require('../../midelware/authorization')
const adminAuthorization = require('../../midelware/admin-athorization')

router.get('/product', controlerProduct.getProduct)
router.get('/product/:id', controlerProduct.getProductById)
router.post('/product', authorizationMidelware, adminAuthorization, controlerProduct.postProduct)
router.put('/product/:id', authorizationMidelware, adminAuthorization, controlerProduct.updateProduct)
router.delete('/product/:id', authorizationMidelware, adminAuthorization, controlerProduct.deleteProduct)

module.exports = router
