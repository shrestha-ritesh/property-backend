const { addInspection } = require("./inspectionService");

module.exports = {
    addInspectionRequest: async (req, res) => {
        const body = req.body;
        const prop_id = req.params.property_id;
        const userId = req.params.user_id;

        console.log(body, prop_id, userId);
        //calling service:
        const inspecServiceData = addInspection(prop_id, userId, body);
        if (inspecServiceData.module <= 0) {
            res.status(500).json({
                success: 0,
                error: "Something went wrong !"
            });
        }
        res.status(200).json({
            success: 1,
            message: "Successfully Requested for inspection!"
        })
    },

    //getting th
}