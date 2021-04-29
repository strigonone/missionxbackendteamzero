const bcrypt = require("bcrypt");

const getSaltedHash = (Password) => {
	// genSaltSync - Generates the salt value used for hashing
	const salt = bcrypt.genSaltSync(5);
	try {
		return bcrypt.hashSync(Password, salt);
	} catch (err) {
		console.log("Error", err);
		return err;
	}
};

// Compares the password sent in the login API and the one in the database
const checkPassword = (Password, hash) => {
	console.log(Password, hash);
	return bcrypt.compareSync(Password, hash);
};

// const checkPassword = (Password, hash) => {
// 	bcrypt.compare(Password, hash, function (err, result) {
// 		console.log(Password, hash);
// 	});
// };

module.exports = { getSaltedHash, checkPassword };
