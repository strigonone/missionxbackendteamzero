const multer = require("multer");
const { Router } = require("express");

const storage = multer.memoryStorage();
const uploadMemory = multer({ storage: storage });

const {
	login,
	registerTeacher,
	registerStudent,
	resetPassword,
	uploadProfilePic,
	getProfilePic,
	getUserDetails,
} = require("../Controllers/user.controller");

const router = Router();

// /api/user + /getUserDetails
router.get("/getUserDetails", getUserDetails);

// /api/user + /login
router.post("/login", login);

// /api/user + /registerTeacher
router.post("/registerTeacher", registerTeacher);

// /api/user + /registerStudent
router.post("/registerStudent", registerStudent);

// /api/user + /reset
router.post("/reset", resetPassword);

// /api/user + /profilePic
// Here the multer middleware is injected to look for a form field named 'profilePic'
// It takes it up and makes it available in the req.file object in the controller.
router.post("/profilePic", uploadMemory.single("profilePic"), uploadProfilePic);
router.get("/profilePic/:id", getProfilePic);

module.exports = router;
