const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const { userAuthenticationMiddleware } = require("./middleware");
const chatRoute = require("./chat/ChatRoute");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use(userAuthenticationMiddleware); // protected routes

apiRouter.use("/users", usersRouter);
apiRouter.use("/chat", chatRoute); // ✅ Register here

module.exports = { apiRouter };
