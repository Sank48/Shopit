const express = require('express')
const router = express.Router();


const{ getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')

const { isAuthenticatedUser }=require('../middleware/auth');

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id').put(updateProduct);

router.route('/admin/products/:id').delete(deleteProduct);


module.exports = router;