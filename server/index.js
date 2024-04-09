import { express } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;
const PORT = 3000;

app.use(cors());
app.use(express.json());
import router from "./routes";
const app = express();

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Searver is UP!!! in ${PORT}`);
});
