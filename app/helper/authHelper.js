const jwt = require("jsonwebtoken");
const { appConfig } = require("../config/index");

const tokenKey = appConfig.LOGIN_TOKEN_KEY;
const expiryTime = appConfig.LOGIN_TOKEN_TIME;
// helps in generating the jwt token
const generateJwtToken = async (userId, email) => {
  const jwtToken = await jwt.sign(
    {
      userId,
      email,
    },
    tokenKey,
    {
      expiresIn: expiryTime,
    }
  );

  return jwtToken;
};

const verifyJwtToken = async (token, key) => {
  return await jwt.verify(token, key);
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
