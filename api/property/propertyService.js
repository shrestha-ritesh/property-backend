const pool = require('../../config/dbconfig');

module.exports = {
    //adding property
    addProperty: (data, callBack) => {
        pool.query(`insert into property (property_name, property_description, property_type, property_address, price, status)
            values(?,?,?,?,?,?)`,
            [
                data.property_name,
                data.property_description,
                data.property_type,
                data.property_address,
                data.price,
                data.status,
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                console.log('Successfully inserted !');
                return callBack(null, results)
            }
        );
    },

    getProperty: (callBack) => {
        pool.query(`SELECT * FROM PROPERTY`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getPropertyId: (id, callBack) => {
        pool.query(
            `SELECT * FROM property WHERE property_id = ?`,
            [id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateProperty: (data, callBack) => {
        pool.query(
            `UPDATE property SET property_name = ?, property_description = ?, property_type = ?, property_address = ?, price = ?, status = ? WHERE property_id = ?`,
            [
                data.property_name,
                data.property_description,
                data.property_type,
                data.property_address,
                data.price,
                data.status,
                data.property_id,
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

};