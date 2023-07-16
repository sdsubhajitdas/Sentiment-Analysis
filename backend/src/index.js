const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connection successful");
});

// Hooking up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Hooking up routes
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
