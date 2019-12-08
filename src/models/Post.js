const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    require: Date.now
  }
});

const Post = (module.exports = mongoose.model('Post', PostSchema));
