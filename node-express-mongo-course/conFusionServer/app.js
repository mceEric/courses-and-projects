const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const authenticate = require("./authenticate");
const config = require("./config");
const expressSession = require("express-session");
const sessionFileStore = require("session-file-store")(expressSession);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const uploadRouter = require("./routes/updateRouter");
const favoriteRouter = require("./routes/favoriteRouter");

const serverUrl = config.mongoServerUrl;
const serverConnection = mongoose.connect(serverUrl);

serverConnection.then(
  (database) => {
    console.log("Server connection has been established.");
  },
  (error) => {
    console.log(error);
  }
);

const app = express();
app.all("*", function (req, res, next) {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
//app.use(cookieParser("12345-67890-09876-54321"));

app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use("/upload", uploadRouter);
app.use("/favorites", favoriteRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//     mongod --dbpath="D:\Eric\ADSTRUCTION\coursera-backend\mongodb\data\db" --bind_ip 127.0.0.1
