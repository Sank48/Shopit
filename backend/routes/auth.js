const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const {registerUser, 
		loginUser,
		logout,
		forgotPassword, 
		resetPassword, 
		getUserProfile,
		updateProduct,
		updateProfile,
		allUsers,
		getUserDetails,
		updateUser,
		deleteUser}=require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updateProduct)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/logout').get(logout);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/admin/user/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports=router;