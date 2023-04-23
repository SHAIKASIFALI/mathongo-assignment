const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "name must be atleast 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "please enter the valid email address", // to validate the email address
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,})/,
      `password must atleast contain one lowercase, one uppercase and one special character`,
    ],
    // to validate the password constraints
  },
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shorturl",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
