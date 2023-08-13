const express = require("express");
const { Query } = require("../models/Query");
const axios = require("../utils/axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { id: createdBy } = req.user;
  const queries = await Query.find({ createdBy }).sort({ createdAt: "desc" });
  res.send(queries);
});

router.get("/:queryId", async (req, res) => {
  const { id: createdBy } = req.user;
  const { queryId } = req.params;
  let query;
  try {
    query = await Query.findById(queryId);
  } catch (err) {
    console.error(err);
  }

  if (!query || query.createdBy != createdBy) {
    return res.status(404).send("Query not found");
  }

  res.send(query);
});

router.post("/", async (req, res) => {
  const { id: createdBy } = req.user;
  const { body: queryBody } = req.body;

  let query = new Query({
    body: queryBody,
    createdBy,
  });

  query = await query.save();

  try {
    const { data } = await axios.post("/query", {
      body: query.body,
      id: query._id,
    });

    if (data.imageUrl)
      query = await Query.findByIdAndUpdate(
        query._id,
        { imageUrl: data?.imageUrl, result: data?.result },
        { new: true }
      );
  } catch (err) {
    console.log(err);
  }

  res.status(201).send(query);
});

router.delete("/:queryId", async (req, res) => {
  const { id: createdBy } = req.user;
  const { queryId } = req.params;
  let deleteResponse;
  try {
    deleteResponse = await Query.deleteOne({
      _id: queryId,
      createdBy: createdBy,
    }).exec();
    await axios.delete(`/query/${queryId}`);
  } catch (err) {
    console.error(err);
  }

  return deleteResponse.acknowledged && deleteResponse.deletedCount === 1
    ? res.status(202).send(deleteResponse)
    : res.status(500).send("Something went wrong");
});

module.exports = router;
