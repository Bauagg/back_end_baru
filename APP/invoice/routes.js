const router = require('express').Router()

const controlerInvoice = require('./controler')

const authorizationMidelware = require('../../midelware/authorization')
const adminAuthorization = require('../../midelware/admin-athorization')

router.get('/invoice', authorizationMidelware, controlerInvoice.getInvoice)
router.post('/invoice', authorizationMidelware, controlerInvoice.generetInvoice)
router.put('/invoice', authorizationMidelware, adminAuthorization, controlerInvoice.updateManyInvoice)

module.exports = router