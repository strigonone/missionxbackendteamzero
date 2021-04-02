const express = require("express");
const cors = require("cors");
// Instantiate an application by calling the express() method
const app = express();

// Allows all Cors requests - ignorning security for Now.
app.use(cors());
// listen for GET requests on the / path | route, using the get() method.
app.get("/", (req, res) => {
	res.send("Hello World!");
});
const port = 8080;
app.listen(port, () => console.log(`Server running at port ${port}`));
