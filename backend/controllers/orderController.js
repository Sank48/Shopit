const Order = require('../models/orders')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncError(async(req, res, next)=>{
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo
	} = req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id
	})

	res.status(200).json({
		success: true,
		order
	})
})