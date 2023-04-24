const { redisClient } = require("../database/index");
const { urlHelper } = require("../helper/index.js");
const urlReqRateLimiter = async (req, res, next) => {
  try {
    const userId = req.headers[`userId`];
    const hour = new Date().getUTCHours(); // get the current hour in the time..
    let key = `${userId}${hour}`;
    const count = await redisClient.get(key);
    if (!count) await redisClient.set(key, 1, "EX", 3600);
    else if (count - 1 > 10) {
      return res.status(429).send("Too Many Requests");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there is an error in the url Middleware `,
    });
  }
};

const CheckIsValidUrl = async (req, res, next) => {
  try {
    const longUrl = req.body.Url;
    if (!urlHelper.isValidUrl(longUrl)) {
      return res
        .status(400)
        .json({ error: "Invalid URL kindly check the correct format" });
    }
    next();
  } catch (error) {
    res.status(400).send({
      err: `invalid url kindly check the url format`,
    });
  }
};
module.exports = {
  urlReqRateLimiter,
  CheckIsValidUrl,
};
