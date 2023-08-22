const router = require('express').Router()
const {verifyToken,isAdmin} = require('../../middlewares/auth')
const controller = require('./controller')

// router.post('/testroute',verifyToken,isAdmin,controller.TestRoute)
router.post("/createproduct",controller.AddProduct)
router.post('/getproducts',controller.GetProducts)
router.post('/getproduct',controller.GetProduct)
module.exports = router 