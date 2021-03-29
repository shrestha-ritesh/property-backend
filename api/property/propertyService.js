const pool = require('../../config/dbconfig');

module.exports = {
    //adding property
    addProperty: (userid, data, callBack) => {
        pool.query(`insert into property (property_name, property_description, property_price, property_status, property_type, property_address, property_city, property_located_area, built_up_area, property_total_area, property_face, road_distance, road_type, userId)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.property_name,
                data.property_description,
                data.property_price,
                data.property_status,
                data.property_type,
                data.property_address,
                data.property_city,
                data.property_located_area,
                data.built_up_area,
                data.property_total_area,
                data.property_face,
                data.road_distance,
                data.road_type,
                userid
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

    //Adding specific property such as HOUSE
    addHouse: (propId, data, callBack) => {
        pool.query(`insert into House (bedroom, rooms, kitchen, living_room, parking, property_id, built_year, total_floors)
            values(?,?,?,?,?,?,?,?)`,
            [
                data.bedroom,
                data.rooms,
                data.kitchen,
                data.living_room,
                data.parking,
                propId.insertId,
                data.built_year,
                data.total_floors,
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

    //For adding the different category of property such as ==> Apartments
    //Adding specific property such as HOUSE
    addApartments: (propId, data, callBack) => {
        pool.query(`insert into apartments (aps_bedroom, aps_room, aps_kitchen, aps_living_room, aps_bathroom, aps_parking, property_id)
            values(?,?,?,?,?,?,?)`,
            [
                data.bedroom,
                data.rooms,
                data.kitchen,
                data.living_room,
                data.bathroom,
                data.parking,
                propId.insertId,
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

    //Get property based on title
    getPropertyTtitle: (name, callBack) => {
        pool.query(
            `SELECT property_id FROM property WHERE property_name = ?`,
            [name],
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