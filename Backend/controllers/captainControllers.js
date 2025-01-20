const CaptainSchema = require('../models/CaptainSchema');
const { validationResult } = require('express-validator');
const {createCaptain} = require('../Services/captainServices');
const BlackListToken = require('../models/BlackListToken')


// REGISTER CAPTAIN FUNCTION
const registerCaptian = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptianAlreadyExist = await CaptainSchema.findOne({ email: email });

    if (isCaptianAlreadyExist) {
        return res.json({ success: false, message: "User Already Exist." });
    }

    const hasshedPassword = await CaptainSchema.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hasshedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({
        success: true, captain, token,
        message: "Captain Succesfully register!"
    });


}// END OF REGISTER CAPTAIN FUNCTION


// CAPTAIN LOGIN FUNCTION

const captainLogin = async(req,res)=>{
    const errors = validationResult(req);
    const {email,password} = req.body;
    try {
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        if(!email || !password){
            return res.status(400).json({ errors: "Email and password are required." });
        }

        const captain = await CaptainSchema.findOne({email}).select("+password");

        if(!captain){
            return res.status(400).json({ errors: "Invalid email or password." });
        }

        const isMatch = await captain.comparePassword(password,captain.password);

        if(!isMatch){
            return res.status(400).json({ errors: "Invalid email or password." });
        }

        const token = captain.generateAuthToken();

        res.json({success:true,token,captain,message:"Captain Succesfully logged in."})

    } catch (error) {
        console.log("Something Went Wrong in Captain login ",error.message);
        return res.json({
            success:false,
            message:error.message,
        });
        
    }
};



// CAPTAIN LOGOUT FUNCTION
const captainLogout = async(req,res)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.json({success:false,message:"Please login first."});
        }
        await BlackListToken.create({token});

        res.clearCookie('token');

        res.json({success:true,message:"Captain logged out."});
    } catch (error) {
        console.log("Something went wrong in captainLogut Function ",error.message);
        return res.json({
            success:false,
            message:error.message,
        });
    }
}


module.exports = {
    registerCaptian,
    captainLogin,
    captainLogout,
}