const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user_id: { type: String, require: true },
  tagged_user: { type: Array, require: true },
  body: { type: String, require: true },
  images: { type: Array, require: false },
  created_date: { type: Date, require: true },
  is_vissible: { type: Boolean, require: true },
  dislike_cnt: { type: Number, require: false },
  like_cnt: { type: Number, require: false },
  perfor_code: { type: String, require: true },
  is_thanks: { type: Boolean, require: true },
  deadline: { type: Date, require: true }
});

const Post = (module.exports = mongoose.model('posts', PostSchema));
