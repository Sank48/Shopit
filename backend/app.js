const express = require('express');
const app = express();

app.use(express.json());


// Import all routes
const products = require('./routes/product')
const error = require('./middleware/errors')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth);

app.use(error)

module.exports = app;