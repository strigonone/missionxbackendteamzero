const { getAllProjects, getSomeProjects } = require("../Models/project.model");
const { resultToJSON } = require("../Utilities");

const get = async (req, res) => {
		const  Projects  = req.body;//expecting a param from the api, all of the filter options,
		if (Projects) {
		// The DB query is run and result to the user returned here.
		const queryResult = await getAllProjects(Projects);
		const jsonResult = resultToJSON(queryResult);

		if (jsonResult.length === 0) {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204#:~:text=The%20HTTP%20204%20No%20Content,included%20in%20such%20a%20response.
			res.status(204).end();
			console.log('add some data')
			
		} else {
			res.status(200).json(jsonResult);
			console.log('have some data')
			console.log(Projects)
		}
	} else {
		
		console.error("Error: Missing Parameter");
		res.status(400).send("Missing Parameter");
	}
};

// const getSome = async (req,res) => {
// 	const someProjects = req.body;
// 	if (someProjects) {
// 		// The DB query is run and result to the user returned here.
// 		const queryResult = await getSomeProjects(someProjects);
// 		const jsonResult = resultToJSON(queryResult);

// 		if (jsonResult.length === 0) {
// 			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204#:~:text=The%20HTTP%20204%20No%20Content,included%20in%20such%20a%20response.
// 			res.status(204).end();
// 			console.log('add some data')
// 		} else {
// 			res.status(200).json(jsonResult);
// 			console.log('Course type')
// 		}
// 	} else {
// 		console.log(Projects)
// 		console.error("Error: Missing Parameter");
// 		res.status(400).send("Missing Parameter");
// 	}
// };


const getOne = async (req, res) => {
	const someProjects = req.body;
	res.status(200).json({ user:"Johnny" });
	console.log(jsonResult)
};

const update = async (req, res) => {
	res.status(200).json({ user: "Johnny" });
};

module.exports = { get, getOne, update };