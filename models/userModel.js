const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password cannot be too short. Minimum 6 characters."],
    },
    isAdmin: { type: Boolean, default: false, required: true },
    isUser: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;