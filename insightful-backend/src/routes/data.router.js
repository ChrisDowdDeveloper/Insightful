const express = require("express");
const { getUserCharts } = require("../controllers/data.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", authenticateUser, getUserCharts);

module.exports = router;