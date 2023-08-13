const axios = require("axios");
require("dotenv").config();

module.exports = axios.create({
  baseURL: process.env.ML_BACKEND_URL,
});
