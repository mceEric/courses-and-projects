const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentModelSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const dishModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentModelSchema],
  },
  {
    timestamps: true,
  }
);

var Dishes = mongoose.model("Dish", dishModelSchema);
module.exports = Dishes;
