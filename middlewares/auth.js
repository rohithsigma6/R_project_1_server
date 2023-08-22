const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel/schema');
module.exports.verifyToken = async (req, res, next) => {
   
    try {
      
        const tokenverification = jwt.verify(req.body.headers.Authorization, process.env.JWTSECRET);
        req.user = tokenverification
        console.log(req.user)
        next()
    } catch (err) {
        console.log(err)
       return res.json({success:false,err:err})
    }
}

module.exports.isAdmin = async (req, res, next) => {
    try {
        const isUserAdmin = await User.findById(req.user._id); 
        if (isUserAdmin.role == 0) {
            return res.json({ success: false, message: "Unauthorized access" })
        }
        next()
    }
    catch (err) {
        console.log(err)
    }
}