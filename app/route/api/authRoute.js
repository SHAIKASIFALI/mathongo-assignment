const express = require("express");

const authRouter = express.Router();

//TO DO add the controllers ..

// http POST api/auth/signup api
authRouter.post("/signup");

// http POST api/auth/signin api

authRouter.post("/signin");

// http POST api/auth/signout api

authRouter.post("/signout");

module.exports = authRouter;
