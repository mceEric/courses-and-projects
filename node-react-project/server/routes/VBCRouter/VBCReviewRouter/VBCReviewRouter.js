const express = require("express");
const bodyParser = require("body-parser");
const VBCModel = require("../../../models/VBCModel");
const ReviewModel = require("../../../models/ReviewModel");
const { userVerification, adminVerification } = require("../../../userAuth");
const vbcIdReviewRouter = require("./VBCIdReviewRouter");

const vbcReviewRouter = express.Router();
vbcReviewRouter.use(bodyParser.json());

vbcReviewRouter
  .route("/:vbcId/reviews")

  .get((req, res, next) => {
    ReviewModel.find({ vbc: req.params.vbcId })
      .populate("author")
      .then(
        (reviews) => {
          if (!reviews) {
            error = new Error(
              "No reviews were found for the supplied Virtual Business Card.",
              req.params.vbcId
            );
            error.status = 403;
            return next(error);
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reviews);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post(userVerification, (req, res, next) => {
    VBCModel.findById(req.params.vbcId)
      .then(
        (model) => {
          if (!model) {
            error = new Error(
              "No Virtual Business Card was found with the ID:",
              req.params.vbcId
            );
            error.status = 403;
            return next(error);
          }
          if (req.user._id.equals(model.user)) {
            error = new Error(
              "Sorry " +
                req.user.username +
                ", but you are not allowed to write reviews on your own Virtual Business Card"
            );
            error.status = 403;
            return next(error);
          }
          req.body.author = req.user._id;
          req.body.vbc = req.params.vbcId;
          ReviewModel.create(req.body).then(
            (review) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(review);
            },
            (error) => next(error)
          );
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on this endpoint.");
  })

  .delete(userVerification, adminVerification, (req, res, next) => {
    VBCModel.findById(req.params.vbcId)
      .then(
        (model) => {
          if (!model) {
            error = new Error(
              "No Virtual Business Card was found with the ID:",
              req.params.vbcId
            );
            error.status = 403;
            return next(error);
          }
          ReviewModel.deleteMany({ vbc: req.params.vbcId }).then(
            (reviews) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(reviews);
            },
            (error) => next(error)
          );
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  });

vbcReviewRouter.use("/", vbcIdReviewRouter);

module.exports = vbcReviewRouter;
