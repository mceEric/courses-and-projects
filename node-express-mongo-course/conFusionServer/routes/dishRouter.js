const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const DishModels = require("./../models/dishes");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//Chaining routes
dishRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      DishModels.deleteOne({})
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
    DishModels.find({})
      .populate("comments.author")
      .then(
        (models) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "applicaiton/json");
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
      DishModels.create(req.body)
        .then(
          (model) => {
            console.log(
              "Dish model:\n",
              model,
              "has been succesfully created."
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
      res.end("PUT operation not supported on /dishes/");
    }
  );

dishRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      DishModels.findByIdAndDelete(req.params.dishId)
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
    DishModels.findById(req.params.dishId)
      .populate("comments.author")
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
      res.end("POST operation not supported on /dishes/" + req.params.dishId);
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      DishModels.findByIdAndUpdate(
        req.params.dishId,
        {
          $set: req.body,
        },
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

dishRouter
  .route("/:dishId/comments")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    (req, res, next) => {
      DishModels.findById(req.params.dishId)
        .then(
          (model) => {
            if (model != null) {
              for (var i = model.comments.length - 1; i >= 0; i--) {
                model.comments.id(model.comments[i]._id).remove();
              }
              model.save().then(
                (model) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "applicaiton/json");
                  res.json(model);
                },
                (error) => next(error)
              );
            } else {
              error = new Error(
                req.params.dishId,
                "is not an available dish within our menu."
              );
              error.status = 404;
              return next(error);
            }
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .get(cors.cors, (req, res, next) => {
    DishModels.findById(req.params.dishId)
      .populate("comments.author")
      .then(
        (model) => {
          if (model != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "applicaiton/json");
            res.json(model.comments);
          } else {
            error = new Error(
              req.params.dishId,
              "is not an available dish within our menu."
            );
            error.status = 404;
            return next(error);
          }
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      DishModels.findById(req.params.dishId)
        .then(
          (model) => {
            console.log(
              "Dish model:\n",
              model,
              "has been succesfully created."
            );
            if (model != null) {
              req.body.author = req.user._id;
              model.comments.push(req.body);
              model.save().then(
                (model) => {
                  DishModels.findById(model._id)
                    .populate("comments.author")
                    .then((model) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "applicaiton/json");
                      res.json(model);
                    });
                },
                (error) => next(error)
              );
            } else {
              error = new Error(
                req.params.dishId,
                "is not an available dish within our menu."
              );
              error.status = 404;
              return next(error);
            }
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      res.statusCode = 403;
      res.end(
        "PUT operation not supported on /dishes/" +
          req.params.dishId +
          "/comments"
      );
    }
  );

dishRouter
  .route("/:dishId/comments/:commentId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      DishModels.findById(req.params.dishId)
        .then(
          (model) => {
            if (
              model != null &&
              model.comments.id(req.params.commentId) != null
            ) {
              if (
                model.comments
                  .id(req.params.commentId)
                  .author._id.equals(req.user._id)
              ) {
                model.comments.id(req.params.commentId).remove();

                model.save().then(
                  (model) => {
                    DishModels.findById(model)
                      .populate("comments.author")
                      .then((model) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "applicaiton/json");
                        res.json(model);
                      });
                  },
                  (error) => next(error)
                );
              } else {
                error = new Error(
                  "Sorry " +
                    req.user.username +
                    ", but you are not authorized to perform this operation, as you did not create the comment."
                );
                error.status = 403;
                next(error);
              }
            } else if (model == null) {
              error = new Error(
                `${req.params.dishId} is not an available dish within our menu.`
              );
              error.status = 404;
              next(error);
            } else {
              error = new Error(
                `${req.params.commentId} is not an available comment within this dish.`
              );
              error.status = 404;
              next(error);
            }
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  )

  .get(cors.cors, (req, res, next) => {
    DishModels.findById(req.params.dishId)
      .populate("comments.author")
      .then(
        (model) => {
          if (
            model != null &&
            model.comments.id(req.params.commentId) != null
          ) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "applicaiton/json");
            res.json(model.comments.id(req.params.commentId));
          } else if (model == null) {
            error = new Error(
              req.params.dishId,
              "is not an available dish within our menu."
            );
            error.status = 404;
            return next(error);
          } else {
            error = new Error(
              req.params.commentId,
              "is not an available comment within this dish."
            );
            error.status = 404;
            return next(error);
          }
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      res.statusCode = 403;
      res.end(
        "POST operation not supported on /dishes/" +
          req.params.dishId +
          "/comments/" +
          req.params.commentId
      );
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      DishModels.findById(req.params.dishId)
        .then(
          (model) => {
            if (
              model != null &&
              model.comments.id(req.params.commentId) != null
            ) {
              if (req.body.rating) {
                model.comments.id(req.params.commentId).rating =
                  req.body.rating;
              }
              if (req.body.comment) {
                model.comments.id(req.params.commentId).comment =
                  req.body.comment;
              }

              if (
                model.comments
                  .id(req.params.commentId)
                  .author._id.equals(req.user._id)
              ) {
                model.save().then(
                  (model) => {
                    model.save().then((model) => {
                      DishModels.findById(model)
                        .populate("comments.author")
                        .then((model) => {
                          res.statusCode = 200;
                          res.setHeader("Content-Type", "applicaiton/json");
                          res.json(model);
                        });
                    });
                  },
                  (error) => next(error)
                );
              } else {
                error = new Error(
                  "Sorry " +
                    req.user.username +
                    ", but you are not authorized to perform this operation, as you did not create the comment."
                );
                error.status = 403;
                next(error);
              }
            } else if (model == null) {
              error = new Error(
                req.params.dishId,
                "is not an available dish within our menu."
              );
              error.status = 404;
              return next(error);
            } else {
              error = new Error(
                req.params.commentId,
                "is not an available comment within this dish."
              );
              error.status = 404;
              return next(error);
            }
          },
          (error) => next(error)
        )
        .catch((error) => next(error));
    }
  );

module.exports = dishRouter;
