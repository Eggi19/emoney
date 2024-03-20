// Import Multer
const { multerUpload } = require('../lib/multer');

// Import Function Delete
const deleteFiles = require('../helpers/deleteFiles');

const uploadProfile = (req, res, next) => {
  const multerResult = multerUpload.single('profile_image');
  multerResult(req, res, function (err) {
    try {
      if (err) throw err;
      if (!req.file) {
        throw {message: "Image harus diisi"}
      }
      next();
    } catch (error) {
      if (error.fileToDelete) {
        deleteFiles(error.fileToDelete);
      }
      return res.status(400).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  });
};

module.exports = {
  uploadProfile
};