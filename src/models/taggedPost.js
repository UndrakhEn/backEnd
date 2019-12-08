const mongoose = require('mongoose');

const TaggedPostsSchema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  post_id: {
    type: String,
    require: true
  },
  user_id: {
    type: String,
    require: true
  }
});
const TaggedPost =
  ((module.exports = mongoose.model('tagged_posts')), TaggedPostsSchema);
