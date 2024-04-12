const express = require("express");
const zod = require("zod");
const User = require("../models/user_model");
const Account = require("../models/account_model");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const router = express.Router();

// ZOD SCHEMA FOR VALIDATION
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { succuss } = signupSchema.safeParse(req.body);

  if (!succuss) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.json({
      message: " Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
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
  username: zod.string().email(),
  password: zod.string(),
});

// SIGNIN ROUTE
router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Error while logging in",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
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
    return;
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

module.exports = router;
