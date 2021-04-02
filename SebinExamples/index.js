// Example from https://dev.to/sks147/getting-started-with-node-js-backend-development-32hc?fbclid=IwAR3dxGkIT-bxiiEHUo2FvEhXmzhuPdDUr_lOjNe16IB3KOXOok1JtPBlHfE will delete once got the hang of it

const http = require("http");

const server = http.createServer(function (req, res) {
	console.log(`${req.method} request received at ${req.url}`);
	if (req.url === "/html") {
		res.setHeader("Content-Type", "text/html");
		res.statusCode = 200; // 200 = OK
		res.write("<h1>Demo page</h1>");
		res.end();
	} else if (req.url === "/plain") {
		res.setHeader("Content-Type", "text/plain");
		res.statusCode = 200; // 200 = OK
		res.write("<h1>Demo page</h1>");
		res.end();
	} else if (req.url === "/json") {
		res.setHeader("Content-Type", "application/json");
		res.statusCode = 200; // 200 = OK
		res.write(JSON.stringify({ firstName: "Harry", lastName: "Potter" }));
		res.end();
	} else {
		res.setHeader("Content-Type", "text/html");
		res.statusCode = 400; // 400 = Bad request
		res.write("<h1>Sorry, this page is not available</h1>");
		res.end();
	}
});

server.listen(3000, function () {
	console.log("Listening on port http://localhost:3000");
});
