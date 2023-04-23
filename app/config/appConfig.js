const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  LOGIN_TOKEN_KEY: process.env.LOGIN_TOKEN_KEY,
  LOGIN_TOKEN_TIME: parseInt(process.env.LOGIN_TOKEN_TIME),
};
