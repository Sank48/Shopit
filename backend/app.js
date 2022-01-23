const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require('./routes/product')
const error = require('./middleware/errors')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth);

app.use(error)

module.exports = app;