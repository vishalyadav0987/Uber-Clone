const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/userController");
const { authUser } = require("../middleware/authMiddleware");

router.post('/register',[
    // THIS ONLY CHECK  IF THE INPUT IS A STRING IS CORRECT OR NOT
    // IT STORE IN ERROR ARRAY IF IT IS NOT CORRECT
    // AND SHOW THROUGH VALIDATIONRESULT FUNCTION IN CONTROLLER
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Firstname must be at least 3 characters"),
    body('password').isLength({min:8}).withMessage("Password must be at least 8 characters"),
],registerUser);


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:8}).withMessage("Password must be at least 8 characters"),
],loginUser);


router.get('/profile',authUser,getUserProfile);
router.get('/logout',authUser,logoutUser);




module.exports=router