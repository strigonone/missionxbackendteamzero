// get the client
const mysql = require("mysql2");
const fs = require("fs");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

// create the connection to database
const connection = mysql.createConnection({
	host: "SG-MissionX-4145-mysql-master.servers.mongodirector.com",
	database: "MissionReady",
	user: "Johnny",
	password: "JohnnyMissionReady2021#",
	port: 3306,
	// ssl:{ca:fs.readFileSync('<ca-cert filename>')
	ssl: {
		ca: fs.readFileSync("getClusterSSLPublicKey.pem"),
	},
});

const parseResultToJSON = (resultObj) => JSON.parse(JSON.stringify(resultObj));

// simple query
// connection.query("SELECT * FROM `Project_Tables`", (err, results, fields) => {
// 	console.log(results); // results contains rows returned by server
// 	// console.log(fields); // fields contains extra meta data about results, if available
// 	const jsonResults = parseResultToJSON(results);
// 	console.log(jsonResults);
// 	// console.log(err);
// });

const runDBQuery = () => {
	const yourQuery = "SELECT * FROM `Project_Tables`";
	return connection.promise().query(yourQuery);
};

// When a API request is made to localhost:3000/TeacherProjectsPage, the DB query is executed
app.get("/teamzeromissionreadybackend", (req, res) => {
	runDBQuery()
		.then((queryResult, fields) => {
			const [rows] = queryResult;
			const jsonResults = parseResultToJSON(rows);
			console.log("Sending response for GET", jsonResults);
			// Sends the response if query was successful.
			res.send(jsonResults);
		})
		.catch((error) => {
			console.log(error);
			// Sends an error if the query returned an error.
			res.status(500).send(error);
		});
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server ready at port ${port}`));
