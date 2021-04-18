const { getImageData } = require("../images-api/imageServices");
const { getUserPropertyDetail } = require("../property/propertyService");
const { searchData } = require("./searchService");
const { getApartmentBasedId, getHouseBasedId } = require("../property/propertyService");


//For the getting data:
module.exports = {
    getSearchData: async (req, res) => {
        const body = req.body;
        console.log(body);
        //Calling the main method:
        const searchedDataResponse = await searchData(body);
        if (searchedDataResponse == null) {
            res.send({
                success: 0,
                message: "Error"
            })
        }
        for (let i = 0; i < searchedDataResponse.length; i++) {
            const newElement = searchedDataResponse[i];
            const imagesData = await getImageData(newElement.property_id);
            const imageUrls = imagesData.map(imagesData => {
                return `http://10.0.2.2:3000/multipropertyimage/${imagesData.image_name}`;
            });
            newElement.images = imageUrls;

            //For Property Details
            if (newElement.property_type == "Apartment") {
                const apsDetail = await getApartmentBasedId(newElement.property_id);
                const apsDetailMap = apsDetail.map(apsDetail => {
                    return apsDetail;
                });
                console.log(apsDetailMap);
                newElement.other_details = apsDetailMap[0];
            }
            if (newElement.property_type == "House") {
                const houseDetails = await getHouseBasedId(newElement.property_id);
                const houseDetailMap = houseDetails.map(houseDetails => {
                    return houseDetails;
                });
                console.log("This is house details", houseDetailMap);
                newElement.other_details = houseDetailMap[0];
            }

            //For getting the property owner data from the server:

            const userDetail = await getUserPropertyDetail(newElement.property_id);
            console.log("This is the user detail of the property", userDetail);
            newElement.user_detail = userDetail[0];
        }
        res.status(200).json({
            success: 1,
            data: searchedDataResponse
        });
    }
}