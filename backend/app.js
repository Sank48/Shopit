const express = require('express');
const app = express();

app.use(express.json());


// Import all routes
const products = require('./routes/product')
const error = require('./middleware/errors')

app.use('/api/v1', products)

app.use(error)

module.exports = app;