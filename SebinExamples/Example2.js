const express = require("express");
const cors = require("cors");
// Instantiate an application by calling the express() method
const app = express();
// Allows all CORS requests - ignoring security for NOW.
app.use(cors());
/**     Request is the HTTP request. It gives us all the request information, including the request parameters, the headers, the body of the request, and more.    Response is the HTTP response object that we’ll send to the client.**/

app.get("/hello", (req, res) => {
	console.log("GET called");
	res.send("Hello GET !");
});
app.post("/hello", (req, res) => {
	console.log("POST called");
	res.send({
		name: "Johnny",
		role: "developer",
	});
});
app.put("/hello", (req, res) => {
	console.log("PUT called");
	res.send("Hello PUT !");
});
app.delete("/hello", (req, res) => {
	console.log("DELETE called");
	res.send("Hello DELETE !");
});
app.patch("/hello", (req, res) => {
	console.log("PATCH called");
	res.send("Hello PATCH !");
});
app.listen(3000, () => console.log("Server ready at port 3000"));
