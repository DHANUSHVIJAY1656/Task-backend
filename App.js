const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware =require('./middlerware/errorMiddleware')
const router = require('./routes/Routes');

dotenv.config();
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Routes
app.use('/api', router);
app.use("/", (req, res) => {
    res.send("Hello World")
})

// Error Handling Middleware 
app.use(errorMiddleware);

module.exports = app;
