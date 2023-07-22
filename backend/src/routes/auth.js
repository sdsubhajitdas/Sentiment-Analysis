const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

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
  const accessToken = getAccessToken(newUser);
  const refreshToken = getRefreshToken(newUser);

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5400000,
      path: "/",
    })
    .send({ ...newUser, accessToken });
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
    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);
    return res
      .status(202)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 5400000,
        path: "/",
      })
      .send({ ...user, accessToken });
  }

  res.status(400).send("Email or password incorrect");
});

router.get("/refresh", async (req, res) => {
  let refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(403).send("Unauthorized");
  }

  try {
    const { id } = verifyRefreshToken(refreshToken);
    const user = extractUserData(await User.findById(id));
    const accessToken = getAccessToken(user);
    res.send({ accessToken });
  } catch (err) {
    return ["TokenExpiredError", "JsonWebTokenError"].includes(err.name)
      ? res.status(403).send("Unauthorized to perform this action")
      : res.status(500).send(err);
  }
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
