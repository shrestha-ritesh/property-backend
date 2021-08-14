const pool = require("../../config/dbconfig");

module.exports = {
    //defining services by exporting the function.
    addInspection: (property_id, userId, data) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO inspection (site_inspection, rates_price, property_details, similar_properties, inspection_description, userId, property_id, selected_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.siteInspection,
                    data.ratesAndPrice,
                    data.propertyDetails,
                    data.similarProperty,
                    data.inspectionRequestDesc,
                    userId,
                    property_id,
                    data.selectedInspectionDate,
                    "pending"
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('requested data added!');
                    resolve(results);
                }
            );
        });
    },

    //Getting the user request data from the table,
    // getUserRequest: ()

    //Getting inspection request:
    getInspectionDetails: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM inspection`,
                [

                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('requested data added!');
                    resolve(results);
                }
            );
        });
    },

    //Getting the inspection details of specific user:
    getInspectionDetailsById: (inspection_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                // `SELECT * FROM inspection WHERE inspection_id = ?`
                `SELECT * FROM 
                inspection insp
                INNER JOIN users us
                ON insp.userId = us.userId
                WHERE insp.inspection_id = ?`,
                [inspection_id],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("Data retrived successfully ! ");
                    resolve(results);
                }

            );
        });
    },

    addInspectionAdmin: (property_id, userId, data) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO inspection (site_inspection, rates_price, property_details, similar_properties, inspection_description, userId, property_id, selected_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.siteInspection,
                    data.ratesAndPrice,
                    data.propertyDetails,
                    data.similarProperty,
                    data.inspectionRequestDesc,
                    userId,
                    property_id,
                    data.selectedInspectionDate,
                    "Approved"
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('requested data added!');
                    resolve(results);
                }
            );
        });
    },

    updateInspecAdmin: (inspection_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE inspection SET status = ? where inspection_id = ?`,
                [
                    "Approved",
                    inspection_id
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('requested data added!');
                    resolve(results);
                }
            );
        });
    },

    deleteInspec: (inspection_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM Inspection WHERE inspection_id = ?`,
                [
                    inspection_id
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log('requested data added!');
                    resolve(results);
                }
            );
        });
    },
};