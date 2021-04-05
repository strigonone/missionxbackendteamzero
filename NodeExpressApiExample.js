const express = require("express");
const cors = require("cors");
// Instantiate an application by calling the express() method
const app = express();
// Allows all CORS requests - ignoring security for NOW.
app.use(cors());
/**     Request is the HTTP request. It gives us all the request information, including the request parameters, the headers, the body of the request, and more.    Response is the HTTP response object that we’ll send to the client.**/

app.get("/http://localhost:3000/", (req, res) => {
	console.log("GET called");
	res.send({
		name: "Sonic The Hedgehog",
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running at port ${port}`));
