const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const CaptainSchema = new mongoose.Schema({
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
        lowerCase:true,
        match:[/^|S+@|S+|.|S+$/,'Please enter valid email'],
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters"],
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","inactive"],
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,'Capacity must be at least 1'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["Car","Motorcycle","Auto"],
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        },
    }

});

const modalExport = mongoose.model('captain', CaptainSchema);

CaptainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY
        , { expiresIn: '1h' });
        return token;
}

CaptainSchema.statics.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password);
}

CaptainSchema.methods.hashPassword = async function(password){
    return await bcryptjs.hash(password,10);
  
}

module.exports = modalExport;



