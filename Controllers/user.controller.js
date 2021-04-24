const { resultToJSON, getSaltedHash, checkPassword } = require("../Utilities");
const {
	getPassword,
	registerUser,
	updateBLOB,
	getUserProfilePic,
} = require("../Models/user.model");

const login = async (req, res) => {
	const { Email, password } = req.body;

	// Gets the password for a particular Email id.
	const queryResult = await getPassword(Email);
	const jsonResult = resultToJSON(queryResult);

	if (jsonResult.length === 0) {
		res.status(401).send("Could not find a user with the provided Email ID");
	} else {
		const [{ password: passwordHash }] = jsonResult;
		const isValidPassword = checkPassword(password, passwordHash);
		if (isValidPassword) {
			res.status(200).send("Successfully logged in user!");
		} else {
			res.status(401).send("Invalid Password.");
		}
	}
};

const register = async (req, res) => {
	const { FullName, Email, Password } = req.body;
	const passwordHash = getSaltedHash(Password);
	console.log(passwordHash);
	const queryResult = await registerUser(FullName, Email, passwordHash);
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

module.exports = {
	login,
	register,
	resetPassword,
	uploadProfilePic,
	getProfilePic,
};
