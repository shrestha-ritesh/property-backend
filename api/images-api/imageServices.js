const pool = require('../../config/dbconfig');

module.exports = {
    //adding name in image name
    addImageName: (propertyID, data, callBack) => {
        pool.query(`INSERT INTO IMAGES (image_name, property_id) VALUES(?,?)`,
            [
                data.filename,
                propertyID
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                console.log('Successfully Inserted !!! ');
                return callBack(null, results);
            });
    },

    getImageData: (property_id) => {
        return new Promise((resolve, reject) => {
            console.log(property_id);
            pool.query(
                `SELECT * FROM IMAGES WHERE property_id = ?`,
                [property_id],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('Sucessfully Get');
                    resolve(results);
                });
        })

    },

    addMainImageName: (property_id, imageName, callBack) => {
        pool.query(`UPDATE property SET thumbnail_image = ? WHERE property_id = ?`,
            [
                imageName,
                property_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                console.log('Successfully store data !!!!!!!');
                return callBack(null, results);
            });
    }
}