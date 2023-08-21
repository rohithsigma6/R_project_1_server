const router = require('express').Router()
const {verifyToken,isAdmin} = require('../../middlewares/auth')
const controller = require('./controller')
router.post('/createuser', controller.Register)
router.post('/login',controller.Login)
router.post('/testroute',verifyToken,isAdmin,controller.TestRoute)
module.exports = router 