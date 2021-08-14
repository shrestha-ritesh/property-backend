const pool = require('../../config/dbconfig');

module.exports = {
    //adding name in image name
    addImageName: (propertyID, data, callBack) => {
        console.log('asdfsadfa', data.filename, propertyID);
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
    },

    addEvidenceName: (property_id, data, callBack) => {
        pool.query(`INSERT INTO EVIDENCE (evidence_name, property_id) VALUES(?,?)`,
            [
                data.filename,
                property_id
            ],
            (error, results) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    /* 
        * DELETE REQUEST FOR DELETING THE DATA FROM THE SERVER
    */

    deleteImageName: (property_id) => {
        return new Promise((resolve, reject) => {
            console.log(property_id);
            pool.query(
                `DELETE FROM Images WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("SucessFully deleted");
                    resolve(results);
                }
            );
        })
    },

    getEvidenceName: (property_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM Evidence WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.error("Error in evidence name", error);
                        reject(error);
                    }
                    console.log("successfully returned data");
                    resolve(results)
                }
            );
        });
    },

    deleteEvidenceName: (property_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM EVIDENCE WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log("error in evidence name", error);
                        reject(error);
                    }
                    console.log("Successfully returned the data !");
                    resolve(results);
                }
            );
        });
    }
}