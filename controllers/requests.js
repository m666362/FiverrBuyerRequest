const apiEndPoint = "https://api.npoint.io/c33e23d269e5fcd4b4c1";
var express = require("express");
var router = express.Router();
const Model = require("../models/Request");
const mongoose = require("../utils/mongoose");
const jwt = require("passport-jwt");
const Auth = require("./../middlewares/Auth");
var md5 = require('md5');

// Lazy Responder :)
function responder(res, err, data) {
  if (err || !data) {
    console.log({
      err,
      data,
    });
    res.status(400).send({
      err,
      data,
    });
  } else {
    console.log("Data: " + data);
    res.status(200).send(data);
  }
}

// Login
router.post("/login/", (req, res) => {
  console.log(JSON.stringify(req.body));
  Auth.authenticate(req, (err, data) => {
    responder(res, err, data);
  });
});

// C
router.post("/", (req, res) => {
  Model.createData(req.body, (err, data) => {
    responder(res, err, data);
  });
});

// C
router.post("/raw/", (req, res) => {
  // Model.createData(req.body, (err, data) => {
  //     responder(res, err, data)
  // })
  const {
    results: { rows },
  } = req.body;
  const jsonArray = rows.map((row, index) => {
    const { cells } = row;
    return {
      date: cells?.[0]?.text,
      description: cells?.[2]?.text,
      applications: cells?.[3]?.text,
      duration: cells?.[4]?.text,
      budget: cells?.[5]?.text,
      buyerUserName: cells?.[5]?.buttons?.[1]?.meta?.username,
      tags: JSON.stringify(cells?.[2]?.tags),
      uniqueKey: md5(`${cells?.[5]?.buttons?.[1]?.meta?.username}_${cells?.[0]?.text}_${cells?.[2]?.text}`)
    };
  });
  console.log(jsonArray);
  responder(res, null, jsonArray);
});

// Ra
router.get("/", (req, res) => {
  Model.getAllData(
    {},
    req.query["page"] ? req.query["page"] : 0,
    (err, data) => {
      responder(res, err, data);
    }
  );
});

// R1
router.get("/bybuyername/:buyername", (req, res) => {
  Model.getOneData({ buyerUserName: req.params["buyername"] }, (err, data) => {
    responder(res, err, data);
  });
});

// R1
router.get("/byid/:id", (req, res) => {
  Model.getOneData({ _id: req.params["id"] }, (err, data) => {
    responder(res, err, data);
  });
});

// U1
router.put("/:id", (req, res) => {
  delete req.body.email;

  Model.updateOneData({ _id: req.params.id }, req.body, (err, data) => {
    responder(res, err, data);
  });
});

// D1
router.delete("/:id", (req, res) => {
  Model.removeOneData({ _id: req.params["id"] }, (err, data) => {
    responder(res, err, data);
  });
});

// Da
router.delete("/", (req, res) => {
  Model.removeAllData((err, data) => {
    responder(res, err, data);
  });
});

module.exports = router;
