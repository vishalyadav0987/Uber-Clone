const CaptainSchema = require('../models/CaptainSchema');

const createCaptain = async({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{
    if(!firstname  || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('Please fill all the fields');
    }

    const captain = CaptainSchema.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType,
        }
    });

    return captain;
}

module.exports = createCaptain;