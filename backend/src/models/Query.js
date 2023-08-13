const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = Schema({
  body: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  imageUrl: {
    type: String,
    default: "https://img.kpopmap.com/2019/03/Korea-Kpop-Agency.jpg", // NOT FOUND IMAGE
  },
  result: String,
  createdAt: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);

module.exports = {
  Query,
};
