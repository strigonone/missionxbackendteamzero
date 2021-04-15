// get the client
const mysql = require("mysql2");
const fs = require("fs");

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

// simple query
connection.query("SELECT * FROM `Project_Tables`", (err, results, fields) => {
	console.log(results); // results contains rows returned by server
	console.log(fields); // fields contains extra meta data about results, if available
	console.log(err);
});
