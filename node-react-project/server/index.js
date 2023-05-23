const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");
const config = require("./config");
const userRouter = require("./routes/UserRouter/UserRouter");
const vbcRouter = require("./routes/VBCRouter/VBCRouter");

const dbConnection = mongoose.connect(config.DB_URL);
dbConnection.then(
  (response) => {
    console.log("Database connection established.");
  },
  (error) => console.log(error)
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  expressSession({
    secret: config.JWT_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/vbc", vbcRouter);

//error handler
app.use(function (error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};
  res
    .status(error.status || 500)
    .json({ status: error.status, message: error.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server connection has been established", port);
});

module.exports = app;
