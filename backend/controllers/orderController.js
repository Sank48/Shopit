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

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async(req, res, next)=>{
	const order = await Order.findById(req.params.id).populate('user', 'name email')

	if(!order){
		return next(new ErrorHandler('No order found with this ID',404))
	}

	res.status(200).json({
		success: true,
		order
	})
})

// Get logged in user orders => /api/v1/orders/me
exports.myOrder = catchAsyncError(async(req, res, next)=>{
	const order = await Order.find({user: req.user.id})

	res.status(200).json({
		success: true,
		order
	})
})

// Get all orders 'admin' => /api/vq/admin/orders/
exports.allOrders = catchAsyncError(async(req, res, next)=>{
	const order = await Order.find()

	let totalAmt = 0;
	order.forEach(order =>{
		totalAmt+=order.totalPrice;
	})

	res.status(200).json({
		success: true,
		TotalAmount: totalAmt,
		order
	})
})