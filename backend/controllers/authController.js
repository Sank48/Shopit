const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

exports.registerUser = catchAsyncError(async(req,res,next)=>{
	const {name, email, password} = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar:{
			public_id: 'asd',
			url:'qwe'
		}
	})

	sendToken(user, 200, res);
})

// Login user => /api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{
	const {email, password} = req.body;

	// Checks if email and password is given in input
	if(!email||!password){
		return next(new ErrorHandler('Please enter email and password', 400));
	}

	//Finding user in database
	const user = await User.findOne({email}).select('+password');

	if(!user){
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	//Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	if(!isPasswordMatched){
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	sendToken(user, 200, res);


})

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
	const user = await User.findOne({email: req.body.email});

	if(!user){
		return next(new ErrorHandler('User not found with this email', 404));
	}

	// Get Reset Token
	const resetToken = user.getResetPasswordToken();

	await user.save({validationBeforeSave: false})

	// Create reset password url
	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

	const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try{
		await sendEmail({
			email: user.email,
			subject: 'ShopIT Password Recovery',
			message
		})

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email}`
		})
	}catch(err){
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({validationBeforeSave: false})
		return next(new ErrorHandler(err.message, 500))		
	}
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async(req, res, next)=>{
	// Hash url token 
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	// Check for token expiry
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {$gt : Date.now()}
	}) 

	// if token expired
	if(!user){
		return next(new ErrorHandler('Password reset token is invalid or expired!',400));
	}

	// if passwords don't match
	if(req.body.password!=req.body.confirmPassword){
		return next(new ErrorHandler("Passwords don't match", 400))
	}

	// Setup new password 
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);

})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next)=>{
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user
	})
})

// Update Password => /api/v1/password/update
exports.updateProduct = catchAsyncError(async(req, res, next)=>{
	const user = await User.findById(req.user.id).select("+password");

	// Check old password
	const isMatched = await user.comparePassword(req.body.oldPassword);
	if(!isMatched){
		return next(new ErrorHandler("Old Password is incorrect!",404));
	}

	user.password = req.body.password;
	await user.save();

	sendToken(user, 200, res);

})

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async(req, res, next)=>{
	const newUserData = {
		name: req.body.name,
		email: req.body.email
	}

	//Update avatar : TODO

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	})

	res.status(200).json({
		success: true
	})
})

// Logout user => /api/v1/logout
exports.logout = catchAsyncError( async (req, res, next)=>{
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true
	})

	res.status(200).json({
		success: true,
		message: "Logged out"
	})
})