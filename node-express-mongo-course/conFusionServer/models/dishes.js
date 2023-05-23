const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const MongooseCurrency = mongoose.Types.Currency;

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModelSchema",
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

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: "",
    },

    price: {
      type: MongooseCurrency,
      required: true,
      min: 0,
    },

    featured: {
      type: Boolean,
      default: "false",
    },
  },

  { timestamps: true }
);

var Dishes = mongoose.model("DishModels", dishModelSchema);
module.exports = Dishes;
