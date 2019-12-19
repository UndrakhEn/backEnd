const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  avatar: { type: String, require: false },
  f_name: { type: String, require: true },
  l_name: { type: String, require: true },
  own_code: { type: String, require: true, unique: true },
  register: { type: String, require: true, unique: true },
  phone: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, require: true },
  type_meaning: { type: String, require: true }
});
const User = mongoose.model('users', UsersSchema);
module.exports = User