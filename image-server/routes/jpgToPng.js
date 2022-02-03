const express = require("express");
const multer = require("multer");
const {
  jpgToPng,
  storeUserData,
} = require("../controller/jpgToPng.controller");
const { storage } = require("../utils/utils");

const upload = multer({ storage });

const router = express.Router();

router.post("/convert", upload.single("file"), jpgToPng);

router.post("/", storeUserData);

module.exports = router;
