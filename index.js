const express = require("express");
const mongoose = require("mongoose");
const data = require("./data.js");
const ArticleData = require("./dbModule.js");
const Cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(Cors());
app.use((req, res, next) => {
  res.setHeader("Acess-control-allow-origin", "*"),
    res.setHeader("Acess-control-allow-Header", "*");
  next();
});

const connection_url =
  "mongodb+srv://Admin:yashyash@cluster0.hanf4.mongodb.net/test";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/readdata", async (req, res) => {
  const result = await ArticleData.find();
  res.status(200).send(result);
});
app.get("/readdata/:id", async (req, res) => {
  const id = req.params.id;
  ArticleData.findById(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});
app.post("/post", (req, res) => {
  const dbArticle = req.body;

  ArticleData.create(dbArticle, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listening at localhost ${port}`);
});
