const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  password: { type: String, required: true }
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
