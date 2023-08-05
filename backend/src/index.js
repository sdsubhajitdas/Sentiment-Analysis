const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const queryRouter = require("./routes/query");
const { checkAuthentication } = require("./middleware/authentication");
const { storeAPIUsageData } = require("./middleware/statistic");

require("dotenv").config();

const app = express();

// Hooking up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Hooking up stats middleware
app.use(storeAPIUsageData);

// Hooking up routes
app.use("/auth", authRouter);

app.use(checkAuthentication);
app.use("/query", queryRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connection successful");
  app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`);
  });
});
