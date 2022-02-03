const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storeUserData } = require("../controller/jpgCompressor.controller");
const { pngCompress } = require("../controller/pngCompressor.controller");
const { storage } = require("../utils/utils");

const upload = multer({ storage });

router.post("/:quality", upload.single("file"), pngCompress);

router.post("/", storeUserData);

module.exports = router;
