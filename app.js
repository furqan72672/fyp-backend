const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')

mongoose.connect('mongodb+srv://SalesAlibi:SalesAlibi@cluster0.46a8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next();
})


app.use(morgan('dev'))
app.use('/users', userRoute)


app.use((req, res, next) => {
    const error = new Error('Specified Route was not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message
    });
});

module.exports = app