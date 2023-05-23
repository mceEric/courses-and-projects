const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const MongooseCurrency = mongoose.Types.Currency;

const promotionModelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
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
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

var Promotions = mongoose.model("Promotion", promotionModelSchema);
module.exports = Promotions;
