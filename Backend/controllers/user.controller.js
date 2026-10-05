const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistmodel = require ('../models/blacklistToken.model');



module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname , email, password } = req.body;

    const isUserExist =await captainModel.findOne({email});
        if(isUserExist){
            return res.status(400).json({message:'Captain already exist'});
        }

    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userService.createUser({ firstname : fullname.firstname , lastname: fullname.lastname, email, password: hashedPassword });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });

}; 

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });


    res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res,next) => {
     res.status(200).json({ user: req.user });
};

module.exports.logoutuser =async (req,res,next)=> {
    
        const token =req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
        if (token) {
            await blacklistmodel.create({ token });
        }
    
        res.clearCookie('token');
    
        res.status(200).json({
            message: 'logged out successfully'
        });
};