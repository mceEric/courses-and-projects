require("dotenv").config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL,
};

module.exports = config;
