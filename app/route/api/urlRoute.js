const express = require("express");

const { authMiddleware, urlMiddleware } = require("../../middleware/index");
const { urlController } = require("../../controller/index");

const urlRouter = express.Router();

//TO DO controllers need to be added

// http POST api/url/
// this is an protected route we need to authorize and rate limit the user and then we check whether the url format is correct

urlRouter.post(
  "/",
  authMiddleware.isLoggedIn,
  urlMiddleware.urlReqRateLimiter,
  urlMiddleware.CheckIsValidUrl,
  urlController.httpUrlController
);

module.exports = urlRouter;
