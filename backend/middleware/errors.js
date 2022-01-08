const errorHandler = require('../utils/errorHandler');
// const path = '../utils'
// console.log(path)

module.exports = (err ,req, res, next)=>{
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error"

	res.json({
		success: false,
		error: err.stack
	})
}