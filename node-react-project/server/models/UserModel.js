const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserModelSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
    },

    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

UserModelSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserModel", UserModelSchema);
