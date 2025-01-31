const express = require("express");
const { signup, login, verify } = require("../controllers/auth.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/protected", authenticateUser, verify);

module.exports = router;