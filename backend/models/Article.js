const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('Article', articleSchema);
