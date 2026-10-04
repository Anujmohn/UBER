const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

app.use(cors());   // change when production domain is known


