const userModel  = require('../models/user.model');
const captainModel =require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistmodel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const blacklistmodel = require('../models/blacklistToken.model');

    if(isblacklisted){
        return res.status(401).json({message: "Unauthorized access"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}    



module.exports.authCaptain = async (req, res, next) => {
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

const isblacklisted = await blacklistmodel.findOne({ token: token });

    if(isblacklisted){
        return res.status(401).json({message: "Unauthorized access"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
} 