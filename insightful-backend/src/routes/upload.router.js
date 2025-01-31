const express = require("express");
const multer = require("multer");
const { create } = require("../controllers/upload.controller");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(create);

router.post("/", upload.single("file"));

module.exports = router;
