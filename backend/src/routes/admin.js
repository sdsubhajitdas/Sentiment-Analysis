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

router.post("/toggle-user-status", async (req, res) => {
  const userId = req.body.userId;

  let user = await User.findById(userId);

  user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await user.save();

  res.status(202).send();
});

router.post("/toggle-admin-role", async (req, res) => {
  const userId = req.body.userId;

  let user = await User.findById(userId);

  user.role = user.role === "ADMIN" ? "USER" : "ADMIN";
  await user.save();

  res.status(202).send();
});

module.exports = router;
