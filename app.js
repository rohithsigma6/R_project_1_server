const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const connect = () => {
    return mongoose.connect(process.env.MONGOURL)
}

const userRoutes = require('./models/userModel/routes')
const productRoutes = require('./models/productModel/routes')
const cartRoutes = require('./models/cartModel/routes')
const orderRoutes = require('./models/orderModel/routes')
app.use('/v1', userRoutes)
app.use('/v1', productRoutes)
app.use('/v1', cartRoutes)
app.use('/v1',orderRoutes)
app.listen(process.env.PORT || 3999, () => {
    connect()
    console.log("DB connected")
})

