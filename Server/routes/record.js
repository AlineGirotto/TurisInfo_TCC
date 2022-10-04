const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/record/addViagem").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Data: req.body.Data,
    Nome: req.body.Nome,
    Ida: req.body.Ida,
    Volta: req.body.Volta,
  };

  db_connect.collection("viagens").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = recordRoutes;