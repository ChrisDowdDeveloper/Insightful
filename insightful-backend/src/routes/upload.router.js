const express = require("express");
const multer = require("multer");
const { authenticateUser } = require("../middleware/auth.middleware");
const { create } = require("../controllers/upload.controller");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticateUser, upload.single("file"), create);

module.exports = router;
