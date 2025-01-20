const express = require('express');
const { registerCaptian,captainLogin } = require('../controllers/captainControllers');
const router = express.Router();
const {body} =require('express-validator')


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters'),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:8}).withMessage('Password must be at least 3 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(["Car","Motorcycle","Auto"]).withMessage('Invalid Type'),
],registerCaptian);

router.post('/login',[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:8}).withMessage('Password must be at least 3 characters'),
],captainLogin)



module.exports = router;