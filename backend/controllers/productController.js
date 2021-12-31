const Product = require('../models/product')

// Create new product => /api/v1/product/new
exports.newProduct = async (req, res, next)=>{
	const product  = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product
	})
}

// Get all Products => api/v1/products
exports.getProducts = async (req,res,next)=>{
	const product = await Product.find();
	res.status(200).json({
		success: true,
		counts: product.length,
		product
		//message: 'This route will show all products in database.'
	})
}

// Get single product detail => api/v1/products/:id
exports.getSingleProduct = async (req, res, next)=>{
	const product = await Product.findById(req.params.id);

	if(!product){
		res.status(404).json({
			success: false,
			message: "No product found with given ID."
		})
	}else{
		res.status(200).json({
			success: true,
			product
		})
	}
}