const express = require('express');
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');



router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    body('vehicle.color').isLength({ min: 3 }).withMessage('vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 6 }).withMessage(' vehicle plate number must be at least 6 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage(' capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car' ,'motorcycle' ,'auto']).withMessage('invalid vehicle type'),

], captainController.registerCaptain
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile);

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;