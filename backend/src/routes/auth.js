const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { displayName, email, password } = req.body;
  if (!displayName || !email || !password) {
    return res.status(400).send("Required fields not found");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send(`User with email ${email} already exists`);
  }

  let newUser = new User({
    displayName,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
  });

  newUser = extractUserData(await newUser.save());
  const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);

  res.status(201).send({ ...newUser, token: accessToken });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Required fields not found");
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Email or password incorrect");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (isPasswordCorrect) {
    user = extractUserData(user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.status(202).send({ ...user, token: accessToken });
  }

  res.status(400).send("Email or password incorrect");
});

function extractUserData(user) {
  const copyUser = user._doc;
  return {
    id: copyUser._id,
    displayName: copyUser.displayName,
    email: copyUser.email,
    status: copyUser.status,
    role: copyUser.role,
  };
}

module.exports = router;
