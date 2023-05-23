const express = require("express");
const bodyParser = require("body-parser");
const userRouter = express.Router();
var passport = require("passport");
const UserModelSchema = require("../models/user");
const authenticate = require("../authenticate");
const cors = require("./cors");
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.get(
  "/",
  cors.corsWithOptions,
  authenticate.userVerification,
  authenticate.adminVerification,
  (req, res, next) => {
    UserModelSchema.find({})
      .then(
        (models) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(models);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  }
);

userRouter.post("/signup", cors.corsWithOptions, function (req, res, next) {
  UserModelSchema.register(
    new UserModelSchema({ username: req.body.username }),
    req.body.password,
    (error, user) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: error });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((error, user) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ error: error });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Signup was Successful" });
          });
        });
      }
    }
  );
});

userRouter.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local"),
  (req, res) => {
    const newToken = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: newToken,
      status: "Login was Successful.",
    });
  }
);

userRouter.get("/logout", cors.corsWithOptions, function (req, res, next) {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("express-session");
    res.redirect("/");
  } else {
    const error = new Error("You need to login first before you can logout.");
    error.status = 403;
    next(error);
  }
});

module.exports = userRouter;
