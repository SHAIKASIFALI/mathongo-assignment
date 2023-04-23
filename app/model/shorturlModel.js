const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shorturlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const shorturl = mongoose.model("shorturl", shorturlSchema);
module.exports = shorturl;
