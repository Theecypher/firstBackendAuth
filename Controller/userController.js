const User = require("../Model/userModel")
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, course, reason } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400).json({
            message: "User already exists!"
        })
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        course,
        reason,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Internal server error! "
    })
  }
};

module.exports = signup
