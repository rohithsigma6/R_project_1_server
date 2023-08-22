const { Product } = require('./schema')

module.exports.AddProduct = async (req, res) => {
    try {
        const data = await Product.create(req.body)
        if (data) {
            return res.json({ success: true, message: "Product added successfully" })
        }

        return res.json({ success: false, message: "product adding failed" })

    } catch (err) {
        return res.json({ success: false, message: err })
    }

}
module.exports.GetProducts = async (req, res) => {
    try {
        const data = await Product.find(req.body)
        if (data) {
            return res.json({ success: true, message: "Products fetched successfully",data })
        }

        return res.json({ success: false, message: "products fetching failed" })

    } catch (err) {
        return res.json({ success: false, message: err })
    }

}

module.exports.GetProduct = async (req, res) => {
    try {
        const data = await Product.findById(req.body._id)
        if (data) {
            return res.json({ success: true, message: "Product fetched successfully",data })
        }

        return res.json({ success: false, message: "product fetching failed" })

    } catch (err) {
        return res.json({ success: false, message: err })
    }

}

