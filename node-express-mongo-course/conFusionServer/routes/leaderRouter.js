const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const LeaderModelSchema = require("./../models/leaders");
const cors = require("./cors");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      LeaderModelSchema.deleteMany({})
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
    LeaderModelSchema.find({})
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
      LeaderModelSchema.create(req.body)
        .then(
          (model) => {
            console.log(
              "This will append the following leader:" +
                req.body.name +
                " with details: " +
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
      res.end("PUT operation is not supported on /leaders");
    }
  );

leaderRouter
  .route("/:leaderId")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      LeaderModelSchema.findByIdAndDelete(req.params.leaderId)
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
    LeaderModelSchema.findById(req.params.leaderId)
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
        "POST operation not supported on /leaders/" + req.params.leaderId
      );
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      LeaderModelSchema.findByIdAndUpdate(
        req.params.leaderId,
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

module.exports = leaderRouter;
