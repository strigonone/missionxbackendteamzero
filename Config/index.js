// const fs = require("fs");

const connection = {
	host: "SG-MissionX-4145-mysql-master.servers.mongodirector.com",
	database: "MissionReady",
	user: "Johnny",
	password: "JohnnyMissionReady2021#",
	port: 3306,
	// ssl:{ca:fs.readFileSync('<ca-cert filename>')
	ssl: {
		ca: Buffer.from(`../SSL/getClusterSSLPublicKey.pem`, "base64").toString(
			"ascii"
		),
		// Needed to fix the selfAsigned certificate issue
		rejectUnauthorized: false,
	},

	// ssl: { ca: fs.readFileSync("../SSL/getClusterSSLPublicKey.pem") },
	// tls: {
	// 	rejectUnauthorized: false,
	// },
};

module.exports = { connection };
