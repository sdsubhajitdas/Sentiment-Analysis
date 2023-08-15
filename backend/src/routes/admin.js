const express = require("express");
const { User } = require("../models/User");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find({});

  res.send(
    users.map((user) => ({
      ...user._doc,
      password: "",
    }))
  );
});

module.exports = router;
