const compress_images = require("compress-images");
const {
  uploadImageToCloudinary,
  deleteFilesFromDirectory,
} = require("../utils/utils");

async function pngCompress(request, response) {
  let quality = request.params.quality;
  if (!quality) {
    return response.status(500).send("Quality  is missing");
  }
  try {
    await compress_images(
      `uploads/${request.file.filename}`,
      `compressed/images/jpg-compress/`,
      { compress_force: true, autoupdate: true, statistic: false },
      false,
      { jpg: { engine: false, command: false } },
      {
        png: {
          engine: "pngquant",
          command: [
            `--quality=${parseInt(quality) - 10}-${parseInt(quality)}`,
            "-o",
          ],
        },
      },
      { svg: { engine: false, command: false } },
      {
        gif: {
          engine: false,
          command: false,
        },
      },
      function (error, completed) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log("-------------");
        if (error) {
          return response.status(500).send("Something went wrong");
        } else if (completed) {
          uploadImageToCloudinary(
            response,
            `compressed/images/jpg-compress/${request.file.filename}`
          );
          deleteFilesFromDirectory(request.file);
        }
      }
    );
  } catch (error) {
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
  pngCompress,
  storeUserData,
};
