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
    }
}