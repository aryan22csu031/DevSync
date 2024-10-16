const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validate } = require("../models/User");
const User = require("../models/User");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { emailId } = req.body;
    // validate(req.body);
    const passHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.findOne({ emailId });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newuser = new User(
        {
          ...req.body,
          password: passHash,
          _id: new mongoose.Types.ObjectId(),
        },
        {
          runValidators: true,
        }
      );

      await newuser.save();
      res.status(201).send("user added");
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error: err.message || err,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("invalid email or password");
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = await user.getJwt();
        res.cookie("token", token);
        res.status(200).json({
          success: true,
          message: "logged in successfully",
          data: user
        });
      } else {
        throw new Error("invalid email or password");
      }
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error: err.message || err,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      error: err.message || err,
    });
  }
});

module.exports = authRouter;
