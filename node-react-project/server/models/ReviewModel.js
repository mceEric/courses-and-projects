const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewModelSchema = new Schema(
  {
    vbc: {
      type: Schema.Types.ObjectId,
      ref: "VBCModel",
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    
    review: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewModel", ReviewModelSchema);
