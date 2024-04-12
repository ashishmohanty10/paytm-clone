const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = 3000;
dotenv.config();

const URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);

    console.log(`DB connected`);
  } catch (err) {
    console.log("Error while connecting the DB", err);
  }
};

module.exports = connectDB;
