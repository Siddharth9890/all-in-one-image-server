const express = require("express");
const multer = require("multer");
const {
  pngToJpg,
  storeUserData,
} = require("../controller/pngToJpg.controller");
const { storage } = require("../utils/utils");

const upload = multer({ storage });

const router = express.Router();

router.post("/convert", upload.single("file"), pngToJpg);

router.post("/", storeUserData);

module.exports = router;
