const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = Schema({
  body: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  imageUrl: String,
  result: String,
  createdAt: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);

module.exports = {
  Query,
};
