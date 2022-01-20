const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, 'Please enter your name'],
		maxLength: [30, 'Your name cannot exceed 30 characters']
	},
	email:{
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'Please enter valid email address']
	},
	password:{
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [6, 'Your password  must be longer than 6 characters'],
		select: false // whenever display user don't display its password.
	},
	avatar:{
		public_id:{
			type: String,
			required: true
		},
		url:{
			type: String,
			required: true
		}
	},
	role:{
		type: String,
		default: 'user'
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date
})

// Encrypting password before saving user
userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next()
	}

	this.password = await bcrypt.hash(this.password, 10) //encrypt this.password with salt value 10
})

// Return JWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME
	});
}

// For comparing passwords
userSchema.methods.comparePassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password); // .compare is a bcrypt method for comparing 2 passwords.
}

module.exports = mongoose.model('User', userSchema);