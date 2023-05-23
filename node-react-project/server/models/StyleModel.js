const mongoose = require("mongoose");
const { Schema } = mongoose;

const StyleModelSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },

  font: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("StyleModel", StyleModelSchema);
