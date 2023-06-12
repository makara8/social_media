const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    description: {
      type: String,
      default: "",
    },
    like: {
      type: Array,
      default: [],
    },
    image_path: {
      type: String,
      default: "",
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    profile_picture_path: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
