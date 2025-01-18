const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const BlackListToken = require('../models/BlackListToken')

const a = "vishal yadav"

const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(404).json({success:false,message:"Un-Authorized"});
    }

    // Checking for blackKist token
    // because after user logout we need to remove token from black list
    // if user hold the token they can miss use the token

    const blackListToken = await BlackListToken.findOne({token});

    if(blackListToken){
        return res.status(404).json({success:false,message:"Un-Authorized"});
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserSchema.findById(decode._id);
        if(!user){
            return res.status(404).json({success:false,message:"User Not Found"});
        }
        req.user = user;

        return next();
    } catch (error) {
        return res.status(500).json({success:false,message:"Something went wrong in authuser!"});
    }

}

module.exports = {
    authUser
}