const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        rating: {
            rate: {
                type: String
            },
            count: {
                type: String
            }
        }
}, {
    timestamps: true
})

module.exports.Product = new mongoose.model("Product", productSchema)