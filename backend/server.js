const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/')

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
mongoose.connect(
    "mongodb://PankajGadia:0pankajg@ds151586.mlab.com:51586/pankaj-testing",
    { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
routes(router)