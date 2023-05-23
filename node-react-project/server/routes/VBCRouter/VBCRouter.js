const express = require("express");
const bodyParser = require("body-parser");
const VBCModel = require("../../models/VBCModel");
const { userVerification, adminVerification } = require("../../userAuth");
const vbcIdRouter = require("./VBCIdRouter");

const vbcRouter = express.Router();
vbcRouter.use(bodyParser.json());

vbcRouter
  .route("/")

  .get((req, res, next) => {
    VBCModel.find({})
      .populate("user")
      .then(
        (models) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(models);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post(userVerification, (req, res, next) => {
    req.body.user = req.user._id;
    VBCModel.create(req.body)
      .then(
        (model) => {
          console.log("Virtual Business Card has been created.\n" + model);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(model);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on this endpoint.");
  })

  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation is not supported on this endpoint.");
  });

vbcRouter.use("/", vbcIdRouter);

module.exports = vbcRouter;
