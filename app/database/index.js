module.exports = {
  mongoConnect: require("./mongoDatabase"),
  redisConnect: require("./redisDatabase").connectRedis, // used to connect the redis..
  redisClient: require("./redisDatabase").client, // used to perform set and get operations in the redis
};
