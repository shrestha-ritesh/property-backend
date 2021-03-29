const express = require('express');
const imageController = require('../../controller/image.controller');
const imageUploader = require('./image-uploader');
const { checkToken } = require("../../auth/token_validation");

//creating router:
const router = express.Router();

router.post('/uploads', checkToken, imageUploader.upload.single('image'), imageController.upload);

//For multiple file:
router.post('/multipleUploads/:propertyid', checkToken, imageUploader.upload.array('image', 15), imageController.multipleUpload);

module.exports = router;