const nodemailer = require('nodemailer');
const sendMail = (object, callBack) => {
    //Step: 1
    /* 
        * Transporter: it is the object which plays an important role for sending the mail
        * It connects with the service or host that will be used for sending mails
    */
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    /* Creating the options for sending the message*/
    if (object.status == "Approved") {
        var mailOptions = {
            from: 'shrestharitesh10024@gmail.com',
            to: object.email,
            subject: 'Regarding request for site inspection',
            html: `<h1>This email is based on inspection request! </h1>
                <br/>
                <h3> Hello! ${object.name} </h3>
                <br/>
                <p> We have successfully approved the site inspection request.</p>
                <br/>
                <h5> Inspection Details: </h5>
                <p> status: ${object.status}</p>
                <p> Selected Date: <h4 style="color: red"> ${object.inspection_registered_date} </h4></p>
    
                <h5>This is auto generated mail! Please do not reply !!!</h5>
                <p> @copyright property finder nepal</p>
            `
        }
    } else {
        var mailOptions = {
            from: 'shrestharitesh10024@gmail.com',
            to: object.email,
            subject: 'Regarding request for site inspection',
            html: `<h1>This email is based on inspection request! </h1>
                <br/>
                <h3> Hello! ${object.name} </h3>
                <br/>
                <p> We would like to inform you, the time <b style="color: red;">${object.inspection_registered_date}</b> is unavailable! </p>
                <br/>
                <p> Please book an appointment based on the available time / working hours</p>
                <br/>
                <p>Regards, <h4 style="color: red">Demo app </h4></p>

                <hr/>
                <h5>This is auto generated mail! Please do not reply !!!</h5>
                <p> @copyright property finder nepal</p>
            `
        }
    }


    //process for sending the mail
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
            callBack(err, null); // sends error and sets result as null
        }
        else {
            console.log("Email sent successfully ! ");
            callBack(null, true);
        }
    });
}

module.exports = {
    //Exporting sendMail function.
    sendMail
}

