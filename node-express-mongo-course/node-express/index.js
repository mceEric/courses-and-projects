const express = require("express");
const http = require("http");
const hostname = "localhost";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const portNumber = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    "<html><body><h1>This server is an Express Server</h1></body></html>"
  );
});

const server = http.createServer(app);

server.listen(portNumber, hostname, () => {
  console.log(`Server is now executing on http://${hostname}:${portNumber}`);
});
