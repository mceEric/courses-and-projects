const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const UserModel = require("../../models/UserModel");
const { userVerification } = require("../../userAuth");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

function createToken(userId, expiresIn) {
  return jwt.sign(userId, config.JWT_SECRET, { expiresIn });
}

userRouter.post("/register", (req, res, next) => {
  const newUser = new UserModel({
    email: req.body.email,
    username: req.body.username,
  });
  UserModel.register(newUser, req.body.password, (error, user) => {
    if (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, error: error });
    } else {
      passport.authenticate("local")(req, res, () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, status: "Registration was sucessful." });
      });
    }
  });
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  const sessionToken = createToken({ _id: req.user._id }, "30m");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: sessionToken,
    status: "Login was successful.",
  });
});

userRouter.get("/logout", (req, res, next) => {
  if (req.session.passport) {
    req.logout(function (error) {
      if (error) {
        return next(error);
      }
      req.session.destroy(function (error) {
        if (error) {
          return next(error);
        }
        console.log("Logout was successful.");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "Logout was successful." });
      });
    });
  } else {
    const errorMessage = "You need to be logged in to perform this operation.";
    const error = new Error(errorMessage);
    error.status = 403;
    console.log(errorMessage);
    next(error);
  }
});

userRouter.get("/authentication", userVerification, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  });
});

module.exports = userRouter;
