const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserModelSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },

  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserModelSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserModelSchema", UserModelSchema);
