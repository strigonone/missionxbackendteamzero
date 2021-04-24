const { getPool } = require("../Database");
const pool = getPool();

/**
 CREATE TABLE `demo`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(60) NOT NULL,
  PRIMARY KEY (`id`));
*/

// CREATE TABLE `userImages` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `image` longblob NOT NULL,
//   `mimeType` varchar(45) NOT NULL,
//   PRIMARY KEY (`id`)
// )

const register = (FullName, Email, passwordHash) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"INSERT INTO `MissionReady`.`Users`(`FullName`,`Email`,`Password`) VALUES (?, ?, ?);",
			[FullName, Email, passwordHash]
		);
		return rows;
	});
};

const getPassword = (email) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"SELECT `Users`.`Password` FROM `MissionReady`.`Users` WHERE `Users`.`Email` = ?;",
			[email]
		);
		return rows;
	});
};

const updateBLOB = (fileBase64String, mimeType) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"INSERT INTO `MissionReady`.`userImages` (`Image`, `MimeType`) VALUES (?, ?);",
			[fileBase64String, mimeType]
		);
		return rows;
	});
};

const getUserProfilePic = (id) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"SELECT * FROM MissionReady.userImages WHERE ID = ?;",
			[id]
		);
		return rows;
	});
};

module.exports = {
	registerUser: register,
	getPassword,
	updateBLOB,
	getUserProfilePic,
};
