const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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