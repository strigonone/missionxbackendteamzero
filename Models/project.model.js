const { getPool } = require("../Database");
const pool = getPool();

const getAllProjects = (Projects) => {
	// When using prepared statements, if you execute same statement again, it will be picked from a LRU cache
	// which will save query preparation time and give better performance

	return pool.then(async (connection) => {
		// Rows and fields are returned, we take only rows now.
		const [rows] = await connection.execute("SELECT * FROM `Project_Tables`", [
			Projects,
		]);
		return rows;
	});
};

//used to select the difficulty
const getBeginnerProjects = (someProjects) =>{
	return pool.then(async (connection) => {
		// Rows and fields are returned, we take only rows now.
		const [rows] = await connection.execute("SELECT * FROM `Project_Tables` where `Course` = 'Beginner'", [
			someProjects,
		]);
		return rows;
	});
};

module.exports = { getAllProjects, getBeginnerProjects };
