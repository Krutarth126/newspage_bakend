const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  heading: String,
  subheading: String,
  content: String,
  url: String,
});

module.exports = mongoose.model("Article", ArticleSchema);
