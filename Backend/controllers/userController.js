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

module.exports = {
    registerUser
}