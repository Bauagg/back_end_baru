const router = require('express').Router()

// controler
const controlerTag = require('./controler')

// midelware
const authenticationmidelware = require('../../midelware/authorization')
const adminAuthentication = require('../../midelware/admin-athorization')

router.get('/tag', controlerTag.getTags)
router.post('/tag', authenticationmidelware, adminAuthentication, controlerTag.postTag)
router.put('/tag/:id', authenticationmidelware, adminAuthentication, controlerTag.updateTag)
router.delete('/tag/:id', authenticationmidelware, adminAuthentication, controlerTag.deleteTag)

module.exports = router