const http = require("http");
const fileSystem = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + " by method");

  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }

    var filePath = path.resolve("./public" + fileUrl);
    const fileExtension = path.extname(filePath);
    if (fileExtension == ".html") {
      fileSystem.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fileSystem.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
      return;
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404: " +
        filereq.methodUrl +
        " not supported</h1></body></html>"
    );
    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is currently running at http://${hostname}:${port}`);
});
