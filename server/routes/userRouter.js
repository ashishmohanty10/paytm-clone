import express from "express";
import zod from "zod";
import User from "../models/user_model";
import Account from "../models/account_model";
import { JWT_SECRET } from "../config";
import { jwt } from "jsonwebtoken";
import { authMiddleware } from "../middleware";

const router = express.Router();

// ZOD SCHEMA FOR VALIDATION
const signupSchema = zod.objectUtil({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const body = req.body;

  const { succuss } = signupSchema.sageParse(req.body);

  if (!succuss) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = User.findOne({
    userName: body.userName,
  });

  if (existingUser._id) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const dbUser = await User.create(body);

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});

// ZOD VALIDATION FOR SINGIN
const signInSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

// SIGNIN ROUTE
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Error while logging in",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// ZOD VALIDATION FOR UPDATING USER DETAILS
const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

// UPDATE ROUTE
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Password is too small",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// ROUTE TO GET USER FROM BACKEND
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
