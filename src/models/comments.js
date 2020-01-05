const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  post_id: { type: String, require: true },
  body: { type: String, require: true },
  created_date: { type: Date, require: true },
  parent_id: { type: String, require: false },
  user: { type: Object, require: true },
  dislike_cnt: { type: Number, require: false },
  like_cnt: { type: Number, require: false }
});
const Comment = mongoose.model('comments', CommentsSchema);
module.exports = Comment;
