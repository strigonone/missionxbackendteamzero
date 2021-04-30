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

// When registering a teacher, we would liek to force their role to be in the teacher section
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

// When registering a student, we would like to force their role to be in the Student section
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

const getUserData = (userData) => {
	// When using prepared statements, if you execute same statement again, it will be picked from a LRU cache
	// which will save query preparation time and give better performance

	return pool.then(async (connection) => {
		// Rows and fields are returned, we take only rows now.
		const [rows] = await connection.execute("SELECT * FROM `Users`", [
			userData,
		]);
		return rows;
	});
};

module.exports = {
	teacherRegister,
	studentRegister,
	getPassword,
	updateBLOB,
	getUserProfilePic,
	getUserData,
};
