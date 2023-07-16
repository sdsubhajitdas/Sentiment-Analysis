const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
