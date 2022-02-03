const cloudinary = require("cloudinary").v2;
const ImageModel = require("../models/imageModel");
const fs = require("fs");
const imgConvert = require("image-convert");
const { uploadImageToCloudinary } = require("../utils/utils");

async function jpgToPng(request, response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const result = await cloudinary.uploader.upload(
      `uploads/${request.file.filename}`
    );
    if (result) {
      console.log(result);

      imgConvert.fromURL(
        {
          url: `${result.url}`,
          output_format: "png", //default jpg
        },
        function (err, buffer, file) {
          if (!err) {
            console.log(file.name);
            console.log(buffer);
            fs.writeFileSync(`converted/${file.name}`, buffer);
            // uploadImageToCloudinary(
            //   response,
            //   `converted/${request.file.filename}`
            // );\
            response.status(200).sendFile(`${file.name}`, {
              root: `converted/`,
            });
          }
        }
      );
    }
  } catch (error) {
    response.status(503).send("Something went wrong");
    console.log(error);
  }
}

async function storeUserData(request, response) {
  const { userData, data } = request.body;
  try {
    await ImageModel.create({
      CountryName: userData.country_name,
      City: userData.city,
      State: userData.state,
      latitude: userData.latitude,
      longitude: userData.longitude,
      IPV4: userData.IPv4,
      UserAgent: userData.userData,
      PictureName: data.data.original_filename,
      PictureSize: data.data.bytes,
      PictureFormat: data.data.format,
      SecureUrl: data.data.secure_url,
      Asset_id: data.data.asset_id,
      Public_id: data.data.public_id,

    });
    response.status(200).send("");
  } catch (error) {
    console.log(error);
    response.status(500).send("");
  }
}

module.exports = {
  jpgToPng,
  storeUserData,
};
