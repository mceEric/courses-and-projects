const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const multer = require("multer");
const cors = require("./cors");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filterForImageFile = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can only upload image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: diskStorage, fileFilter: filterForImageFile });

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter
  .route("/")

  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(
    cors.cors,
    authenticate.userVerification,
    authenticate.adminVerification,
    function (req, res, next) {
      res.statusCode = 403;
      res.end("GET operation not supported on /imageUpload");
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    function (req, res, next) {
      res.statusCode = 403;
      res.end("PUT operation not supported on /imageUpload");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    function (req, res, next) {
      res.statusCode = 403;
      res.end("DELETE operation not supported on /imageUpload");
    }
  )
  .post(
    cors.corsWithOptions,
    authenticate.userVerification,
    authenticate.adminVerification,
    upload.single("imageFile"),
    function (req, res) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(req.file);
    }
  );

module.exports = uploadRouter;
