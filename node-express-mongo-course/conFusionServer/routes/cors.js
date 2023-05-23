const cors = require("cors");
const express = require("express");
const app = express();

const originAcceptions = ["http://localhost:3000", "https://localhost:3443"];
const delegateCorsOpts = function (req, callback) {
  var corsOpts;
  if (originAcceptions.indexOf(req.header("Origin")) !== -1) {
    corsOpts = { origin: true };
  } else {
    corsOpts = { origin: false };
  }
  callback(null, corsOpts);
};

exports.cors = cors();
exports.corsWithOptions = cors(delegateCorsOpts);
