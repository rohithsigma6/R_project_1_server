const router = require('express').Router()
const {verifyToken,isAdmin} = require('../../middlewares/auth')
const controller = require('./controller')

router.post('/addtocart',verifyToken, controller.AddToCart);
router.post('/getcartitems',verifyToken,controller.getCartItems)
router.put('/updatecart',verifyToken, controller.updateCart);
router.post('/removefromcart/:product', verifyToken, controller.removeFromCart);
router.post('/clearcart',verifyToken, controller.clearCart);

module.exports = router