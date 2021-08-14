const pool = require('../../config/dbconfig');

module.exports = {


    /* 
        ** CRUD operation for the property Details
    */
    //adding property
    addProperty: (userid, data, callBack) => {
        pool.query(`insert into property (property_name, property_description, property_price, property_status, property_type, property_address, property_city, property_located_area, built_up_area, property_total_area, property_face, road_distance, road_type, userId, longitude, latitude, status)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                userid,
                data.longitude,
                data.latitude,
                "Not-Verified"
            ],
            (error, results) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                console.log('Successfully inserted !');
                return callBack(null, results)
            }
        );
    },

    //Updating property based on the listed propery by th euser:
    UpdateListedProperty: (prop_id, data, callBack) => {
        pool.query(`UPDATE property SET property_name = ?, property_description = ?, property_price = ?, property_status = ?, property_type = ?, property_address = ?, property_city = ?, property_located_area = ?, built_up_area = ?, property_total_area = ?, property_face = ?, road_distance = ?, road_type = ?, longitude = ?, latitude = ? WHERE property_id = ?`,
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
                data.longitude,
                data.latitude,
                prop_id
            ],
            (error, results) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                console.log("Retrived data !");
                return callBack(null, results);
            }
        );
    },

    //Delete property data:
    deletePropertyBasic: (property_id) => {
        return new Promise((resolve, reject) => {
            console.log("From property service", property_id);
            pool.query(
                `DELETE FROM property WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log("Property Delete", error);
                        reject(error);
                    }
                    console.log("Deleted Successully");
                    resolve(results);
                }
            );
        });
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

    //For updating the House details:
    updateHouseDetails: (property_id, data, callBack) => {
        pool.query(`UPDATE House SET bedroom = ?, rooms = ?, kitchen = ?, living_room = ?, parking = ?, built_year = ?, total_floors = ? WHERE property_id = ?`,
            [
                data.bedroom,
                data.rooms,
                data.kitchen,
                data.living_room,
                data.parking,
                data.built_year,
                data.total_floors,
                property_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Successfully Updated");
                return callBack(null, results);
            });
    },
    //Delete house details:
    deleteHouse: (property_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM House WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log("House delete error !", error);
                        reject(error)
                    }
                    console.log("Successfully deleted! ", results);
                    resolve(results);
                }
            );
        });
    },

    //For adding the different category of property such as ==> Apartments
    //Adding specific property such as HOUSE
    addApartments: (propId, data, callBack) => {
        pool.query(`insert into apartments (bedroom, rooms, kitchen, living_room, bathroom, parking, property_id)
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

    //For updating the apartment details:
    updateApartmentDetails: (property_id, data, callBack) => {
        pool.query(`UPDATE Apartments SET bedroom = ?, rooms = ?, kitchen = ?, living_room = ?, bathroom = ?, parking = ? WHERE property_id = ?`,
            [
                data.bedroom,
                data.rooms,
                data.kitchen,
                data.living_room,
                data.bathroom,
                data.parking,
                property_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Successfully Updated Apartment");
                return callBack(null, results);
            });
    },

    //Delete Apartment details:
    deleteApartment: (property_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM apartments WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log("Apartment delete error !", error);
                        reject(error);
                    }
                    console.log("Successfully deleted! ", results);
                    resolve(results);
                }
            );
        });
    },


    /*
        **SERVICES FOR GETTING THE DATA FROM THE DATABASE:
    */

    getProperty() {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM PROPERTY`,
                [],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }
            )
        })
    },

    // getProperty: (callBack) => {
    //     pool.query(`SELECT * FROM PROPERTY`,
    //         [],
    //         (error, results) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },

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
    getPropertyType: (prop_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT property_type FROM property WHERE property_id = ?`,
                [prop_id],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });

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
    },

    getApartmentBasedId(property_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM Apartments WHERE property_id = ?`, [property_id], (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                // console.log(results);
                resolve(results);
            })
        });
    },

    getHouseBasedId(property_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM House WHERE property_id = ?`, [property_id], (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                // console.log(results);
                resolve(results);
            })
        });
    },

    //Query for getting the user based on the property:
    getUserPropertyDetail(property_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT us.userId, us.name, us.email, us.contact_no
            FROM users us
            INNER JOIN property prop
            ON us.userId = prop.userId WHERE prop.property_id = ?`, [property_id], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        });
    },

    getPropertyListsBasedId(userId) {
        return new Promise((resolve, reject) => {
            console.log(userId);
            pool.query(
                `SELECT * FROM property WHERE userId = ?`,
                [
                    userId
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }

            );
        });
    },

    getDetailsBasedId(property_id) {
        return new Promise((resolve, reject) => {
            console.log(property_id);
            pool.query(
                `SELECT * FROM property WHERE property_id = ?`,
                [
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                }

            );
        });
    },

    updateApprvStatus(property_id, postStatus) {
        return new Promise((resolve, reject) => {
            console.log(property_id);
            console.log(postStatus);
            pool.query(
                `UPDATE property SET status = ? where property_id = ?`,
                [
                    postStatus,
                    property_id
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(results);
                }
            );
        })
    },

    //For saving the report request:
    addReportRequest(property_id, user_id, data) {
        return new Promise((resolve, reject) => {
            console.log(property_id);
            pool.query(
                `INSERT INTO report (report_title, report_description, property_id, userId)
                values(?,?,?,?)`,
                [
                    data.reportTitle,
                    data.titleDescription,
                    property_id,
                    user_id
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    getReportData() {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM 
                report rprt
                INNER JOIN property prpt
                ON rprt.property_id = prpt.property_id
                INNER JOIN users urs
                ON rprt.userId = urs.userId`,
                [],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    getReportDataBasedId(report_id) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM 
                report rprt
                INNER JOIN property prpt
                ON rprt.property_id = prpt.property_id
                INNER JOIN users urs
                ON rprt.userId = urs.userId
                WHERE rprt.report_id = ?`,
                [
                    report_id
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }
};