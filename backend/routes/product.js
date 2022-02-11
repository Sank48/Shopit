const express = require('express')
const router = express.Router();


const{ getProducts, 
		newProduct, 
		getSingleProduct, 
		updateProduct, 
		deleteProduct, 
		createProductReview,
		getProductReview,
		deleteReview
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles }=require('../middleware/auth');

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/products/:id')
			.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
			.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReview);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;