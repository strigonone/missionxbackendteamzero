const { resultToJSON, getSaltedHash, checkPassword } = require("../Utilities");
const {
	getPassword,
	teacherRegister,
	studentRegister,
	updateBLOB,
	getUserProfilePic,
	getUserData,
} = require("../Models/user.model");

// The login controller which is called when we localhost:8080/api/user/login
const login = async (req, res) => {
	const { Email, Password } = req.body;

	// Gets the password for a particular email id.
	// getPassword here is running the DB query and returning the result to the controller here.
	const queryResult = await getPassword(Email);
	const jsonResult = resultToJSON(queryResult);

	if (jsonResult.length === 0) {
		res.status(403).send("Could not find a user with the provided email ID");
	} else {
		const [{ Password: hash }] = jsonResult;
		console.log(jsonResult);
		const isValidPassword = checkPassword(Password, hash);
		if (isValidPassword) {
			res.status(200).send("Successfully logged in user!");
		} else {
			res.status(401).send("Invalid password.");
		}
	}
};

const registerTeacher = async (req, res) => {
	const { FullName, Email, Password } = req.body;
	const passwordHash = getSaltedHash(Password);
	console.log(passwordHash);
	const queryResult = await teacherRegister(FullName, Email, passwordHash);
	res.status(200).json(queryResult);
};

const registerStudent = async (req, res) => {
	const { FullName, Email, Password } = req.body;
	const passwordHash = getSaltedHash(Password);
	console.log(passwordHash);
	const queryResult = await studentRegister(FullName, Email, passwordHash);
	res.status(200).json(queryResult);
};

const resetPassword = async (req, res) => {
	const { Email, oldPassword, newPassword } = req.body;
	console.log({ Email, oldPassword, newPassword });

	if (oldPassword === newPassword) {
		res.status(200).send("Password reset successfully");
	} else {
		res.status(400).send("Mismatch ! Please check your password.");
	}
};

// (Base64 string + mimeType) => Construct a Image URI => Returned to API called by React frontend
const getProfilePic = async (req, res) => {
	const { id } = req.params;
	const queryResult = await getUserProfilePic(id);
	const jsonResult = resultToJSON(queryResult);

	const { image, mimeType } = jsonResult[0];
	const encoding = "base64";
	// Data URIs - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
	// Structure of the URI || data:[<mime type>][;charset=<charset>][;base64],<encoded data>
	// Example              || data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNwAAAKmCAYAA...
	const uri = `data:${mimeType};${encoding},${image}`;
	res.status(200).send({ dataURI: uri });
};

// Multer => a Buffer => Base64 String => Inserted into DB
const uploadProfilePic = async (req, res) => {
	const { buffer, mimetype } = req.file; // Multer puts together the file key with a Array Buffer.
	if (!buffer) {
		const error = new Error("Error uploading file");
		res.status = 400;
		return next(error);
	}

	// Stores the base64 encoded string to the DB
	const queryResult = await updateBLOB(buffer.toString("base64"), mimetype);
	res.status(200).json(queryResult);
};

const getUserDetails = async (req, res) => {
	const userData = req.body; //expecting a param from the api, all of the filter options,
	if (userData) {
		// The DB query is run and result to the user returned here.
		const queryResult = await getUserData(userData);
		const jsonResult = resultToJSON(queryResult);

		if (jsonResult.length === 0) {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204#:~:text=The%20HTTP%20204%20No%20Content,included%20in%20such%20a%20response.
			res.status(204).end();
			console.log("add some data");
		} else {
			res.status(200).json(jsonResult);
			console.log("have some data");
			console.log(userData);
		}
	} else {
		console.error("Error: Missing Parameter");
		res.status(400).send("Missing Parameter");
	}
};

module.exports = {
	login,
	registerTeacher,
	registerStudent,
	resetPassword,
	uploadProfilePic,
	getProfilePic,
	getUserDetails,
};
