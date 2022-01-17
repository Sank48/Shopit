const Product = require('../models/product')
const error = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const APIFeature = require('../utils/apiFeatures')

// Create new product => /api/v1/products/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
	const product  = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product
	})
})

// Get all Products => api/v1/products
exports.getProducts = catchAsyncError( async (req,res,next)=>{
	const apiFeature = new APIFeature(Product.find(),req.query).search();
	const product = await apiFeature.query;
	res.status(200).json({
		success: true,
		counts: product.length,
		product
		//message: 'This route will show all products in database.'
	})
})

// Get single product detail => api/v1/products/:id
exports.getSingleProduct = catchAsyncError( async (req, res, next)=>{
	const product = await Product.findById(req.params.id);

	if(!product){
		return next(new error("No product found with given ID",404));
		// res.status(404).json({
		// 	success: false,
		// 	message: "No product found with given ID."
		// })
	}else{
		res.status(200).json({
			success: true,
			product
		})
	}
})

// Update product => admin/products/:id
exports.updateProduct = catchAsyncError( async(req, res, next)=>{
	let product = await Product.findById(req.params.id);

	if(!product){
		return next(new error("No product found with given ID",404));
	}else{
		// One method
		// Product.findByIdAndUpdate(req.params.id,{
		// 	$set : req.body
		// },{new: true}).then((prod)=>{
		// 	res.status(200);
		// 	res.json(prod);
		// })

		// Second Method
		product = await Product.findByIdAndUpdate(req.params.id, req.body,{
			new: true,
			runValidators: true,
			useFindAndModify: false
		});
		res.status(200).json({
			success: true,
			product
		})
	}
})

// Delete product => admin/products/:id
exports.deleteProduct = catchAsyncError( async(req, res, next)=>{
	let product = await Product.findById(req.params.id);

	if(!product){
		return next(new error("No product found with given ID",404));
	}

	await product.remove()
	res.status(200).json({
		success: true,
		message: "Product deleted!"
	})
})