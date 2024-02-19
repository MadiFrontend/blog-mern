// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const DB_CLUSTER = require("./env/mongoose");

// Generate a salt for password hashing and define a secret for JWT
const salt = bcrypt.genSaltSync(10);
const secret = "vmdfsimvndrvmregidreg4e85r41418re4g";

// Connect to the MongoDB database
mongoose
  .connect(DB_CLUSTER)
  .then(() => console.log("Connected To Db!"))
  .catch((err) => console.log("Disconnect From DB!"));

// Middleware for CORS, JSON parsing, cookie parsing, and static file serving
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// User registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });

  if (password === userDoc.password) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong conditional");
  }
});

// Profile endpoint for authenticated users
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Logout endpoint to clear the JWT cookie
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// Post creation endpoint
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summery, content } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.create({
      title,
      summery,
      content,
      cover: newPath,
      writer: info.id,
    });
    res.json(postDoc);
  });
});

// Post update endpoint
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summery, content } = req.body;
    const postDoc = await Post.findById(id);
    const isWriter = JSON.stringify(postDoc.writer) === JSON.stringify(info.id);
    if (!isWriter) {
      return res.status(400).json("you are not the author of this post!");
    }
    await postDoc.updateOne({
      title,
      summery,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

// Get all posts endpoint
app.get("/post", async (req, res) => {
  res.json(
    await Post.find().populate("writer", ["username"]).sort({ createdAt: -1 })
  );
});

// Get a specific post endpoint
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("writer", ["username"]);
  res.json(postDoc);
});

// Create a new comment
app.post("/post/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;
  try {
    const comment = await Comment.create({ content, author, post: id });
    console.log(comment);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all comments for a post
app.get("/post/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ post: id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a comment
// app.put("/post/:id/comment/:commentId", async (req, res) => {
//   const { id, commentId } = req.params;
//   const { content } = req.body;
//   try {
//     const comment = await Comment.findOneAndUpdate(
//       { _id: commentId, post: id },
//       { content },
//       { new: true }
//     );
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//     res.json(comment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Delete a comment
app.delete("/post/:id/comment/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      post: id,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Root endpoint
app.get("/", (req, res) => res.send("express is here!"));

// Start the server
app.listen(port, () => console.log(` app listening on port ${port}!`));
