function upload(req, res) {
    var fileInfo = req.file;
    console.log(fileInfo);
    if (req.file.filename) {
        res.status(201).json({
            message: "Image uploaded successfully",
            url: req.file.filename
        });
    } else {
        res.status(500).json({
            message: "spmething went wrong ! ",
            url: req.file.filename
        });
    }
}

function multipleUpload(req, res) {
    var fileInfo = req.files;
    var title = req.body.title;
    // res.send(fileInfo);

    if (fileInfo.length > 0) {
        for (let index = 0; index < fileInfo.length; index++) {
            const element = fileInfo[index];
            console.log(element);

        }
        res.status(201).json({
            message: "Image uploaded successfully",
        });
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            // url: req.file.filename
        });
    }
}

module.exports = {
    upload: upload,
    multipleUpload: multipleUpload
};