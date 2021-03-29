
const { addProperty, getProperty, updateProperty, getPropertyId, getPropertyTtitle, addHouse, addApartments } = require("./propertyService");
const imageController = require('../../controller/image.controller');
module.exports = {
    addProperty: (req, res) => {
        const body = req.body;
        const id = req.params.id;

        addProperty(id, body, (error, results) => {
            var changedID = results;

            if (error) {
                // return console.log(error);
                return res.status(200).json({
                    success: 0,
                    error: 'Successfully added property !!!!!!'
                });
            }
            else if (body.property_type == "House") {
                addHouse(changedID, body, (error, results) => {
                    if (error) {
                        return console.log(error);
                    }
                    // res.status(200).json({
                    //     success: 1,
                    //     message: 'Successfully added property details !',
                    //     data: results
                    // });
                });

            }
            else if (body.property_type == "Apartment") {
                addApartments(changedID, body, (error, results) => {
                    if (error) {
                        return console.log(error);
                    }
                    // res.status(200).json({
                    //     success: 1,
                    //     message: 'Successfully added Apartment details !',
                    //     data: results
                    // });
                });

            }

            else {
                console.log('Inserted!!!');
            }
            return res.status(200).json({
                success: 1,
                message: 'Successfully added property !!!!!!',
                propertyid: results.insertId,
                data: results
            });
        });
    },

    getProperty: (req, res) => {
        getProperty((error, results) => {
            if (error) {
                console.log(error);
            } else if (results.length <= 0) {
                res.json({
                    message: "There is no data in table!"
                });
            }
            else {
                res.json({
                    success: 1,
                    data: results
                })
            }
        });
    },

    getPropertyById: (req, res) => {
        const id = req.params.id;
        getPropertyId(id, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (!results) {
                res.send({
                    success: 0,
                    message: "Entered record not found !"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },

    updateProperty: (req, res) => {
        const body = req.body;
        getPropertyId(body.property_id, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Data does not exists ! "
                })
            }
            console.log(results);
            updateProperty(body, (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Failed to update data !!"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Successfully updated data !"
                });
            });
        });
    }
}