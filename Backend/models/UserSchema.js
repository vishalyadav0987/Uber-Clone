const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters"],
        },lastname:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email must be at least 5 characters long"],
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters long"],
        select:false,
        },
    socketId:{
        type:String,
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET); // Make sure JWT_SECRET is correct in your environment variables
    return token;
};


UserSchema.statics.hashPassword = async(password) =>{
    return await bcryptjs.hash(password,10);
}

UserSchema.methods.comparePassword = async function (password) {
    if (!password || !this.password) {
        throw new Error("Password or hashed password is missing");
    }

    return await bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("user", UserSchema)