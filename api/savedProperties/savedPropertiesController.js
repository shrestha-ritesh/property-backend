const { getImageData } = require("../images-api/imageServices");
const { postFavourites, removeFavourites, getFavouriteDetails, getFavouriteData } = require("./savedPropertiesService");
const { getUserPropertyDetail, getApartmentBasedId, getHouseBasedId } = require("../property/propertyService")

module.exports = {
    saveFavouriteProperty: async (req, res) => {
        const body = req.body;
        console.log("adsfsdfasdf", req.body);
        //Calling the method from the service:
        const savedProperties = await postFavourites(body);
        if (savedProperties == null) {
            res.send({
                success: 0,
                message: "Error"
            })
        }
        res.status(200).json({ success: 1, message: "Sucessfully saved" });
    },

    removeFavProperty: async (req, res) => {
        const body = req.body;
        const property_id = req.params.prop_id;
        const user_id = req.params.userId;
        //Calling the remove method from the service:
        const removeFav = await removeFavourites(property_id, user_id);
        if (removeFav <= 0 || removeFav == null) {
            res.send({
                success: 0,
                error: "Something went wrong while deleting! "
            });
        }
        res.status(200).json({
            success: 1,
            message: "Sucessfully removed !",
        });
    },

    getFavouritesDetais: async (req, res) => {
        //calling the method from the service:
        const favouritesData = await getFavouriteDetails();
        console.log(favouritesData);
        if (favouritesData <= 0 || favouritesData == null) {
            res.send({
                success: 0,
                error: "Something went wrong while deleting! "
            });
        }
        res.status(200).json({
            data: favouritesData,
        });
    },

    getDataForFavourites: async (req, res) => {
        const results = [];
        //Getting the data from the parameter
        const user_Id = req.params.userId;
        //Calling the service method for getting the data:
        const favDetailData = await getFavouriteData(user_Id);
        //Checking the condition:
        if (favDetailData <= 0 || favDetailData == null) {
            res.send({
                success: 0,
                error: "Something went wrong while deleting! "
            });
        }
        for (let i = 0; i < favDetailData.length; i++) {
            const property = favDetailData[i];
            const images = await getImageData(property.property_id);
            console.log(images);
            const imageUrls = images.map(images => {
                return `http://10.0.2.2:3000/multipropertyimage/${images.image_name}`;
            });
            //Adding in the response:
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


            results.push(property);

        }
        res.status(200).json({
            data: results
        });

    }


};