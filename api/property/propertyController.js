
const { addProperty, getProperty, updateProperty, getPropertyId, addHouse, addApartments, getApartmentBasedId, getHouseBasedId, getUserPropertyDetail, getPropertyListsBasedId, UpdateListedProperty, updateHouseDetails, updateApartmentDetails, deletePropertyBasic, getPropertyType, deleteHouse, deleteApartment, getDetailsBasedId, updateApprvStatus, addReportRequest, getReportData, getReportDataBasedId } = require("./propertyService");
const { getImageData, deleteImageName, getEvidenceName, deleteEvidenceName } = require("../images-api/imageServices");
const pool = require('../../config/dbconfig');
const path = require('path');
const fs = require('fs');
const { removeSavedProperty } = require("../savedProperties/savedPropertiesService");


module.exports = {
    addProperty: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        console.log(body);
        addProperty(id, body, (error, results) => {
            var changedID = results;

            if (error) {
                // return console.log(error);
                return res.status(500).json({
                    success: 0,
                    error: 'property was not able to save !!!!!!'
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

    //For getting the details based on the property_id (ADMINN):
    getPropertyDetailsBasedId: async (req, res) => {
        const prop_id = req.params.property_id;
        const results = [];
        const data = [];
        const properties = await getDetailsBasedId(prop_id);
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
                return `http://localhost:3000/multipropertyimage/${images.image_name}`;
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

            //Getting the evidence data from the database:
            const evidence_name = await getEvidenceName(property.property_id);
            const evidenceUrls = evidence_name.map(evidence_name => {
                return `http://localhost:3000/multievidences/${evidence_name.evidence_name}`
            })

            //Adding the evidene data in response:
            property.evidenceImage = evidenceUrls;

            //Storing the combined data in the List
            results.push(property);

        }
        res.send({
            data: results
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


    //For getting detail of evry images with details FOR ADMIN PANEL:
    getPropertyDetailsAdmin: async (req, res) => {
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
                return `http://localhost:3000/multipropertyimage/${images.image_name}`;
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
    },

    updateListedProperty: async (req, res) => {
        const prop_id = req.params.property_id;
        const body = req.body;
        console.log(body.property_type);
        UpdateListedProperty(prop_id, body, (error, results) => {
            if (error) {
                res.send({
                    success: 0,

                });
            }
            else if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update data !!"
                });
            }
            else if (body.property_type == "House") {
                updateHouseDetails(prop_id, body, (error1, results1) => {
                    if (error1) {
                        console.log(error1);
                        return res.send({
                            success: 0,
                            error: "SomeThing went wrong in house details",
                        });
                    }
                    console.log(results1);
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully updated House details"
                    });
                });
            }
            else if (body.property_type == "Apartment") {
                updateApartmentDetails(prop_id, body, (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.send({
                            success: 0,
                            error: "SomeThing went wrong in apartment details",
                        });
                    }
                    // console.log(results);
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully updated Apartment details"
                    });
                });
            }
            else {
                console.log("Inserted!!");
            }
            // return res.json({
            //     success: 1,
            //     message: "Successfully updated data !"
            // });
        });
    },

    //Controller for deleting the property details:
    deleteProperty: async (req, res) => {
        const prop_id = req.params.property_id;
        //calling the delete service from the service class:
        const propertyType = await getPropertyType(prop_id);
        // console.log("This is property type: ", propertyType.property_type);

        if (propertyType.property_type == "House") {
            const deleteHouseDetails = await deleteHouse(prop_id);
            if (deleteHouseDetails.length <= 0) {
                res.send({
                    success: 0,
                    error: "Something went wrong !! (House)"
                });
            }
        }
        if (propertyType.property_type == "Apartment") {
            const deleteApartmentDetails = await deleteApartment(prop_id);
            if (deleteApartmentDetails.length <= 0) {
                res.send({
                    success: 0,
                    error: "Something went wrong !! (Apartment)"
                });
            }
        }
        //For deleting the images of the property:
        const getImageName = await getImageData(prop_id);
        if (getImageName.length > 0) {
            //deleting from file system:

            for (let i = 0; i < getImageName.length; i++) {
                const image = getImageName[i];
                var name = image.image_name;
                console.log(name);
                fs.unlink(path.join(__dirname, `/../../frontUploads/${name}`), (err) => {
                    if (err) {
                        console.log("Image unlink", err);
                        return
                    }
                });
            }
            const deleteImage = await deleteImageName(prop_id);
        }

        //For deleting evidence:
        const evidenceName = await getEvidenceName(prop_id);
        if (evidenceName.length > 0) {
            for (let i = 0; i < evidenceName.length; i++) {
                const evidence = evidenceName[i];
                var eviName = evidence.evidence_name;
                console.log(eviName);
                fs.unlink(path.join(__dirname, `/../../evidence/${eviName}`), (err) => {
                    if (err) {
                        console.log("Image unlink", err);
                        return
                    }
                });

            }
            const deleteEvidence = await deleteEvidenceName(prop_id);
        }

        //calling the delete function for the favourites:
        const deleteFavourites = await removeSavedProperty(prop_id);
        if (deleteFavourites <= 0) {
            res.send({
                success: 0,
                message: "Something went wrong"
            });
        }

        //deleting the basic details of the property
        const deleteBasicDetails = await deletePropertyBasic(prop_id);
        if (deleteBasicDetails <= 0) {
            res.send({
                success: 0,
                message: "Something went wrong"
            });
        }
        res.status(200).json({ success: 1, message: `Sucessfully Deleted property with id ${prop_id}` });

    },

    updateApproveStatus: async (req, res) => {
        const propertyID = req.params.property_id;
        const statusValue = req.params.postStatus;
        // console.log("This is post status! ", statusValue);
        // console.log("This is post status! ", propertyID);
        try {
            //Calling the update function
            const statusUpdateService = await updateApprvStatus(propertyID, statusValue);
            if (statusUpdateService.module <= 0) {
                res.status(500).json({
                    success: 0,
                    error: "Something went wrong !"
                });
            }

            res.status(200).json({
                success: 1,
                message: "Successfully updated status!"
            })
        } catch (error) {
            console.log(error);
        }
    },

    //For adding report to the database:
    addReportData: async (req, res) => {
        const propertyId = req.params.property_id;
        const userId = req.params.user_id;
        try {
            //calling the add service:
            const addReport = await addReportRequest(propertyId, userId, req.body);
            if (addReport.module <= 0) {
                res.status(500).json({
                    success: 0,
                    error: "Unable to add the data !"
                });
            }
            res.status(200).json({
                success: 1,
                message: "Successfully reported!"
            })
        } catch (error) {
            console.log(error);
        }
    },

    //For getting the data
    getReportData: async (req, res) => {
        //calling the get service:
        const getrprt = await getReportData();
        if (getrprt.length <= 0) {
            res.status(200).json({
                success: 0,
                error: "There is no data in the table !"
            });
        }
        res.status(200).json({
            success: 1,
            data: getrprt
        });
    },

    //For getting the data
    getReportDataId: async (req, res) => {
        const report_id = req.params.reportID
        //calling the get service:
        const getrprt = await getReportDataBasedId(report_id);
        if (getrprt.length <= 0) {
            res.status(200).json({
                success: 0,
                error: "There is no data in the table !"
            });
        }
        res.status(200).json({
            success: 1,
            data: getrprt
        });
    }



}

