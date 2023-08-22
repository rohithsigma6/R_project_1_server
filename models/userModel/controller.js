const { User } = require('./schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.Register = async (req, res) => {
    try {
        const isEmailRegistered = await User.findOne({ email: req.body.email })
        if (isEmailRegistered) {
            return res.json({ success: false, message: "Email Already Registered" })
        }
        const isNumberRegistered = await User.findOne({ phone: req.body.phone })
        if (isNumberRegistered) {
            return res.json({ success: false, message: "Number Already Registered" })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const postUser = await User.create({ ...req.body, password: hashedPassword })
        if (postUser) {
            return res.json({ success: true, message: "User Registered successfully" })
        }
        return res.json({ success: false, message: "Error While Registering" })

    } catch (err) {
        return res.json({ success: false, message: "User Registration Failed", err: err })
    }
}

module.exports.Login = async (req, res) => {
    try {
        const isUserRegistered = await User.findOne({ email: req.body.email })
        if (!isUserRegistered) {
            return res.json({ message: "Email not found", success: false })
        }
        const isPassword = await bcrypt.compare(req.body.password, isUserRegistered.password)
        if (!isPassword) {
            return res.json({ success: false, message: "Incorrect Password" })
        }
        const token = await jwt.sign({ _id: isUserRegistered._id }, process.env.JWTSECRET, {
            expiresIn: "7d"
        });
        if (!token) {
            return res.json({ success: false, message: "Error logging in" })
        }
        return res.json({ success: true, message: "Login Successful", token: token })

    }
    catch (err) {
        return res.json({ success: false, message: "Error logging in", err: err })
    }
}
module.exports.TestRoute = async(req,res)=>{
    console.log(req.body)
    try{
        return res.json({success:true,message:"protected Route"})
    }
    catch(err){
        
        return res.json({success:true,message:"UnAuthorized access"})
    }
    
}