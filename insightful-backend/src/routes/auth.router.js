const express = require("express");
const { signup, login, verify, logout } = require("../controllers/auth.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", authenticateUser, verify);

router.post("/logout", logout)

module.exports = router;