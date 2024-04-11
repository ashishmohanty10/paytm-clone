import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

app.use(cors());
app.use(express.json());
import router from "./routes/routeIndex";
const app = express();

app.use("/api/v1", router);

app.listen(3000);
