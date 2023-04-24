const short = require("short-uuid");
const { redisClient } = require("../database/index");
const { ShortUrl, User } = require("../model/index");

const httpUrlController = async (req, res) => {
  const longUrl = req.body.Url;
  const userId = req.headers.userId;
  const hour = new Date().getUTCHours(); // get the current hour in the time..
  let key = `${userId}${hour}`;

  try {
    const getShortUrl = await redisClient.get(longUrl);
    if (!getShortUrl) {
      // if the short url is not in cache
      // now check whether it exist in the url db
      const shortUrlDb = await ShortUrl.findOne({
        originalUrl: longUrl,
      });
      if (shortUrlDb) {
        // if it exists in db store it in cache and return response
        await redisClient.set(longUrl, shortUrlDb.url);
        return res.status(200).send({
          data: `the short url is ${shortUrlDb.url}`,
          success: true,
          msg: `the short url successfully fetched from the db`,
        });
      }
      // if it is not present then we will create it and store it in db and cache then returnit
      else {
        const shortUrl = `https://mathongoShortUrlService.at/${short.generate()}`;
        const shortUrlObj = {
          url: shortUrl,
          originalUrl: longUrl,
        };
        const newUrl = await ShortUrl.create(shortUrlObj); // created in db
        const user = await User.findById(userId); // added the newly created url to the user database
        user.urls.push(newUrl._id);
        await user.save();

        await redisClient.set(longUrl, newUrl.url); // saved to cache
        await redisClient.incr(key); //increment the api ratelimiting parameter
        return res.status(200).send({
          data: `the short url is ${newUrl.url}`,
          success: true,
          msg: `the short url successfully created and fetched from the db`,
        });
      }
    } else {
      return res.status(200).send({
        data: `the short url is ${getShortUrl}`,
        success: true,
        msg: `the short url successfully fetched from the cache`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was some problem while creating a shorturl`,
    });
  }
};

module.exports = {
  httpUrlController,
};
