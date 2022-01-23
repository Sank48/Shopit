const User = require('../models/user')
const catchAsyncError = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{
	const {token}=req.cookies;

	// If token doesn't exist
	if(!token){
		return next(new ErrorHandler('Login first to access this resourse.', 401))
	}

	// // If token exits then verify the token
	const decoded=jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decoded.id);

	next();
})

 // Handling user roles
 exports.authorizeRoles = (...roles)=>{
 	return (req, res, next) =>{
 		if(!roles.includes(req.user.role)){
 			next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource.`, 403));
 		}
 		next()
 	}
 }