const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();
const dotenv = require("dotenv");
const cors = require("cors");
const { publicRouter } = require("../routes/public-api");
dotenv.config();
const web = express();
module.exports = {web};

web.use(upload.none());
web.use(publicRouter);

