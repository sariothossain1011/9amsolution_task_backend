const express = require("express");
const cors = require("cors")
const app = express();
const { readdirSync } = require("fs");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const ErrorHandler = require("./middleware/ErrorHandler");
require('./db/conn');
dotenv.config({path:'./config.env'});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler)
app.use(helmet());

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: "The Server Error Here" });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))
module.exports = app;