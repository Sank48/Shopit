const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const {newOrder,
		getSingleOrder,
		myOrder,
		allOrders} = require('../controllers/orderController')

router.route('/order/new').post(isAuthenticatedUser ,newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrder);
router.route('/admin/orders').get(isAuthenticatedUser, allOrders);

module.exports = router;