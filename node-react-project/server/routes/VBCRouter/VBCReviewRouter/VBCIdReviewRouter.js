const express = require("express");
const bodyParser = require("body-parser");
const VBCModel = require("../../../models/VBCModel");
const ReviewModel = require("../../../models/ReviewModel");
const { userVerification, adminVerification } = require("../../../userAuth");

const vbcIdReviewRouter = express.Router();
vbcIdReviewRouter.use(bodyParser.json());

vbcIdReviewRouter
  .route("/:vbcId/reviews/:reviewId")

  .get((req, res, next) => {
    ReviewModel.findById(req.params.reviewId)
      .populate("author")
      .then(
        (review) => {
          if (!review) {
            error = new Error(
              "No Review was found with the ID:",
              req.params.reviewId
            );
            error.status = 403;
            return next(error);
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(review);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation is not supported on this endpoint");
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on this endpoint.");
  })

  .delete(userVerification, (req, res, next) => {
    ReviewModel.findOne({ _id: req.params.reviewId })
      .populate("author")
      .then((review) => {
        if (!review) {
          error = new Error(
            "No review was found with the ID:",
            req.params.reviewId
          );
          error.status = 403;
          return next(error);
        }
        if (!review.author._id.equals(req.user._id)) {
          error = new Error(
            "Sorry " +
              req.user._id +
              ", but you cannot delete a review which is not yours."
          );
          error.status = 403;
          return next(error);
        }
        review.remove().then((review) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(review);
        });
      });
  });

module.exports = vbcIdReviewRouter;
