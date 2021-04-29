const { Router } = require("express");
const { get, getTwo, update } = require("../Controllers/project.controller");

const router = Router();

// GET /api/project + /
router.get("/getAllData", get);

// PATCH /api/project + /
router.patch("/", update);

// GET /api/project/ + :id/
router.get("/getbeginnerdata", getTwo);

module.exports = router;
