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
};