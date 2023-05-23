const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//Chaining routes
dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain ");
    next();
  })
  .delete((req, res, next) => {
    res.end("Deleting every single dish.");
  })
  .get((req, res, next) => {
    res.end("This shall send every dish to you.");
  })
  .post((req, res, next) => {
    res.end(
      "Will append the following dish: " +
        req.body.name +
        ".\nWith details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes/");
  });
dishRouter
  .route("/:dishId")
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain ");
  next();
})
.all((req, res, next) => {
.delete((req, res, next) => {
  res.end("Deleting dish " + req.params.dishId + ".");
})
  .get((req, res, next) => {
    res.end(
      "This shall send information on dish " + req.params.dishId + "."
    );
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write("Updating " + req.params.dishId + ".\n");
    res.end(
      "This shall update the " +
        req.body.name +
        " dish.\nThe details of the dish is the following: " +
        req.body.description
    );
  });

module.exports = dishRouter;
