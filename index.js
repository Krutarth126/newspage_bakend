const express = require("express");
const mongoose = require("mongoose");
const data = require("./data.js");
const ArticleData = require("./dbModule.js");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

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
