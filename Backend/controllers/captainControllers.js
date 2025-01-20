const CaptainSchema = require('../models/CaptainSchema');
const { validationResult } = require('express-validator');
const captainService = require('../Services/captainServices')


// REGISTER CAPTAIN FUNCTION
const registerCaptian = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptianAlreadyExist = await CaptainSchema.findOne({ email: email });

    if(isCaptianAlreadyExist){
        return res.json({success:false,message:"User Already Exist."});
    }

    const captain = await captainService.createCaptain({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ success: true, captain, token,
        message:"Captain Succesfully register!"
     });


}// END OF REGISTER CAPTAIN FUNCTION


module.exports = {
    registerCaptian,
}