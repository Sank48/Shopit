const app = require('./app')
const connectDB = require('./config/database')

const dotenv = require('dotenv');

// Setting up config file
dotenv.config({path: 'backend/config/config.env'})

// Connecting to Database
connectDB();

const server = app.listen(process.env.PORT, ()=>{
	console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handling unhandled promise rejections
process.on('unhandledRejection', err=>{
	console.log(`ERROR: ${err.message}`),
	console.log("Shutting down the server due to unhandled Promise rejection"),
	server.close(()=>{
		process.exit(1)
	})
})