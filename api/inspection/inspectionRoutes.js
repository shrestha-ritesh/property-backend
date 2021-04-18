const express = require('express');
const { addInspectionRequest } = require('./inspectionController');

const router = express.Router();

//calling the middleware function for token validation

router.post("/inspection/:property_id/:user_id", addInspectionRequest);

module.exports = router;