const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, 'Please enter product name'],
		trim: true,
		maxLength: [100,'Product name cannot exceed 100 characters']
	},
	price:{
		type: Number,
		required: [true, 'Please enter product price'],
		trim: true,
		maxLength: [5, 'Product price cannot exceed 5 digits'],
		default: 0.0
	},
	description:{
		type: String,
		required: [true, 'Please enter product description']
	},
	rating:{
		type: String,
		default: 0
	}
	images: [
		{
			public_id: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}
	],
	category: {
		type: String,
		required: [true, 'Please select a category for this product'],
		enum:{
			values:[
				'Electronics',
				'Cameras',
				'Cloths',
				'Beauty',
				'Sports',
				'Computers',
				'Laptops',
				'Headphones',
				'Health',
				'Furnitures',
				'Grocery',
				'Foods'
			],
			message: 'Please select correct category for the product'
		}
	},
	seller: {
		type: String,
		required: [true, 'Please specify a seller of the product']
	},
	stock: {
		type: Number,
		required: [true, 'Please specify available stock for the product'],
		maxLength: [5, 'Product stock cannot exceed 5 digits']
	},
	numOfReviews: {
		type: Number,
		required: true,
		default: 0
	}
	review: [
		name: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true,

		},
		comment: {
			type: String,
			required: true
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Product', productSchema)