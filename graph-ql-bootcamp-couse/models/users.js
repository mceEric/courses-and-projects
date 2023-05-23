const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "CarModel",
    },
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

UserModelSchema.pre("save", function (next) {
  var userModel = this;

  if (!userModel.isModified("password")) return next();

  bcrypt.genSalt(10, function (error, newSalt) {
    if (error) return next(error);

    bcrypt.hash(userModel.password, newSalt, function (error, newHash) {
      if (error) return next(error);
      userModel.password = newHash;
      next();
    });
  });
});

UserModelSchema.methods.comparePassword = function (givenPassword) {
  return bcrypt
    .compare(givenPassword, this.password)
    .then(
      (authentication) => {
        return authentication;
      },
      (error) => {
        console.log(error);
        return error;
      }
    )
    .catch((error) => {
      console.log(error);
      return error;
    });
};

module.exports = mongoose.model("UserModel", UserModelSchema);
