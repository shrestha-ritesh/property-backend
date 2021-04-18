const pool = require('../../config/dbconfig');

module.exports = {
    searchData: (data) => {
        console.log("Property Type", data.property_type);
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM property
            WHERE (property_address LIKE "${data.property_address + "%"}")
            AND (property_price BETWEEN ? AND ?)
            AND (property_type LIKE "${data.property_type + "%"}")
            AND (property_status LIKE "${data.property_status + "%"}")
            AND (property_face LIKE "${data.property_face + "%"}")
            AND (road_type LIKE"${data.road_type + "%"}")
           AND (property_total_area LIKE "${"%" + data.property_total_area + "%"}")
            `,
                [
                    data.property_price_min,
                    data.property_price_max,
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('Sucessfully retrived the data !', results);
                    resolve(results);
                }
            );
        });
    }
}