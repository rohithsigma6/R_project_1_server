const router = require('express').Router()
const {verifyToken,isAdmin} = require('../../middlewares/auth')
const controller = require('./controller')

router.post('/placeorder',verifyToken, controller.placeOrder);
router.post('/orders',verifyToken, controller.getOrdersForUser);

module.exports = router