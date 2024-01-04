const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    content: String,
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
