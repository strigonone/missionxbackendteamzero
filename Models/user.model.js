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

const teacherRegister = (FullName, Email, passwordHash) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"INSERT INTO `MissionReady`.`Users`(`FullName`,`Email`,`Password`, `Role`) VALUES (?, ?, ?, 'Teacher');",
			[FullName, Email, passwordHash]
		);
		return rows;
	});
};

const studentRegister = (FullName, Email, passwordHash) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"INSERT INTO `MissionReady`.`Users`(`FullName`,`Email`,`Password`, `Role`) VALUES (?, ?, ?, 'Student');",
			[FullName, Email, passwordHash]
		);
		return rows;
	});
};

const getPassword = (Email) => {
	return pool.then(async (connection) => {
		const [
			rows,
		] = await connection.execute(
			"SELECT `Users`.`Password` FROM `MissionReady`.`Users` WHERE `Users`.`Email` = ?;",
			[Email]
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
	teacherRegister,
	studentRegister,
	getPassword,
	updateBLOB,
	getUserProfilePic,
};
