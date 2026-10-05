const captainModel = require("../models/captain.model");
const captainService =require('../services/captain.service');
const {validationResult} =require('express-validator');
const blacklistmodel = require ('../models/blacklistToken.model');



module.exports.registerCaptain =async(req,res ,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{ fullname ,email ,password ,vehicle} =req.body;

    const isCaptainExist =await captainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message:'Captain already exist'});
    }


    const hashPassword = await captainModel.hashedPassword(password);

    const captain =await captainService.createCaptain({
        firstname: fullname.firstname,
        llastname: fullname.lastname,
        email, password : hashPassword,
        color: vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token ,captain})

}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });


    res.status(200).json({ captain, token });
};


module.exports.getCaptainProfile = async (req, res,next) => {
     res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {

    const token =req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (token) {
        await blacklistmodel.create({ token });
    }

    res.clearCookie('token');

    res.status(200).json({
        message: 'logged out successfully'
    });
};