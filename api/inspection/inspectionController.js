const pool = require("../../config/dbconfig");
const { sendMail } = require("../../sendEmail/nodemailer");
const { addInspection, getInspectionDetails, updateInspecAdmin, deleteInspec, getInspectionDetailsById } = require("./inspectionService");

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

    //getting the indpection details:
    getInspecDetails: async (req, res) => {
        //calling service:
        const inspecServiceData = await getInspectionDetails();
        if (inspecServiceData.module <= 0) {
            res.status(500).json({
                success: 0,
                error: "Something went wrong !"
            });
        }
        res.status(200).json({
            success: 1,
            data: inspecServiceData
        })
    },

    //Main function for changing the status of the property:
    updateStatus: async (req, res) => {
        const inspection_id = req.params.inspec_id;
        //calling service:
        const inspecServiceData = await updateInspecAdmin(inspection_id);
        if (inspecServiceData.module <= 0) {
            res.status(400).json({
                success: 0,
                error: "Something went wrong !"
            });
        }
        //Taking the inspection details from database:
        const inspecDetails = await getInspectionDetailsById(inspection_id);
        console.log(inspecDetails[0]);

        //Sending the emails:::
        sendMail(inspecDetails[0], (error, result1) => {
            if (error) {
                res.status(400).json({
                    success: 0,
                    error: "Mail was not sent sucessfully"
                });
            }
            else {
                res.status(200).json({
                    success: 1,
                    message: "Successfully updated status!"
                })
            }
        });

        // res.status(200).json({
        //     success: 1,
        //     message: "Successfully updated status!"
        // })
    },

    deleteInspecId: async (req, res) => {
        const inspection_id = req.params.inspec_id;
        try {
            // Taking the inspection details:
            const inspecDetails = await getInspectionDetailsById(inspection_id);
            console.log(inspecDetails[0]); ///returns data from inspec and user table

            // calling service:
            const inspecServiceData = await deleteInspec(inspection_id);

            //checking for validations
            if (inspecServiceData.module <= 0) {
                res.status(500).json({
                    success: 0,
                    error: "Something went wrong !"
                });
            }
            //Sending the emails:::
            sendMail(inspecDetails[0], (error, result1) => {
                if (error) {
                    res.status(500).json({
                        success: 0,
                        error: "Mail was not sent sucessfully"
                    });
                }
                else {
                    res.status(200).json({
                        success: 1,
                        message: "Successfully deleted status!"
                    })
                }
            });

            // res.status(200).json({
            //     success: 1,
            //     message: "Successfully Deleted status!"
            // })

        } catch (error) {
            console.log(error);
        }

    },
}