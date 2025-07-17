const dotEnv = require("dotenv");
dotEnv.config();
require("./config/db");
require("./utils/emailHelpers");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes"); // includes chat route

const app = express();

app.use(morgan("dev"));

const allowedOrigins = [
  "https://chat-bot-auth-mern-8rpeyitd4-ravindra-balaji-nagulas-projects.vercel.app",
  "https://chat-bot-auth-mern-719l2b7mf-ravindra-balaji-nagulas-projects.vercel.app",
  "http://localhost:5173" // for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// ✅ All API routes
app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, () => {
  console.log("-------- Server started --------");
});
