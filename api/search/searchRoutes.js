const express = require('express');
const { getSearchData } = require('./searchController');

const router = express.Router();

//Calling the middleware function of the application:
router.post("/getSearchData", getSearchData);

module.exports = router;