const express = require('express')
const router = express.Router();


const{ getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles }=require('../middleware/auth');

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/products/:id')
			.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
			.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


module.exports = router;