const express = require("express");
const multer = require("multer");
const { handleFileUpload } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), handleFileUpload);

module.exports = router;