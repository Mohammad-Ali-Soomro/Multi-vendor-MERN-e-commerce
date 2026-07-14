const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://multi-vendor-mern-e-commerce-itsy.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV?.toUpperCase() !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// routes
app.get("/test", (req, res) => {
  res.json({
    status: "working",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      ACTIVATION_SECRET_LENGTH: process.env.ACTIVATION_SECRET ? process.env.ACTIVATION_SECRET.length : 0,
      ACTIVATION_SECRET_PREFIX: process.env.ACTIVATION_SECRET ? process.env.ACTIVATION_SECRET.substring(0, 5) : "undefined",
      JWT_SECRET_KEY_LENGTH: process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY.length : 0,
      JWT_SECRET_KEY_PREFIX: process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY.substring(0, 5) : "undefined",
      DB_URL_PREFIX: process.env.DB_URL ? process.env.DB_URL.substring(0, 20) : "undefined",
      CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    }
  });
});

// Import routers
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

// Mount routers
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// It should be after all routes
app.use(ErrorHandler);

module.exports = app;
