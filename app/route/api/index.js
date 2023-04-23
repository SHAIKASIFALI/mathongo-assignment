const express = require("express");
const authRouter = require("./authRoute");
const urlRouter = require("./urlRoute");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/url", urlRouter);

module.exports = apiRouter;
