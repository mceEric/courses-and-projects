const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteModelSchema = new Schema(
  {
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DishModels",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId, //req.body.author = req.user._id;
      ref: "UserModelSchema",
    },
  },
  { timestamp: true }
);

var Favorites = mongoose.model("Favorite", favoriteModelSchema);
module.exports = Favorites;
