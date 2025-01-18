const mongoose = require('mongoose');

const blacklistToken = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    cretedAt:{
        type:Date,
        default:Date.now,
        expires:86400, // 24hr in seconds
    }
});

module.exports = mongoose.model("blacklistToken",blacklistToken);