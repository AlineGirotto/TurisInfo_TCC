const Note = require('../models/note');
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/registro").get(function (req, res) {
  let db_connect = dbo.getDb("test");
  db_connect
    .collection("passageiros")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;