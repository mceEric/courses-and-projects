const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");
const PromotionModels = require("./../models/promotions");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      PromotionModels.deleteMany({})
        .then(
          (reply) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(reply);
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .get(cors.cors, (req, res, next) => {
    PromotionModels.find({})
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

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      PromotionModels.create(req.body)
        .then(
          (model) => {
            console.log(
              "This will append the following promotion: " +
                req.body.name +
                ".\nWith details: " +
                req.body.description +
                " to the database."
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(model);
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("PUT operation is not supported on /promotions/");
    }
  );

promoRouter
  .route("/:promoId")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      PromotionModels.findByIdAndDelete(req.params.promoId)
        .then(
          (reply) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(reply);
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .get(cors.cors, (req, res, next) => {
    PromotionModels.findById(req.params.promoId)
      .then(
        (model) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(model);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      res.statusCode = 403;
      res.end(
        "POST operation not supported on /promotions/" + req.params.promoId
      );
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      PromotionModels.findByIdAndUpdate(
        req.params.promoId,
        { $set: req.body },
        { new: true }
      )
        .then(
          (model) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(model);
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  );

module.exports = promoRouter;
