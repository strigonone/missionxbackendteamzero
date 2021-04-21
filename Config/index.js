const fs = require("fs");

const connection = {
	host: "SG-MissionX-4145-mysql-master.servers.mongodirector.com",
	database: "MissionReady",
	user: "Johnny",
	password: "JohnnyMissionReady2021#",
	port: 3306,
	// ssl:{ca:fs.readFileSync('<ca-cert filename>')
	ssl: {
		cert: fs.readFileSync("../SSL/getClusterSSLPublicKey.pem"),
	},
};

module.exports = { connection };
