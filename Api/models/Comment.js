// Import Mongoose
const mongoose = require("mongoose");

// Define the Comment schema
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Comment model
module.exports = mongoose.model("Comment", CommentSchema);
