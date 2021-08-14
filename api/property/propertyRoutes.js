const express = require('express');
const { addProperty, getProperty, getPropertyById, updateProperty, getPropertyDetails, getListedPropertyBasedId, updateListedProperty, deleteProperty, getPropertyDetailsAdmin, getPropertyDetailsBasedId, updateApproveStatus, addReportData, getReportData, getReportDataId } = require('./propertyController');

const router = express.Router();

//calling the middleware for token validation:
const { checkToken } = require("../../auth/token_validation");

//for router post
router.post("/addProperty/:id", addProperty);

//For getting the property data
router.get("/getProperty", getProperty);


router.get("/getPropertyDetails", getPropertyDetails);

//For Admin Panel
router.get("/getAdminPropertyDetails", getPropertyDetailsAdmin);

// getting based on id
router.get("/getid/:id", getPropertyById);

//updating based on id
router.patch("/update", checkToken, updateProperty);

//uPDATE METHOD For posting editing the listed data.
router.patch("/updateListedProperty/:property_id", checkToken, updateListedProperty);

//getting the listed proerty based on user Id:
router.get("/getlistedProperty/:userID", getListedPropertyBasedId);

//getting individual details (ADMIN):
router.get("/getbasedid/:property_id", getPropertyDetailsBasedId);

//link for deleting the data:
router.delete("/deleteProperty/:property_id", deleteProperty);

//For admin Approve and reject:
router.patch("/updateStatus/:property_id/:postStatus", updateApproveStatus);

//for report post
router.post("/addReport/:property_id/:user_id", addReportData);

//getting report data (ADMIN):
router.get("/getreportdata", getReportData);

//getting report data inidividual (ADMIN):
router.get("/getreportdataId/:reportID", getReportDataId);

module.exports = router;