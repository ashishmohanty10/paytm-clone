import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONOGODB_URL;

mongoose.connect(URL);
