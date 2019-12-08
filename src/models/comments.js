const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  post_id: {
    type: String,
    require: true
  },
  parent_id: {
    type: String,
    require: false
  },
  created_date: {
    type: Date,
    require: Date.now
  }
});
const Comment = (module.exports = mongoose.model('comments', CommentsSchema));
