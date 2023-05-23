const express = require("express");
const bodyParser = require("body-parser");
const VBCModel = require("../../models/VBCModel");
const { userVerification, adminVerification } = require("../../userAuth");
const vbcReviewRouter = require("./VBCReviewRouter/VBCReviewRouter");

const vbcIdRouter = express.Router();
vbcIdRouter.use(bodyParser.json());

vbcIdRouter
  .route("/:vbcId")

  .get((req, res, next) => {
    VBCModel.findById(req.params.vbcId)
      .populate("user")
      .then(
        (model) => {
          if (!model) {
            error = new Error(
              "No Virtual Business Card was found with the ID: " +
                req.params.vbcId
            );
            error.status = 403;
            return next(error);
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(model);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation is not supported on this endpoint.");
  })

  .put(userVerification, (req, res, next) => {
    VBCModel.findById(req.params.vbcId)
      .then(
        (model) => {
          if (!req.user._id.equals(model.user)) {
            error = new Error(
              "Sorry " +
                req.user.username +
                ", but you can not edit this Virtual Business Card as it is not yours."
            );
            error.status = 403;
            return next(error);
          }
          VBCModel.findByIdAndUpdate(
            req.params.vbcId,
            { $set: req.body },
            { new: true }
          ).then(
            (model) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(model);
            },
            (error) => next(error)
          );
        },
        (error) => next(error)
      )

      .catch((error) => next(error));
  })

  .delete(userVerification, (req, res, next) => {
    VBCModel.findById(req.params.vbcId)
      .then(
        (model) => {
          if (!req.user._id.equals(model.user)) {
            error = new Error(
              "Sorry " +
                req.user.username +
                ", but you can not delete this Virtual Business Card as it is not yours."
            );
            error.status = 403;
            return next(error);
          }
          VBCModel.findByIdAndDelete(req.params.vbcId).then(
            (model) => {
              console.log("Virtual Business Card has been deleted.\n" + model);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(model);
            },
            (error) => next(error)
          );
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  });

vbcIdRouter.use("/", vbcReviewRouter);

module.exports = vbcIdRouter;
