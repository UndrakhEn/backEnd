const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  users_id: {
    type: String,
    require: true
  },
  created_date: {
    type: Date,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    require: true
  },
  perfor_code: {
    type: String,
    require: true
  },
  post_type: {
    type: String,
    require: true
  }
});

const Post = (module.exports = mongoose.model('posts', PostSchema));
