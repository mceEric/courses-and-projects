const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain ");
    next();
  })
  .delete((req, res, next) => {
    res.end("Deleting every available leader.");
  })
  .get((req, res, next) => {
    res.end("This shall send every leader to you.");
  })
  .post((req, res, next) => {
    res.end(
      "This will append the following leader:" +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /leaders");
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain ");
    next();
  })
  .delete((req, res, next) => {
    res.end("Deleting the following leader: " + req.params.leaderId + ".");
  })
  .get((req, res, next) => {
    res.end("This shall send information on leader " + req.params.leaderId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })
  .put((req, res, next) => {
    res.write("Updating leader " + req.params.leaderId + ".\n");
    res.end(
      "This shall update the leader" +
        req.body.name +
        ".\n This leader is currently working as a " +
        req.body.role +
        ".\nThe details of the leader is the following: " +
        req.body.description
    );
  });

module.exports = leaderRouter;
