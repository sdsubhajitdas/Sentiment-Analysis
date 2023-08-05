const { Statistic } = require("../models/Statistic");

async function storeAPIUsageData(req, res, next) {
  const ignoreApiPaths = ["GET /auth/refresh"];
  let apiPath = `${req.method} ${
    req.originalUrl.match(/\/query\/[0-9a-fA-F]{0,24}/)
      ? "/query/:queryId"
      : req.originalUrl
  }`;

  if (!ignoreApiPaths.includes(apiPath)) {
    const filter = {
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      }),
    };
    const update = { $inc: { [`apis.${apiPath}`]: 1 } };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    await Statistic.findOneAndUpdate(filter, update, options);
  }
  next();
}

module.exports = {
  storeAPIUsageData,
};
