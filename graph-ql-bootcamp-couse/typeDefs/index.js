const userSchema = require("./user");
const carSchema = require("./car");
const createSchema = require("./createSchema");

module.exports = [createSchema, carSchema, userSchema];
