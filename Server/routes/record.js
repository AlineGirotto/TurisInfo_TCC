const Note = require('../models/Passageiro');
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("");
  db_connect
    .collection("passageiros")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;