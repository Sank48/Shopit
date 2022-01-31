const express = require('express');
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/auth');

const {registerUser, 
		loginUser,
		logout,
		forgotPassword, 
		resetPassword, 
		getUserProfile,
		updateProduct}=require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updateProduct)

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/logout').get(logout);

module.exports=router;