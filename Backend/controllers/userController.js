const UserSchema = require('../models/UserSchema');
const { validationResult } = require('express-validator');
const { createUser } = require('../Services/userServices');

// REGISTER Function
const registerUser = async(req,res)=>{
    // STORE VALIDATION ERRORS
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    const {fullname,email,password} = req.body;

    const hashedPassword = await UserSchema.hashPassword(password);

    const user = await createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
        token,
        user,
        success: true,
    })
}


// LOGINUSER Function
const loginUser = async(req,res)=>{
    // STORE VALIDATION ERRORS
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    const {email,password} = req.body;

    const user = await UserSchema.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({success:false,message:"Invalid Email or Password"})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({success:false,message:"Invalid Email or Password"})
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
        token,
        user,
        success: true,
    });
}


// GET USER PROFILE Function
const getUserProfile = async(req,res)=>{
    const user = req.user;
    
    res.status(200).json({
        user,
        success: true,
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
}