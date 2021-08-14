const { addImageName, getImageData, addMainImageName, addEvidenceName } = require("../api/images-api/imageServices");

function upload(req, res) {
    var propertyID = req.params.propertyid;
    console.log("Property_id12312312", propertyID);
    var fileInfo = req.file;
    console.log(fileInfo);
    if (req.file.filename) {
        // res.status(200).json({
        //     message: "Image uploaded successfully",
        //     url: req.file.filename
        // });
        var imgURL = 'http://10.0.2.2:3000/multipropertyimage/' + fileInfo.filename;
        addMainImageName(propertyID, imgURL, (error, results) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting thumbnail image"
                })
            }
            res.status(200).json({
                message: "successfully inserted image",
                success: 1,
            })
        })
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            url: req.file.filename
        });
    }
}

function multipleUpload(req, res) {
    const propID = req.params.propertyid;
    var fileInfo = req.files;
    var title = req.body.title;
    // res.send(fileInfo);
    console.log(fileInfo.filename);
    if (fileInfo.length > 0) {
        for (let index = 0; index < fileInfo.length; index++) {
            const element = fileInfo[index];
            console.log('Test', element);
            addImageName(propID, element, (error, results) => {
                if (error) {
                    console.log(error);
                }
                // res.status(200).json({
                //     success: 1,
                //     message: 'Successfully added image Name !'
                // });
            });

        }
        res.status(200).json({
            message: "Image uploaded successfully",
        });
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            // url: req.file.filename
        });
    }
}

async function getImage(req, res) {
    const ids = req.params.propID;
    const apiUrl = [];
    console.log(ids);
    const imageDetails = await getImageData(ids);
    console.log("imageDetails", imageDetails);
    if (imageDetails.length <= 0) {
        res.send({
            message: "Error loading the data !"
        });
    }
    for (let i = 0; i < imageDetails.length; i++) {
        const element = imageDetails[i];
        apiUrl.push(`http://10.0.2.2:3000/multipropertyimage/${element.image_name}`);
    }
    console.log(apiUrl);
    res.status(200).json({
        success: 1,
        data: apiUrl,
    })
    // getImageData(ids, (error, results) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     if (results.length <= 0) {
    //         return res.status(400).json({
    //             success: 0,
    //             message: "Selected property does not contains any images!"
    //         });
    //     }
    //     var resBody = results;
    //     console.log(resBody);
    //     for (let index = 0; index < resBody.length; index++) {
    //         const element = resBody[index];
    //         apiUrl.push('http://10.0.2.2:3000/multipropertyimage/' + element.image_name);
    //         console.log(element.image_name);
    //     }
    //     console.log("This is url ==>", apiUrl);
    //     res.status(200).json({ image_url: apiUrl });
    //     // return res.status(200).json({
    //     //     success: 1,
    //     //     data: results
    //     // });
    // });
}

function postEvidenceData(req, res) {
    const propId = req.params.propertyid;
    var fileInfo = req.files;
    var title = req.body.title;
    if (fileInfo.length > 0) {
        for (let index = 0; index < fileInfo.length; index++) {
            const element = fileInfo[index];
            console.log("Check", element);
            addEvidenceName(propId, element, (error, results) => {
                if (error) {
                    console.log(error);
                }
            });
        }
        res.status(200).json({
            success: 1,
            message: "SucessFully added image in table"
        });
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            // url: req.file.filename
        });
    }
}

function getImageID(req, res) {
    res.sendFile('C:/FYP/backend/frontUploads/' + req.params.id);
}

module.exports = {
    upload: upload,
    multipleUpload: multipleUpload,
    getImageID: getImageID,
    getImage: getImage,
    postEvidenceData: postEvidenceData,
};