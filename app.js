const express = require("express");
const cors = require("cors")
const app = express();
const { readdirSync } = require("fs");
const dotenv = require('dotenv');
require('./db/conn');
dotenv.config({path:'./config.env'});

app.use(cors());
app.use(express.json());



readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))
module.exports = app;