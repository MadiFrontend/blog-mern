const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const User = require("./models/User");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);
const secret = "vmdfsimvndrvmregidreg4e85r41418re4g";

mongoose
  .connect(
    "mongodb+srv://blog:huaweihonor4c@cluster0.6c6lcti.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected  To Db!"))
  .catch((err) => console.log("Disconnect From DB!"));

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  // const passOk = bcrypt.compareSync(password, userDoc.password);

  console.log();
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

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
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
    console.log(info.id);
    res.json(postDoc);
  });
});

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

app.get("/post", async (req, res) => {
  res.json(
    await Post.find().populate("writer", ["username"]).sort({ createdAt: -1 })
  );
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("writer", ["username"]);
  res.json(postDoc);
});

app.get("/", (req, res) => res.send("express is here!"));
app.listen(port, () => console.log(` app listening on port ${port}!`));
