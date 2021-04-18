
const { addProperty, getProperty, updateProperty, getPropertyId, getPropertyTtitle, addHouse, addApartments, getApartmentBasedId, getHouseBasedId, getUserPropertyDetail, getPropertyListsBasedId } = require("./propertyService");
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
        const data = [];
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
            //Adding image data in the json for response
            property.images = imageUrls;

            //For Property Details
            if (property.property_type == "Apartment") {
                const apsDetail = await getApartmentBasedId(property.property_id);
                const apsDetailMap = apsDetail.map(apsDetail => {
                    return apsDetail;
                });
                console.log(apsDetailMap);
                property.other_details = apsDetailMap[0];
            }
            if (property.property_type == "House") {
                const houseDetails = await getHouseBasedId(property.property_id);
                const houseDetailMap = houseDetails.map(houseDetails => {
                    return houseDetails;
                });
                console.log("This is house details", houseDetailMap);
                property.other_details = houseDetailMap[0];
            }

            //For getting the Posted property owner Name:
            const userDetail = await getUserPropertyDetail(property.property_id);
            console.log("This is user Detail: ", userDetail);
            property.user_detail = userDetail[0];

            //Storing the combined data in the List
            results.push(property);

        }
        res.send({
            data: results
        });
    },

    //Getting the data for the listed Property:

    getListedPropertyBasedId: async (req, res) => {
        const user_Id = req.params.userID;
        const results = [];

        //Calling the method from the service:
        const propertyDetails = await getPropertyListsBasedId(user_Id);
        if (propertyDetails.length <= 0) {
            res.send({
                success: 0,
                message: "Something went wrong! "
            });
        }
        for (let i = 0; i < propertyDetails.length; i++) {
            const property = propertyDetails[i];
            const images = await getImageData(property.property_id);
            const imageUrls = images.map(images => {
                return `http://10.0.2.2:3000/multipropertyimage/${images.image_name}`;
            });
            //Adding image data in the json for response
            property.images = imageUrls;

            //Gettting the apartment or house detail from the server:
            if (property.property_type == "Apartment") {
                const apsDetail = await getApartmentBasedId(property.property_id);
                const apsDetailMap = apsDetail.map(apsDetail => {
                    return apsDetail;
                });
                console.log(apsDetailMap);
                property.other_details = apsDetailMap[0];
            }
            if (property.property_type == "House") {
                const houseDetails = await getHouseBasedId(property.property_id);
                const houseDetailMap = houseDetails.map(houseDetails => {
                    return houseDetails;
                });
                console.log("This is house details", houseDetailMap);
                property.other_details = houseDetailMap[0];
            }

            const UserDetail = await getUserPropertyDetail(property.property_id);
            property.user_detail = UserDetail[0];

            results.push(property);

        }
        res.status(200).send({
            success: 1,
            data: results
        });
    }



}

