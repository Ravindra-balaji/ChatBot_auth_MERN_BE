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
  "http://localhost:3000",
  "https://chat-bot-auth-mern-fe.vercel.app",
  /\.vercel\.app$/ // For dynamic Vercel preview URLs
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman or curl
    if (
      allowedOrigins.some(o =>
        typeof o === "string" ? o === origin : o instanceof RegExp && o.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you’re sending cookies or auth headers
};

// ✅ Register CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// ✅ All API routes
app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, () => {
  console.log("-------- Server started --------");
});
