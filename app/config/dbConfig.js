const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
};
