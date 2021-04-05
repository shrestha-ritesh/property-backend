const express = require('express');
const app = express();
require("dotenv").config();
var bodyParser = require('body-parser');
const routes = require("./routes/routes");
const propertyRoutes = require("./api/property/propertyRoutes");
const imageRoutes = require("./api/images-api/images.routes");
const path = require('path');

//importing reqiure file:
const router = require('./routes/routes');

//Middleware for parsing the request into json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // For url encoded data


//Just for checking:
app.use("/v1/users", routes);
app.use("/v1/property", propertyRoutes);
app.use("/v1/uploadImages", imageRoutes);

//Express static
app.use("/multipropertyimage", express.static(path.join(__dirname, 'frontUploads')));

//starting the application:
const port = process.env.SERVER_PORT;
app.listen(port, () =>
    console.log(`Started the application in ${port} ${__dirname}`
    ));