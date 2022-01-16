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
		let error = {...err}
		error.message = err.message

		//Wrong Mongoose object id error
		if(err.name==="CastError"){
			const message = `Resource not found. Invalid ${err.path}`;
			error = new errorHandler(message,400);
		}

		//Handling validation errors
		if(err.name==="ValidationError"){
			const message = Object.values(err.errors).map(value=>value.message);
			error = new errorHandler(message,400);
		}

		res.status(error.statusCode).json({
			success: false,
			message: error.message || "Internal Server Error"
		})
	}
	
}