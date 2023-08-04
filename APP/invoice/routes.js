const router = require('express').Router()

const controlerInvoice = require('./controler')

const authorizationMidelware = require('../../midelware/authorization')

router.get('/invoice', authorizationMidelware, controlerInvoice.getInvoice)
router.post('/invoice', authorizationMidelware, controlerInvoice.generetInvoice)

module.exports = router