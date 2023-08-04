const router = require('express').Router()

// controler
const controlerCategory = require('./controler')

// midelware
const authorizationMidelware = require('../../midelware/authorization')
const adminAuthorization = require('../../midelware/admin-athorization')

router.get('/category', controlerCategory.getCategory)
router.post('/category', authorizationMidelware, adminAuthorization, controlerCategory.postCategory)
router.put('/category/:id', authorizationMidelware, adminAuthorization, controlerCategory.updateCategory)
router.delete('/category/:id', authorizationMidelware, adminAuthorization, controlerCategory.deleteCategory)

module.exports = router