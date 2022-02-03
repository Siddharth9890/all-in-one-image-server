const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const multer = require("multer");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const deleteFilesFromDirectory = async (file) => {
  const OutputFileName = `compressed/images/jpg-compress/${file.filename}`;

  fs.stat(OutputFileName, function (err, stats) {
    if (err) console.log(file.filename + err);

    fs.unlink(OutputFileName, (err) => console.log(file.filename + err));
  });
  const InputFileName = `uploads/${file.filename}`;
  fs.stat(InputFileName, function (err, stats) {
    if (err) console.log(file.filename + err);

    fs.unlink(InputFileName, (err) => console.log(file.filename + err));
  });
};

const uploadImageToCloudinary = async (response, imagePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    if (result) {
      console.log(result);
      return response.status(200).json({
        success: true,
        message: "Image data fetched successfully",
        data: result,
      });
    }
  } catch (error) {
    console.log("Error occurred: ", error);
    return response
      .status(400)
      .send("Error occurred while uploading, try again.");
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteFilesFromDirectory,
  storage,
};
