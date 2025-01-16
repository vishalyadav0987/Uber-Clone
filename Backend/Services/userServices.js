const UserSchema = require('../models/UserSchema');

const createUser = async ({firstname,lastname,email,password,}) => {
    if(!firstname || !email || !password){
        throw new Error('Please fill all the fields');
    }

    const User = UserSchema.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
    });

    return User;
}


module.exports={
    createUser,
}