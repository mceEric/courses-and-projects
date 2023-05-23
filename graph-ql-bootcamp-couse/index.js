require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const routes = require("./routes");

const serverUrl = "mongodb://localhost:27017/GraphQL";
const serverConnection = mongoose.connect(serverUrl);

const Model = require("./models/index");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

function retrieveLoggedInUser(req) {
  const token = req.headers["x-auth-token"];
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Session has expired.");
    }
  }
}

serverConnection.then(
  (client) => {
    console.log("Database connection has been established.");
  },
  (error) => console.log(error)
);

async function initialiseApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      Model,
      secret: process.env.JWT_SECRET,
      me: retrieveLoggedInUser(req),
    }),
  });

  await server.start();
  server.applyMiddleware({ app });
}

initialiseApolloServer(typeDefs, resolvers);
app.use(cors());

app.set("view engine", "react");
app.set("views", `${__dirname}/client/public`);

app.get("/", routes.index);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server connection has been established!");
});

//npm i cloudinary multer node-fetch
