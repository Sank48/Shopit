const Product = require('../models/product');
const products = require('../data/product');
const connectDB = require('../config/database');
const dotenv = require('dotenv');

// Setting dotenv files
dotenv.config({path: './backend/config/config.env'});

connectDB();

const seedProducts = async()=>{
	try{
		await Product.deleteMany();
		console.log("Products are deleted.");

		await Product.insertMany(products);
		console.log("All Products are inserted.");

		process.exit();
	}catch(error){
		console.log(error.message);
		process.exit();
	}
}

seedProducts();