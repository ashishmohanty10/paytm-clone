const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.MONOGODB_URL;

mongoose.connect(URL);
