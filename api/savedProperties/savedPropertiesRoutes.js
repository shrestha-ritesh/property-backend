const express = require('express');
const { saveFavouriteProperty, removeFavProperty, getFavouritesDetais, getDataForFavourites } = require('./savedPropertiesController');

const router = express.Router();

//Calling middleware function:
router.post("/favourites/post", saveFavouriteProperty);

//calling removing faourites method:
router.delete("/favourites/delete/:prop_id/:userId", removeFavProperty);

//Getting the favourite property data:
router.get("/favourites/getData", getFavouritesDetais);

//Getting the property data from favourites
router.get("/favourites/getprop/:userId", getDataForFavourites);

module.exports = router;