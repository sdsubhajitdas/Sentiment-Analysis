const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

async function checkAuthentication(req, res, next) {
  const token = req.get("authorization")
    ? req.get("authorization").split(" ")[1]
    : null;

  if (!token) {
    return res.status(403).send("Unauthorized to perform this action");
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const verifiedUser = await User.findById(verified.id);
    if (!verifiedUser) {
      throw Error("User not found");
    }
    req.user = verifiedUser;
  } catch (err) {
    return err.name === "JsonWebTokenError"
      ? res.status(403).send("Unauthorized to perform this action")
      : res.status(500).send(err);
  }

  next();
}

module.exports = {
  checkAuthentication,
};
