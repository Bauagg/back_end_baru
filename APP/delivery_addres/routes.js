const router = require('express').Router()

// controler
const controlerDeliveriAddress = require('./controler')

// midelware
const authorizationMidelware = require('../../midelware/authorization')

router.get('/address', authorizationMidelware, controlerDeliveriAddress.getDeliveryAddress)
router.post('/address', authorizationMidelware, controlerDeliveriAddress.postDelveryAddress)
router.put('/address/:id', authorizationMidelware, controlerDeliveriAddress.updateDeliveryAddress)

module.exports = router