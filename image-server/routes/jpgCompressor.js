const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  jpgCompress,
  storeUserData,
} = require("../controller/jpgCompressor.controller");
const { storage } = require("../utils/utils");

const upload = multer({ storage });

router.post("/:quality", upload.single("file"), jpgCompress);

router.post("/", storeUserData);

module.exports = router;
