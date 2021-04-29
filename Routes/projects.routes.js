const { Router } = require("express");
const { get, getTwo, getfour, getsix, update } = require("../Controllers/project.controller");

const router = Router();

// GET /api/project + /
router.get("/getAllData", get);

// PATCH /api/project + /
router.patch("/", update);

// GET /api/project/ + :id/
router.get("/getbeginnerdata", getTwo);

router.get("/getintermediatedata", getfour);

router.get("/getadvanceddata", getsix);

module.exports = router;
