const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema({
  CountryName: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  IPV4: {
    type: String,
  },
  UserAgent: {
    type: String,
  },
  PictureName: {
    type: String,
  },
  PictureSize: {
    type: Number,
  },
  PictureFormat: {
    type: String,
  },
  SecureUrl: {
    type: String,
  },
  Asset_id: {
    type: String,
  },
  Public_id: {
    type: String,
  },

  Date: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const ImageModel = mongoose.model("ImagesData", ImagesSchema);

module.exports = ImageModel;
