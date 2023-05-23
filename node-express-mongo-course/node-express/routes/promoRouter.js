const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain ");
    next();
  })
  .delete((req, res, next) => {
    res.end("Deleting every available promotion.");
  })
  .get((req, res, next) => {
    res.end("This shall send every promotion to you.");
  })
  .post((req, res, next) => {
    res.end(
      "This will append the following promotion: " +
        req.body.name +
        ".\nWith details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /promotions/");
  });

promoRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain ");
    next();
  })
  .delete((req, res, next) => {
    res.end("Deleting promotion" + req.params.promoId + ".");
  })
  .get((req, res, next) => {
    res.end(
      "This shall send information on promotion " + req.params.promoId + "."
    );
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /promotions/" + req.params.promoId
    );
  })
  .put((req, res, next) => {
    res.write("Updating the promotion" + req.params.promoId + " .\n");
    res.end(
      "This shall update the " +
        req.body.name +
        " promotion.\nThe details of the promotion is the following: " +
        req.body.description
    );
  });

module.exports = promoRouter;
