const express = require('express');
const { addInspectionRequest, getInspecDetails, updateStatus, deleteInspecId } = require('./inspectionController');

const router = express.Router();

//calling the middleware function for token validation

router.post("/inspection/:property_id/:user_id", addInspectionRequest);
router.get("/getinspection", getInspecDetails);
router.patch("/changestatus/:inspec_id", updateStatus);
router.delete("/rejectstatus/:inspec_id", deleteInspecId);

module.exports = router;