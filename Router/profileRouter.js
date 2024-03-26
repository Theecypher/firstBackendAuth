const express = require("express")
const User = require("../Model/userModel");
const authenticate = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", authenticate, async (req, res) => {
    try {
        const page = 1
        const limit = 5
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        if (endIndex < (await User.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit
            }
        }

        results.results = await User.find().limit(limit).skip(startIndex).exec();

        res.status(201).json({
            message: "Welcome",
            results
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
})

module.exports = profileRouter