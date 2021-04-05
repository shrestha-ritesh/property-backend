
const { addProperty, getProperty, updateProperty, getPropertyId, getPropertyTtitle, addHouse, addApartments } = require("./propertyService");
const imageController = require('../../controller/image.controller');
const { getImageData } = require("../images-api/imageServices");
const pool = require('../../config/dbconfig');


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
                res.status(200).send({
                    success: 200,
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
    },

    //For getting detail of evry images with details :
    getPropertyDetails: async (req, res) => {
        const results = [];
        const properties = await getProperty();
        if (properties.length <= 0) {
            res.status(200).json({
                message: "No data in table"
            });
        }
        console.log(properties);
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            const images = await getImageData(property.property_id);
            const imageUrls = images.map(images => {
                return `http://10.0.2.2:3000/multipropertyimage/${images.image_name}`;
            });
            property.images = imageUrls;
            results.push(property);
        }
        res.send({
            data: results
        });
    }



}

