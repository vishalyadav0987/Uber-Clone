const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const BlackListToken = require('../models/BlackListToken');
const CaptainSchema = require('../models/CaptainSchema');

const a = "vishal yadav"

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(404).json({ success: false, message: "Un-Authorized" });
    }

    // Checking for blackKist token
    // because after user logout we need to add token in black list model
    // if user hold the token they can miss use the token

    const blackListToken = await BlackListToken.findOne({ token });

    if (blackListToken) {
        return res.status(404).json({ success: false, message: "Un-Authorized" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserSchema.findById(decode._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        req.user = user;

        return next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong in authuser!" });
    }

}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Checking for blackKist token
        // because after user logout we need to add token in black list model
        // if user hold the token they can miss use the token

        const blackListToken = await BlackListToken.findOne({ token });

        if (blackListToken) {
            return res.status(404).json({ success: false, message: "Un-Authorized" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainSchema.findById(decode._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.captain = captain;
        return next();
    } catch (error) {
        console.log("Smething went wrong in authCaptain Function ", error.message);
        return res.status(500).json({ message: "Unauthorized", success: true });
    }
}

module.exports = {
    authUser,
    authCaptain,
}