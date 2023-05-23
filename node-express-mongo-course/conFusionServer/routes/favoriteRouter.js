const express = require("express");
const favoriteModelSchema = require("../models/favorite");
const bodyParser = require("body-parser");
const cors = require("./cors");
const authenticate = require("../authenticate");
const DishModels = require("./../models/dishes");
const { models } = require("mongoose");

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, authenticate.userVerification, (req, res, next) => {
    favoriteModelSchema
      .find({})
      .populate("dishes")
      .populate("user")
      .then((models) => {
        const userFavorites = models.filter((dish) =>
          dish.user._id.equals(req.user._id)
        );
        if (userFavorites.length > 0) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(userFavorites);
        } else {
          error = new Error(
            "Sorry " +
              req.user.username +
              " but you currently have no favorites wihtin our database."
          );
          error.status = 404;
          return next(error);
        }
      })
      .catch((error) => next(error));
  })

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      favoriteModelSchema
        .find({})
        .then(async function (model) {
          const userFavorites = model.filter((dish) =>
            dish.user._id.equals(req.user._id)
          );
          if (userFavorites.length <= 0) {
            const favoriteModel = new favoriteModelSchema({
              user: req.user._id,
            });
            for (var i = 0; i < req.body.length; i++) {
              console.log(req.body[i]._id);
              const dish = await DishModels.findById(req.body[i]._id);
              if (dish !== null) {
                favoriteModel.dishes.push(dish._id);
              }
            }
            favoriteModel
              .save()
              .then(
                (model) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "applicaiton/json");
                  res.json(model);
                },
                (error) => next(error)
              )
              .catch((error) => next(error));
          } else {
            error = new Error(
              "Sorry " +
                req.user.username +
                ", but you already have a list of favourites. If you would like to add an individual favourtie please move over to the favourites/:dishId endpoint"
            );
            error.status = 404;
            return next(error);
          }
        })
        .catch((error) => next(error));
    }
  )

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      favoriteModelSchema
        .find({})
        .populate("dishes")
        .populate("user")
        .then(
          (models) => {
            if (models.length > 0) {
              favoriteModelSchema.deleteMany({ user: req.user }).then(
                (model) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "applicaiton/json");
                  res.json(model);
                },
                (error) => next(error)
              );
            } else {
              error = new Error(
                "Sorry " +
                  req.user.username +
                  " but you have no favorites within our database to delete"
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
        "Sorry " +
          req.user.username +
          ", but PUT operation is not supported on /favorites."
      );
    }
  );

favoriteRouter
  .route("/:dishId")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, authenticate.userVerification, (req, res, next) => {
    favoriteModelSchema //Favorites.findOne({user: req.user._id})
      .find({})
      .populate("dishes")
      .populate("user")
      .then((models) => {
        var requiredFavourite;
        models.map((model) =>
          model.dishes.map((dish) => {
            if (
              dish.id === req.params.dishId &&
              req.user._id.equals(model.user._id)
            ) {
              requiredFavourite = dish;
            }
          })
        );
        if (requiredFavourite) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(requiredFavourite);
        } else {
          error = new Error(
            "Sorry " +
              req.user.username +
              ", but you have no favorite with the supplied dishId within our database."
          );
          error.status = 404;
          return next(error);
        }
      });
  })

  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      favoriteModelSchema
        .find({})
        .populate("dishes")
        .populate("user")
        .then((models) => {
          var isDishInFavourites;
          models.map((model) => {
            if (
              !model.dishes
                .map((dish) => dish.id)
                .includes(req.params.dishId) &&
              model.user._id.equals(req.user._id)
            ) {
              isDishInFavourites = model._id;
            }
          });
          if (isDishInFavourites) {
            favoriteModelSchema.findById(isDishInFavourites).then(
              (model) => {
                model.dishes.push(req.params.dishId);
                model.save().then((newModel) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(newModel);
                });
              },
              (error) => next(error)
            );
          } else {
            error = new Error(
              "Sorry " +
                req.user.username +
                ", but this dish is already contained within your favourites"
            );
            error.status = 404;
            return next(error);
          }
        })
        .catch((error) => next(error));
    }
  )

  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    (req, res, next) => {
      favoriteModelSchema
        .find({})
        .populate("dishes")
        .populate("user")
        .then(
          (models) => {
            var isDishInFavourites;
            models.map((model) =>
              model.dishes.map((dish) => {
                const indexOfDish = model.dishes
                  .map((dish) => dish.id)
                  .indexOf(req.params.dishId);
                if (indexOfDish >= 0 && req.user._id.equals(model.user._id)) {
                  isDishInFavourites = { id: model._id, index: indexOfDish };
                }
              })
            );
            if (isDishInFavourites) {
              favoriteModelSchema.findById(isDishInFavourites.id).then(
                (model) => {
                  model.dishes.splice([isDishInFavourites.index], 1);
                  model.save().then((newModel) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(newModel);
                  });
                },
                (error) => next(error)
              );
            } else {
              error = new Error(
                "Sorry " +
                  req.user.username +
                  ", but you cannot delete the requested dish as it is not a dish contained within your favorites."
              );
              error.status = 200;
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
        "Sorry " +
          req.user.username +
          ", but PUT operation is not supported on /favorites/:dishId."
      );
    }
  );

module.exports = favoriteRouter;
