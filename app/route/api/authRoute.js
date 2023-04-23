const express = require("express");

const authRouter = express.Router();

const { authController } = require("../../controller/index");
const { isLoggedIn } = require("../../middleware/authMiddleware");

// http POST api/auth/signup api
authRouter.post("/signup", authController.httpSignupController);

// http POST api/auth/signin api

authRouter.post("/signin", authController.httpSigninController);

// http POST api/auth/signout api
// signout is an protected route we need to log in initially to signout..

authRouter.post("/signout", isLoggedIn, authController.httpSignoutController);

module.exports = authRouter;
