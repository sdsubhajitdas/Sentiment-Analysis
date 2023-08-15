const { User } = require("../models/User");

async function checkAdminPrivilege(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Unauthorized to perform this action");
  }

  next();
}

module.exports = {
  checkAdminPrivilege,
};
