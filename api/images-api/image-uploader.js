//Importing package called multer

const multer = require('multer');
const path = require('path');

//Certain configuration for the multer before call other functions:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontUploads'); //Setting the destination for upload image
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));   // It will helps for the naming of the file
    }
});

//Filters for file format:

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
}

//upload method for the multer:
const upload = multer({
    storage: storage,
    //File limit:
    limits: {
        fileSize: 1024 * 1024 * 30,
    },
    fileFilter: fileFilter,
});

//Different configuration for the evidence of the application:
//Certain configuration for the multer before call other functions:
const storagev2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './evidence'); //Setting the destination for upload image
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));   // It will helps for the naming of the file
    }
});

//Other function for the evidence of the application:
const uploadV2 = multer({
    storage: storagev2,
    //File limit:
    limits: {
        fileSize: 1024 * 1024 * 30
    },
    fileFilter: fileFilter,
})
module.exports = {
    upload: upload,
    uploadV2: uploadV2
}