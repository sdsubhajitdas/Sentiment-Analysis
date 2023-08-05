const mongoose = require("mongoose");
const { Schema } = mongoose;

const statisticSchema = Schema({
  date: { type: String, required: true },
  apis: Object,
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = {
  Statistic,
};
