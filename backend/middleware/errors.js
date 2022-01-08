const errorHandler = require('../utils/errorHandler');
// const path = '../utils'
// console.log(path)

module.exports = (err ,req, res, next)=>{
	err.statusCode = err.statusCode || 500;

	if(process.env.NODE_ENV==="DEVELOPMENT"){
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errorMessage: err.message,
			stack: err.stack
		})
	}

	if(process.env.NODE_ENV==="PRODUCTION"){
		res.json({
			success: false,
			message: err.message || "Internal Server Error"
		})
	}
	
}