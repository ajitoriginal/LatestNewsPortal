// server/models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  category: String,
});

module.exports = mongoose.model('News', newsSchema);
