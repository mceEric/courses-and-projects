const mongoose = require("mongoose");
const { Schema } = mongoose;

const SocialsModelSchema = new Schema({
  linkedin: {
    type: String,
    required: false,
  },

  facebook: {
    type: String,
    required: false,
  },

  instagram: {
    type: String,
    required: false,
  },

  git: {
    type: String,
    required: false,
  },

  twitter: {
    type: String,
    required: false,
  },

  tiktok: {
    type: String,
    required: false,
  },
});

const VBCModelSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    field: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String, 
      required: true,
    },

    socials: SocialsModelSchema,

    website: {
      type: String,
      required: false,
    },

    photo: {
      type: String,
      required: false,
    },

    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VBCModel", VBCModelSchema);
