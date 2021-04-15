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
app.get("/hello", (req, res) => {
	console.log("test get called");
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

app.get("/baloon", (req, res) => {
	console.log("GET called baloon");
	res.end(`

 <img src="https://previews.123rf.com/images/robisklp/robisklp1508/robisklp150800031/43577538-ballons-with-confetti.jpg">
 <img src="./balloons.jpg">
 `);
});

app.get("/car", (req, res) => {
	console.log("GET called car");
	res.end(`

 <img src="https://prestigemotorsport.com.au/wp-content/uploads/2016/07/2004-Mitsubishi-Lancer-EVO-8-MR-front-1024x576.jpg">
 <img src="./workwheels.jpg">
 `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server ready at port ${port}`));
