const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarModelSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarModel", CarModelSchema);
