const express = require('express');
const { addProperty, getProperty, getPropertyById, updateProperty, getPropertyDetails } = require('./propertyController');

const router = express.Router();

//calling the middleware for token validation:
const { checkToken } = require("../../auth/token_validation");

//for router post
router.post("/addProperty/:id", checkToken, addProperty);

//For getting the property data
router.get("/getProperty", getProperty);


router.get("/getPropertyDetails", getPropertyDetails);

// getting based on id
router.get("/getid/:id", getPropertyById);

//updating based on id
router.patch("/update", checkToken, updateProperty);

module.exports = router;