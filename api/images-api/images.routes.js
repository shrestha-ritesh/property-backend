const express = require('express');
const imageController = require('../../controller/image.controller');
const imageUploader = require('./image-uploader');
const { checkToken } = require("../../auth/token_validation");
const { postEvidenceData } = require('../../controller/image.controller');

//creating router:
const router = express.Router();

router.post('/uploads/:propertyid', checkToken, imageUploader.upload.single('image'), imageController.upload);

//For multiple file:
router.post('/multipleUploads/:propertyid', checkToken, imageUploader.upload.array('image', 15), imageController.multipleUpload);
// router.post('/multipleUploads', checkToken, imageUploader.upload.array('image', 15), imageController.multipleUpload);

//For the evidence of the applciation:
router.post('/multipleEvidence/:propertyid', imageUploader.uploadV2.array('image', 10), postEvidenceData);

//For Multiple data of image
router.get('/getimage/:propID', imageController.getImage);

router.get('/getID/:id', imageController.getImageID);


module.exports = router;