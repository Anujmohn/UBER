const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const connectDB = require('./connections/connect');
connectDB();
const userRoutes = require('./routes/user.routes');



app.use(cors());   // change when production domain is known

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/users', userRoutes);

module.exports = app;