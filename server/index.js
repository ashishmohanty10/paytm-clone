const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.js");
const connectDB = require("./database/db.js");
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
