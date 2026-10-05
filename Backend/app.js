const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const connectDB = require('./connections/connect');
connectDB();
const userRoutes = require('./routes/user.routes');
const captainRoutes =require('./routes/captain.routes');


app.use(cors());   // change when production domain is known

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/' , (req,res)=>{
    res.send("kyu re .....");
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

module.exports = app;