const express = require("express");
const cors = require("cors");

// Loads environment variables from a '.env' file stored in the project root
// and makes it available in 'process.env' object
// https://www.npmjs.com/package/dotenv
// require("dotenv").config();

const { port } = require("./Config/DBPort");

// Middleware functions to be used
const { connect } = require("./Database");
const { errorHandler, allowCORS } = require("./Middlewares");

// Routers to be used
const projectRouter = require("./Routes/projects.routes");
const userRouter = require("./Routes/user.routes");

// Init express
const app = express();
// Inbuilt json middleware
app.use(express.json());

// CORS Middleware
// https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/
app.use(cors());
app.all("/*", allowCORS); // A middleware to allow all CORS requests

// A simple Logger middleware
// app.use(simpleLogger);

// Register Routers
app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);

// 404 error
app.all("*", (req, res, next) => {
	const err = new HttpException(404, `Endpoint ${req.url} Not Found`);
	next(err);
});

// Error middleware - placed last, after all other middle wares and route handlers
app.use(errorHandler);

// Starting the server after connecting to DB
const startServer = async () => {
	try {
		await connect();
		app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));
	} catch (e) {
		console.error(e);
	}
};

startServer();
