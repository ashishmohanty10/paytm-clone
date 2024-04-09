import express from "express";
import userRouter from "./userRouter";
const router = express.Router();

application.use("/user", userRouter);

export default router;
