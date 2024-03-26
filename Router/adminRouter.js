const express = require("express");
const adminRouter = express.Router();

const { adminSignup, adminLogin } = require("../Controller/adminController");


adminRouter.post("/signup", adminSignup)
adminRouter.post("/login", adminLogin)

module.exports = adminRouter