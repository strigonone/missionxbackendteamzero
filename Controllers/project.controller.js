const { getAllProjects, getBeginnerProjects } = require("../Models/project.model");
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


const getOne = async (req, res) => {
	res.status(200).json({ Email: "ricardo@email.com" });
};

const update = async (req, res) => {
	res.status(200).json({ Email: "ricardo@email.com" });
};


const getTwo = async (req, res) => {
	const Projects  = req.body;//expecting a param from the api, all of the filter options,
	if (Projects) {
	// The DB query is run and result to the user returned here.
	const queryResult = await getBeginnerProjects(Projects);
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

const getThree = async (req, res) => {
	res.status(200).json({ Email: "ricardo@email.com" });
};

const updateTwo = async (req, res) => {
	console.log(req.query)
	res.status(200).json({ Email: "ricardo@email.com" });
};

module.exports = { get, getOne, getTwo, getThree, update, updateTwo };