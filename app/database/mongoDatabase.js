// used to connect the mongodb
const mongoose = require("mongoose");
const { dbConfig } = require("../config/index");

const MONGO_URL = dbConfig.MONGODB_URL;

const connectMongo = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("mongodb connected");
};

module.exports = connectMongo;
